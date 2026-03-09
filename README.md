# Fixed Peer Group Public-Disclosure Research Foundation

This repository contains a standardized, execution-ready evidence system for a fixed 17-company peer group.

## What Was Upgraded
- Added tracked folder skeletons (`.gitkeep`) for every required company subfolder.
- Standardized all master tables with IDs, status fields, and controlled vocabulary hooks.
- Pre-seeded `extraction_master.csv` (17 rows) and `evidence_matrix.csv` (17 x 6 = 102 rows).
- Added explicit data dictionary and QC checklist files for reproducible handoffs.

## Scope Guardrails
- Exactly 17 companies included (no additions, no removals).
- No investment advice, no ranking, no unsupported language.
- Parent/entity mapping enforced:
  - Siemens-related healthcare disclosures -> Siemens Healthineers.
  - Beckman Coulter disclosures -> Danaher disclosure entity.
  - Mead Johnson/Nutrition disclosures -> Reckitt disclosure entity.
  - Novartis and Sandoz researched separately.

## Required Deliverables
1. Company master list (`00_master/company_master_list.csv`)
2. Source log (`00_master/source_log.csv`)
3. Evidence matrix (`00_master/evidence_matrix.csv`)
4. Seventeen one-page summaries (`01_companies/*/07_Notes/company_one_page_summary.md`)
5. Second-round deep-research tasks (`00_master/second_round_tasks.csv`)

## Recommended Workflow
1. Collect official sources into company folders.
2. Register each source in `source_log.csv`.
3. Extract with `extraction_master.csv`.
4. Validate claims in `validation_log.csv`.
5. Populate `evidence_matrix.csv`.
6. Update company one-page summaries and second-round tasks.
