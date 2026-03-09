# Fixed Peer Group Public-Disclosure AI Research Foundation

This repository is structured for reproducible public-disclosure research across a fixed 17-company peer group.

## Objective
Build a verifiable evidence base for AI and automation narratives using only official public sources (annual reports, quarterly/interim materials, presentations, transcripts, and official releases).

## Fixed Scope
Exactly these 17 companies are in scope:
- Becton, Dickinson and Company (`BD`)
- Johnson & Johnson (`JNJ`)
- DexCom (`DexCom`)
- Roche (`Roche`)
- Thermo Fisher Scientific (`ThermoFisher`)
- Siemens Healthineers (`SiemensHealthineers`)
- Danaher (`Danaher`)
- Danone (`Danone`)
- Nestle (`Nestle`)
- Reckitt (`Reckitt`)
- Teva (`Teva`)
- Sanofi (`Sanofi`)
- Novartis (`Novartis`)
- Sandoz (`Sandoz`)
- Edwards Lifesciences (`EdwardsLifesciences`)
- Boston Scientific (`BostonScientific`)
- Medtronic (`Medtronic`)

## Repository Layout
- `00_master/`: central tables, dictionaries, quality controls, and run tracking.
- `01_companies/<company>/`: company-level source folders and notes.

Each company has standardized subfolders:
- `01_Annual_Reports/`
- `02_Quarterly_or_Interim_Results/`
- `03_Investor_Presentations/`
- `04_Earnings_Call_Transcripts/`
- `05_Strategy_or_Capital_Markets_Day/`
- `06_Press_Releases/`
- `07_Notes/`
- `08_Validation_Log/`

## Deliverables
1. `00_master/company_master_list.csv`
2. `00_master/source_log.csv`
3. `00_master/extraction_master.csv`
4. `00_master/evidence_matrix.csv`
5. `00_master/second_round_tasks.csv`
6. `01_companies/*/07_Notes/company_one_page_summary.md`
7. `01_companies/*/08_Validation_Log/validation_log.csv`

## Execution Standard
- Use official company disclosures only.
- Keep evidence quote-level and source-citable.
- Separate verified facts from assumptions.
- Track unknowns explicitly rather than inferring.

## Current Status
- Folder system and templates are fully initialized for all 17 companies.
- Master tables are populated with scope and placeholders.
- Content extraction remains pending where official pages were not crawlable in this environment.

## Next Run Priority
1. Collect/download latest official documents into each company folder.
2. Update `source_log.csv` with exact file metadata.
3. Populate `extraction_master.csv` and `evidence_matrix.csv` with claim-level evidence.
4. Close open items in `second_round_tasks.csv` and per-company validation logs.
