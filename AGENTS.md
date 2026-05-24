# AGENTS.md

High-signal configuration for OpenCode agents working on this Star Wars Wiki (Next.js 16).

## Development
- **Commands**:
  - `yarn dev`: Start development server (port 3000).
  - `yarn build`: Production build.
  - `yarn tsc`: Check types (must pass for CI).
  - `yarn lint`: Check linting (must pass for CI).
  - `yarn lint:ci`: Runs `tsc` then `lint`.

## Testing
- **E2E (Playwright)**:
  - `yarn e2e`: Headless run.
  - `yarn e2e:ui`: Interactive UI mode.
  - **Prerequisite**: The dev server must be running for `e2e` tests to function correctly.

## Tech Stack Notes
- **Framework**: Next.js 16 (Pages Router).
- **Styling**: Chakra UI (v2.10.9).
- **Environment**: Node >=20.9.0.
