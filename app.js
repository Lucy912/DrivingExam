// Global variables
let pdfDoc = null;
let pageNum = 1;
let pageRendering = false;
let pageNumPending = null;
let scale = 1.5;
const canvas = document.getElementById('pdfCanvas');
const ctx = canvas.getContext('2d');

// Chapter structure matching the PDF content
const chapters = [
    { title: "Table of Contents", pages: [1], icon: "📑" },
    { title: "Drivetrain", pages: [2], icon: "⚙️" },
    { title: "Feed-through & Cross-over Methods", pages: [3], icon: "🔄" },
    { title: "Seating Position & Mirror Adjustment", pages: [4], icon: "💺" },
    { title: "Dashboard Symbols & Lighting", pages: [5], icon: "📊" },
    { title: "2-Second Rule & Safety Cushion", pages: [6], icon: "⏱️" },
    { title: "Pedestrians", pages: [7], icon: "🚶" },
    { title: "Intersections", pages: [8, 9, 10], icon: "🛣️" },
    { title: "Turning Right", pages: [11, 12, 13], icon: "➡️" },
    { title: "Turning Left", pages: [14, 15, 16, 17], icon: "⬅️" },
    { title: "Reversing", pages: [18], icon: "⏪" },
    { title: "3-Point Turn", pages: [19], icon: "🔃" },
    { title: "2-Point Turn", pages: [20], icon: "🔃" },
    { title: "Half-Turn / U-Turn", pages: [21], icon: "🔃" },
    { title: "Forward Parallel Parking", pages: [22], icon: "🅿️" },
    { title: "Forward Angle/Perpendicular Parking", pages: [23], icon: "🅿️" },
    { title: "Reverse Parallel Parking", pages: [24, 25], icon: "🅿️" },
    { title: "Reverse Angle/Perpendicular Parking", pages: [26], icon: "🅿️" },
    { title: "Emergency Stop", pages: [27], icon: "🛑" },
    { title: "Merging & Lane Changes", pages: [28], icon: "🚗" },
    { title: "Weaving & Acceleration Lanes", pages: [29, 30], icon: "↔️" },
    { title: "Roundabout - Cyclist Priority OUTSIDE", pages: [31], icon: "🔄" },
    { title: "Merging/Exiting Roundabout", pages: [32], icon: "🔄" },
    { title: "Roundabout", pages: [33], icon: "🔄" },
    { title: "Cyclist Traffic OUTSIDE Roundabout", pages: [34], icon: "🔄" },
    { title: "Approaching & Navigating Roundabout", pages: [35], icon: "🔄" },
    { title: "Turbo Roundabout", pages: [36], icon: "🔄" },
    { title: "Traffic Signs A-G", pages: [37, 38], icon: "🚸" },
    { title: "Traffic Signs H-K", pages: [39, 40], icon: "🚸" },
    { title: "Traffic Signs L", pages: [41], icon: "ℹ️" },
    { title: "Highway Signage", pages: [42, 43], icon: "🛣️" }
];

// Local storage keys
const STORAGE_KEYS = {
    PROGRESS: 'drivingExam_progress',
    COMPLETED_PAGES: 'drivingExam_completedPages',
    NOTES: 'drivingExam_notes'
};

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    initPDF();
    initUI();
    loadProgress();
    populateChapters();
});

// Initialize PDF.js
function initPDF() {
    const pdfPath = '03-01-2026, 13:18 Microsoft Lens.pdf';

    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

    const loadingTask = pdfjsLib.getDocument(pdfPath);
    loadingTask.promise.then(pdf => {
        pdfDoc = pdf;
        document.getElementById('pageCount').textContent = pdf.numPages;
        renderPage(pageNum);
    }).catch(error => {
        console.error('Error loading PDF:', error);
        alert('Error loading PDF file. Make sure the file is in the same folder as the HTML files.');
    });
}

// Render page
function renderPage(num) {
    pageRendering = true;

    pdfDoc.getPage(num).then(page => {
        const viewport = page.getViewport({ scale: scale });
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
            canvasContext: ctx,
            viewport: viewport
        };

        const renderTask = page.render(renderContext);
        renderTask.promise.then(() => {
            pageRendering = false;
            if (pageNumPending !== null) {
                renderPage(pageNumPending);
                pageNumPending = null;
            }
            updatePageInfo();
            loadPageNotes();
        });
    });

    document.getElementById('pageNum').value = num;
    updateChapterHighlight();
}

