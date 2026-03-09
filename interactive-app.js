// Navigation between sections
const navBtns = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.section');

navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons and sections
        navBtns.forEach(b => b.classList.remove('active'));
        sections.forEach(s => s.classList.remove('active'));

        // Add active class to clicked button
        btn.classList.add('active');

        // Show corresponding section
        const sectionId = btn.getAttribute('data-section');
        document.getElementById(sectionId).classList.add('active');
    });
});

// Topic content database
const topicContent = {
    'gear-shifting': 'topics/gear-shifting.html',
    'seating': generateSeatingContent(),
    'dashboard': generateDashboardContent(),
    'following-distance': generateFollowingDistanceContent(),
    'reversing': 'topics/reversing-advanced.html',
    '3-point-turn': 'topics/3-point-turn.html',
    '2-point-turn': 'topics/2-point-turn.html',
    'u-turn': 'topics/u-turn.html',
    'parallel-forward': 'topics/parallel-forward.html',
    'parallel-reverse': 'topics/parallel-reverse.html',
    'perpendicular-forward': 'topics/forward-perpendicular.html',
    'perpendicular-reverse': 'topics/reverse-perpendicular.html',
    'diagonal-reverse': 'topics/reverse-diagonal.html',
    'diagonal-forward': 'topics/forward-diagonal.html',
    'emergency-stop': 'topics/emergency-stop.html',
    'right-turn': 'topics/right-turn.html',
    'left-turn': 'topics/left-turn.html',
    'intersection-approach': 'topics/intersection-approach.html',
    'pedestrian-rules': 'topics/pedestrian-rules.html',
    'intersection-types': 'topics/intersection-types.html',
    'standard-roundabout': 'topics/standard-roundabout.html',
    'turbo-roundabout': 'topics/turbo-roundabout.html',
    'roundabout-cyclists': 'topics/roundabout-cyclists.html',
    'highway-entry-exit': 'topics/highway-entry-exit.html'
};