// Queue page render
function queueRenderPage(num) {
    if (pageRendering) {
        pageNumPending = num;
    } else {
        renderPage(num);
    }
}

// Update page info
function updatePageInfo() {
    document.getElementById('pageNum').value = pageNum;

    // Update URL hash
    window.location.hash = `page${pageNum}`;
}

// Initialize UI event listeners
function initUI() {
    // Page navigation
    document.getElementById('prevPage').addEventListener('click', () => {
        if (pageNum <= 1) return;
        pageNum--;
        queueRenderPage(pageNum);
    });

    document.getElementById('nextPage').addEventListener('click', () => {
        if (pageNum >= pdfDoc.numPages) return;
        pageNum++;
        queueRenderPage(pageNum);
    });

    document.getElementById('pageNum').addEventListener('change', (e) => {
        let num = parseInt(e.target.value);
        if (num < 1) num = 1;
        if (num > pdfDoc.numPages) num = pdfDoc.numPages;
        pageNum = num;
        queueRenderPage(pageNum);
    });

    // Zoom controls
    document.getElementById('zoomIn').addEventListener('click', () => {
        scale += 0.2;
        updateZoomLevel();
        queueRenderPage(pageNum);
    });

    document.getElementById('zoomOut').addEventListener('click', () => {
        if (scale <= 0.5) return;
        scale -= 0.2;
        updateZoomLevel();
        queueRenderPage(pageNum);
    });

    document.getElementById('fitWidth').addEventListener('click', () => {
        const container = document.getElementById('canvasContainer');
        scale = (container.clientWidth - 100) / canvas.width * scale;
        updateZoomLevel();
        queueRenderPage(pageNum);
    });

    // Sidebar toggle
    document.getElementById('toggleSidebar').addEventListener('click', () => {
        document.getElementById('sidebar').classList.toggle('hidden');
    });

    // Mark complete
    document.getElementById('markComplete').addEventListener('click', () => {
        markPageComplete(pageNum);
    });

    // Notes
    document.getElementById('saveNotes').addEventListener('click', savePageNotes);

    // Modal controls
    setupModals();

    // Quiz FAB
    document.getElementById('quizFab').addEventListener('click', showQuiz);

    // Progress button
    document.getElementById('toggleProgress').addEventListener('click', showProgress);

    // Search button
    document.getElementById('searchBtn').addEventListener('click', showSearch);

    // Chapter search
    document.getElementById('chapterSearch').addEventListener('input', filterChapters);

    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboard);
}

// Update zoom level display
function updateZoomLevel() {
    document.getElementById('zoomLevel').textContent = Math.round(scale * 100) + '%';
}

// Populate chapters
function populateChapters() {
    const nav = document.getElementById('chapterNav');
    nav.innerHTML = '';

    chapters.forEach((chapter, index) => {
        const item = document.createElement('div');
        item.className = 'chapter-item';
        item.dataset.pages = JSON.stringify(chapter.pages);

        const title = document.createElement('span');
        title.textContent = `${chapter.icon} ${chapter.title}`;

        const pages = document.createElement('span');
        pages.className = 'chapter-pages';
        pages.textContent = chapter.pages.length > 1
            ? `p. ${chapter.pages[0]}-${chapter.pages[chapter.pages.length - 1]}`
            : `p. ${chapter.pages[0]}`;

        item.appendChild(title);
        item.appendChild(pages);

        item.addEventListener('click', () => {
            pageNum = chapter.pages[0];
            queueRenderPage(pageNum);
        });

        nav.appendChild(item);
    });
}

// Update chapter highlight
function updateChapterHighlight() {
    const items = document.querySelectorAll('.chapter-item');
    items.forEach(item => {
        const pages = JSON.parse(item.dataset.pages);
        if (pages.includes(pageNum)) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }

        // Check if chapter is completed
        const completed = pages.every(p => isPageCompleted(p));
        if (completed) {
            item.classList.add('completed');
            if (!item.querySelector('.check-mark')) {
                const check = document.createElement('span');
                check.className = 'check-mark';
                check.textContent = '✓';
                item.appendChild(check);
            }
        }
    });
}

// Filter chapters
function filterChapters(e) {
    const query = e.target.value.toLowerCase();
    const items = document.querySelectorAll('.chapter-item');

    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(query)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// Progress tracking
function markPageComplete(page) {
    const completed = getCompletedPages();
    if (!completed.includes(page)) {
        completed.push(page);
        saveCompletedPages(completed);
        updateProgress();
        updateChapterHighlight();

        // Show feedback
        const btn = document.getElementById('markComplete');
        const originalText = btn.textContent;
        btn.textContent = '✓ Marked!';
        btn.style.background = '#38A169';
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
        }, 2000);
    }
}