// Show topic modal
function showTopic(topicId) {
    const modal = document.getElementById('topicModal');
    const modalBody = document.getElementById('modalBody');

    // Load content
    if (topicContent[topicId]) {
        if (topicContent[topicId].startsWith('topics/')) {
            // Load from file
            fetch(topicContent[topicId])
                .then(response => response.text())
                .then(html => {
                    modalBody.innerHTML = html;
                    modal.classList.add('show');
                })
                .catch(error => {
                    console.error('Error loading topic:', error);
                    modalBody.innerHTML = '<p>加载内容时出错，请重试。</p>';
                    modal.classList.add('show');
                });
        } else {
            // Use generated content
            modalBody.innerHTML = topicContent[topicId];
            modal.classList.add('show');
        }
    } else {
        modalBody.innerHTML = '<div class="topic-detail"><h1>即将推出</h1><p>此主题正在开发中。</p></div>';
        modal.classList.add('show');
    }

    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    const modal = document.getElementById('topicModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
document.getElementById('topicModal').addEventListener('click', (e) => {
    if (e.target.id === 'topicModal') {
        closeModal();
    }
});

// ESC key to close modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Generate content functions for other topics
function generateSeatingContent() {
    return `
        <div class="topic-detail">
            <h1>💺 正确的座椅位置</h1>
            <div class="intro">
                <p><strong>为什么重要：</strong>正确的座椅位置确保您能够舒适地操作所有控制装置，拥有良好的视野，并保持正确的姿势以防止疲劳和受伤。</p>
            </div>

            <div class="method-section">
                <h2>调整座椅</h2>
                <div class="steering-demo">
                    <div class="step">
                        <h3>1. 与踏板的距离</h3>
                        <p><strong>测试：</strong>用右脚完全踩下离合器/刹车踏板。您的膝盖应该略微弯曲（约120°），而不是完全伸直。</p>
                        <p><strong>原因：</strong>这样可以在紧急制动时获得最大力量，同时防止膝盖锁死。</p>
                    </div>

                    <div class="step">
                        <h3>2. 座椅靠背角度</h3>
                        <p><strong>测试：</strong>将手腕放在方向盘顶部。您的肩胛骨应该接触到座椅靠背。</p>
                        <p><strong>原因：</strong>这确保您可以在不向前倾的情况下够到方向盘，减少背部压力。</p>
                    </div>

                    <div class="step">
                        <h3>3. 方向盘高度</h3>
                        <p><strong>测试：</strong>方向盘应该与您的胸部齐平，不应遮挡仪表盘。</p>
                        <p><strong>原因：</strong>清楚地看到速度表和警告灯对安全驾驶至关重要。</p>
                    </div>

                    <div class="step">
                        <h3>4. 头枕位置</h3>
                        <p><strong>测试：</strong>头枕顶部应该与您的头顶对齐，或略高于头顶。</p>
                        <p><strong>原因：</strong>通过支撑您的头部和颈部，在追尾碰撞中防止颈部扭伤。</p>
                    </div>
                </div>
            </div>

            <div class="method-section">
                <h2>后视镜调整</h2>
                <div class="comparison">
                    <h3>侧后视镜（最小化盲区）</h3>
                    <p><strong>传统方法：</strong>调整至刚好能看到车身侧面（约占镜面的1/4）</p>
                    <p><strong>现代方法：</strong>向外调整至车身侧面刚好消失在视野中</p>
                    <p><strong>现代方法的好处：</strong>消除盲区 - 当车辆离开后视镜时，它会出现在侧后视镜中</p>
                </div>

                <div class="comparison">
                    <h3>车内后视镜</h3>
                    <p>将整个后窗居中放在镜中。您应该能够在不移动头部的情况下清楚地看到后方。</p>
                </div>
            </div>

            <div class="tips">
                <h2>常见错误</h2>
                <ul class="tip-list">
                    <li>坐得太近 - 您的手臂应该略微弯曲，而不是完全伸直</li>
                    <li>靠背过于倾斜 - 这不是躺椅；座椅靠背应该几乎直立（100-110°）</li>
                    <li>座椅太低 - 您应该能看到车头前方10英尺的路面</li>
                    <li>后视镜显示太多车身 - 这会造成更大的盲区</li>
                </ul>
            </div>
        </div>
    `;
}

function generateFollowingDistanceContent() {
    return `
        <div class="topic-detail">
            <h1>⏱️ 跟车距离：两秒法则</h1>

            <div class="intro">
                <p><strong>关键安全规则：</strong>保持与前车至少2秒的距离。这给您足够的时间做出反应并安全制动。</p>
            </div>

            <div class="method-section">
                <h2>如何测量2秒距离</h2>
                <div class="steering-demo">
                    <div class="step">
                        <h3>步骤1：选择一个固定参照物</h3>
                        <p>选择前方的静止物体：标志、树木、桥梁或道路标记。</p>
                    </div>

                    <div class="step">
                        <h3>步骤2：当前车经过时开始计数</h3>
                        <p>当前车经过该参照物时，开始计数："一千零一，一千零二..."</p>
                    </div>

                    <div class="step">
                        <h3>步骤3：检查您的位置</h3>
                        <p>在数完"一千零二"之前，您不应到达该参照物</p>
                        <p><strong>距离太近？</strong>松开油门，让距离增加。</p>
                    </div>
                </div>
            </div>

            <div class="comparison">
                <h2>根据路况调整距离</h2>
                <table class="comparison-table">
                    <thead>
                        <tr>
                            <th>路况</th>
                            <th>最小距离</th>
                            <th>原因</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>正常干燥路况</td>
                            <td class="recommended">2秒</td>
                            <td>标准反应 + 制动时间</td>
                        </tr>
                        <tr>
                            <td>下雨或湿滑路面</td>
                            <td class="recommended">4秒</td>
                            <td>轮胎抓地力降低</td>
                        </tr>
                        <tr>
                            <td>冰雪路面</td>
                            <td class="recommended">8-10秒</td>
                            <td>制动能力严重下降</td>
                        </tr>
                        <tr>
                            <td>跟随大型车辆</td>
                            <td class="recommended">4秒</td>
                            <td>需要看到它们周围的路况</td>
                        </tr>
                        <tr>
                            <td>夜间驾驶</td>
                            <td class="recommended">3-4秒</td>
                            <td>能见度降低</td>
                        </tr>
                        <tr>
                            <td>交通拥堵</td>
                            <td class="recommended">至少2秒</td>
                            <td>需要更多反应时间</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="mistakes">
                <h2>常见错误</h2>
                <div class="mistake-grid">
                    <div class="mistake-card">
                        <span class="mistake-icon">❌</span>
                        <h4>跟车过近</h4>
                        <p>跟车过近是追尾事故的头号原因。如果前车突然刹车，您肯定会撞上。</p>
                    </div>

                    <div class="mistake-card">
                        <span class="mistake-icon">❌</span>
                        <h4>缩小车距阻止并线</h4>
                        <p>这是激进且危险的行为。让别人并线 - 您只会损失1-2秒的行程时间。</p>
                    </div>

                    <div class="mistake-card">
                        <span class="mistake-icon">❌</span>
                        <h4>夜间不增加距离</h4>
                        <p>夜间视线不好。增加额外距离以弥补能见度降低。</p>
                    </div>
                </div>
            </div>

            <div class="tips">
                <h2>专业建议</h2>
                <ul class="tip-list">
                    <li><strong>四周留出空间：</strong>尽可能在车辆四周保持空间</li>
                    <li><strong>如果被尾随：</strong>增加您的跟车距离以获得更多反应时间</li>
                    <li><strong>高速公路速度：</strong>以100公里/小时行驶时，2秒约等于55米距离</li>
                    <li><strong>定期练习：</strong>每次驾驶时都计算距离，直到成为习惯</li>
                </ul>
            </div>
        </div>
    `;
}

function generateReversingContent() {
    return `
        <div class="topic-detail">
            <h1>⏪ 安全倒车技巧</h1>
            <div class="intro">
                <p><strong>最危险的操作：</strong>倒车时发生的事故比任何其他操作都多。您的视野有限，行人可能不会预料到您的移动。</p>
            </div>

            <div class="method-section">
                <h2>正确的倒车程序</h2>
                <div class="steering-demo">
                    <div class="step">
                        <h3>1. 全方位检查</h3>
                        <p><strong>在挂倒挡之前：</strong></p>
                        <ul class="tip-list">
                            <li>检查所有后视镜</li>
                            <li>转头看两侧肩膀</li>
                            <li>检查行人，特别是儿童</li>
                            <li>检查骑自行车的人</li>
                            <li>识别任何障碍物</li>
                        </ul>
                    </div>

                    <div class="step">
                        <h3>2. 调整姿势</h3>
                        <p><strong>转动身体：</strong>将右臂放在副驾驶座椅上，从右肩往后看</p>
                        <p><strong>原因：</strong>这样能获得最好的后窗视野</p>
                        <p><strong>左手：</strong>保持在方向盘12点钟位置</p>
                    </div>

                    <div class="step">
                        <h3>3. 缓慢移动</h3>
                        <p><strong>速度：</strong>步行速度或更慢</p>
                        <p><strong>脚的位置：</strong>随时准备刹车</p>
                        <p><strong>持续检查：</strong>不断扫视所有方向</p>
                    </div>

                    <div class="step">
                        <h3>4. 看不清就停车</h3>
                        <p><strong>黄金法则：</strong>如果看不清，就停下来</p>
                        <p>必要时下车检查 - 风险不值得冒</p>
                    </div>
                </div>
            </div>

            <div class="mistakes">
                <h2>危险错误</h2>
                <div class="mistake-grid">
                    <div class="mistake-card">
                        <span class="mistake-icon">❌</span>
                        <h4>只依靠后视镜</h4>
                        <p>后视镜有盲区。您必须亲自转身查看。</p>
                    </div>

                    <div class="mistake-card">
                        <span class="mistake-icon">❌</span>
                        <h4>倒车速度过快</h4>
                        <p>速度慢 = 反应时间多 = 事故少</p>
                    </div>

                    <div class="mistake-card">
                        <span class="mistake-icon">❌</span>
                        <h4>不持续检查</h4>
                        <p>一个孩子可能在1秒内跑到车后。持续扫视！</p>
                    </div>

                    <div class="mistake-card">
                        <span class="mistake-icon">❌</span>
                        <h4>长距离倒车</h4>
                        <p>如果需要倒很远，改为向前开。这样更安全。</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Placeholder functions for other topics
function generateDashboardContent() {
    return `<div class="topic-detail"><h1>📊 仪表盘符号</h1><p>即将推出 - 所有警告灯和指示灯的综合指南。</p></div>`;
}

function generate3PointTurnContent() {
    return `<div class="topic-detail"><h1>🔃 三点掉头</h1><p>即将推出 - 带动画图解的分步指南。</p></div>`;
}

function generate2PointTurnContent() {
    return `<div class="topic-detail"><h1>🔃 两点掉头</h1><p>即将推出 - 利用车道安全掉头。</p></div>`;
}

function generateUTurnContent() {
    return `<div class="topic-detail"><h1>↩️ U型转弯</h1><p>即将推出 - 正确的U型转弯技巧。</p></div>`;
}

function generateParallelForwardContent() {
    return `<div class="topic-detail"><h1>🅿️ 前进式侧方停车</h1><p>即将推出 - 带可视化图解。</p></div>`;
}

function generateParallelReverseContent() {
    return `<div class="topic-detail"><h1>🅿️ 倒车式侧方停车</h1><p>即将推出 - 经典侧方位停车技巧。</p></div>`;
}

function generatePerpendicularForwardContent() {
    return `<div class="topic-detail"><h1>🅿️ 前进式垂直停车</h1><p>即将推出。</p></div>`;
}

function generatePerpendicularReverseContent() {
    return `<div class="topic-detail"><h1>🅿️ 倒车式垂直停车</h1><p>即将推出 - 倒车入库技巧。</p></div>`;
}