function getCompletedPages() {
    const stored = localStorage.getItem(STORAGE_KEYS.COMPLETED_PAGES);
    return stored ? JSON.parse(stored) : [];
}

function saveCompletedPages(pages) {
    localStorage.setItem(STORAGE_KEYS.COMPLETED_PAGES, JSON.stringify(pages));
}

function isPageCompleted(page) {
    return getCompletedPages().includes(page);
}

function updateProgress() {
    const completed = getCompletedPages().length;
    const total = pdfDoc ? pdfDoc.numPages : 43;
    const percentage = Math.round((completed / total) * 100);

    document.getElementById('overallProgress').style.width = percentage + '%';
    document.getElementById('progressText').textContent = `${percentage}% completed (${completed}/${total} pages)`;
}

function loadProgress() {
    updateProgress();
    updateChapterHighlight();
}

// Notes functionality
function savePageNotes() {
    const notes = document.getElementById('pageNotes').value;
    const allNotes = getAllNotes();
    allNotes[pageNum] = notes;
    localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(allNotes));

    // Show feedback
    const btn = document.getElementById('saveNotes');
    const originalText = btn.textContent;
    btn.textContent = 'Saved!';
    setTimeout(() => {
        btn.textContent = originalText;
    }, 1500);
}

function loadPageNotes() {
    const allNotes = getAllNotes();
    const notes = allNotes[pageNum] || '';
    document.getElementById('pageNotes').value = notes;
}

function getAllNotes() {
    const stored = localStorage.getItem(STORAGE_KEYS.NOTES);
    return stored ? JSON.parse(stored) : {};
}

// Modal functionality
function setupModals() {
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close');

    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.modal').classList.remove('show');
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('show');
        }
    });
}

// Quiz functionality
function showQuiz() {
    const modal = document.getElementById('quizModal');
    const content = document.getElementById('quizContent');

    // Traffic signs quiz
    const questions = [
        {
            question: "What does this sign mean?",
            sign: "🔺 (Red triangle with exclamation mark)",
            options: ["Give way", "Danger", "No entry", "Stop"],
            correct: 1
        },
        {
            question: "What is the maximum speed within built-up areas?",
            options: ["30 km/h", "50 km/h", "60 km/h", "70 km/h"],
            correct: 1
        },
        {
            question: "What should you do at a roundabout?",
            options: [
                "Give priority to traffic on the roundabout",
                "Speed up and enter quickly",
                "Stop and wait",
                "Honk horn"
            ],
            correct: 0
        },
        {
            question: "How many seconds following distance should you maintain?",
            options: ["1 second", "2 seconds", "3 seconds", "5 seconds"],
            correct: 1
        },
        {
            question: "What does a blue sign with a bicycle mean?",
            options: [
                "No bicycles",
                "Mandatory bicycle path",
                "Watch out: cyclists",
                "Bicycle street"
            ],
            correct: 1
        }
    ];

    content.innerHTML = '';

    questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'quiz-question';

        const questionText = document.createElement('h3');
        questionText.textContent = `${index + 1}. ${q.question}`;
        questionDiv.appendChild(questionText);

        if (q.sign) {
            const sign = document.createElement('p');
            sign.textContent = q.sign;
            sign.style.fontSize = '2rem';
            questionDiv.appendChild(sign);
        }

        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'quiz-options';

        q.options.forEach((option, optIndex) => {
            const optionBtn = document.createElement('div');
            optionBtn.className = 'quiz-option';
            optionBtn.textContent = option;
            optionBtn.addEventListener('click', () => {
                checkAnswer(optionBtn, optIndex === q.correct);
            });
            optionsDiv.appendChild(optionBtn);
        });

        questionDiv.appendChild(optionsDiv);
        content.appendChild(questionDiv);
    });

    modal.classList.add('show');
}

function checkAnswer(element, isCorrect) {
    const options = element.parentElement.querySelectorAll('.quiz-option');
    options.forEach(opt => {
        opt.style.pointerEvents = 'none';
    });

    if (isCorrect) {
        element.classList.add('correct');
        element.textContent += ' ✓';
    } else {
        element.classList.add('incorrect');
        element.textContent += ' ✗';
        // Show correct answer
        options.forEach((opt, idx) => {
            if (!opt.classList.contains('incorrect')) {
                opt.classList.add('correct');
                opt.textContent += ' ✓';
            }
        });
    }
}

// Progress modal
function showProgress() {
    const modal = document.getElementById('progressModal');
    const content = document.getElementById('progressContent');

    const completed = getCompletedPages().length;
    const total = pdfDoc ? pdfDoc.numPages : 43;
    const percentage = Math.round((completed / total) * 100);

    // Calculate chapter completion
    const chapterStats = chapters.map(chapter => {
        const chapterCompleted = chapter.pages.filter(p => isPageCompleted(p)).length;
        return {
            title: chapter.title,
            completed: chapterCompleted,
            total: chapter.pages.length,
            percentage: Math.round((chapterCompleted / chapter.pages.length) * 100)
        };
    });

    content.innerHTML = `
        <div class="progress-stats">
            <div class="stat-card">
                <div class="stat-value">${completed}</div>
                <div class="stat-label">Pages completed</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${percentage}%</div>
                <div class="stat-label">Overall progress</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${total - completed}</div>
                <div class="stat-label">Remaining</div>
            </div>
        </div>

        <h3 style="margin-top: 2rem; margin-bottom: 1rem;">Progress by chapter:</h3>
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            ${chapterStats.map(stat => `
                <div style="padding: 0.75rem; background: var(--bg-color); border-radius: 5px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                        <span>${stat.title}</span>
                        <span style="font-weight: 600;">${stat.completed}/${stat.total}</span>
                    </div>
                    <div style="background: #E2E8F0; border-radius: 10px; height: 8px; overflow: hidden;">
                        <div style="background: var(--success-color); height: 100%; width: ${stat.percentage}%;"></div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    modal.classList.add('show');
}

// Search functionality
function showSearch() {
    const modal = document.getElementById('searchModal');
    const input = document.getElementById('searchInput');
    const results = document.getElementById('searchResults');

    input.value = '';
    results.innerHTML = '';

    input.addEventListener('input', () => {
        const query = input.value.toLowerCase();
        if (query.length < 2) {
            results.innerHTML = '<p style="color: #718096;">Enter at least 2 characters...</p>';
            return;
        }

        // Search in chapter titles
        const matchedChapters = chapters.filter(chapter =>
            chapter.title.toLowerCase().includes(query)
        );

        results.innerHTML = '';

        if (matchedChapters.length === 0) {
            results.innerHTML = '<p style="color: #718096;">No results found.</p>';
        } else {
            matchedChapters.forEach(chapter => {
                const result = document.createElement('div');
                result.className = 'search-result';
                result.innerHTML = `
                    <div class="search-result-page">📄 ${chapter.title}</div>
                    <div style="font-size: 0.9rem; color: #718096;">
                        Page ${chapter.pages.join(', ')}
                    </div>
                `;
                result.addEventListener('click', () => {
                    pageNum = chapter.pages[0];
                    queueRenderPage(pageNum);
                    modal.classList.remove('show');
                });
                results.appendChild(result);
            });
        }
    });

    modal.classList.add('show');
    input.focus();
}

// Keyboard shortcuts
function handleKeyboard(e) {
    // Ignore if typing in input
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
    }

    switch(e.key) {
        case 'ArrowLeft':
        case 'PageUp':
            if (pageNum > 1) {
                pageNum--;
                queueRenderPage(pageNum);
            }
            break;
        case 'ArrowRight':
        case 'PageDown':
        case ' ':
            e.preventDefault();
            if (pageNum < pdfDoc.numPages) {
                pageNum++;
                queueRenderPage(pageNum);
            }
            break;
        case '+':
        case '=':
            scale += 0.2;
            updateZoomLevel();
            queueRenderPage(pageNum);
            break;
        case '-':
            if (scale > 0.5) {
                scale -= 0.2;
                updateZoomLevel();
                queueRenderPage(pageNum);
            }
            break;
        case 'm':
            markPageComplete(pageNum);
            break;
        case '/':
            e.preventDefault();
            showSearch();
            break;
    }
}

// Handle hash navigation
window.addEventListener('hashchange', () => {
    const hash = window.location.hash;
    if (hash.startsWith('#page')) {
        const page = parseInt(hash.replace('#page', ''));
        if (page >= 1 && page <= (pdfDoc ? pdfDoc.numPages : 43)) {
            pageNum = page;
            queueRenderPage(pageNum);
        }
    }
});

// Initialize from hash if present
if (window.location.hash) {
    const hash = window.location.hash;
    if (hash.startsWith('#page')) {
        pageNum = parseInt(hash.replace('#page', ''));
    }
}
