# AGENTS.md

High-signal configuration for OpenCode agents working on this Star Wars Wiki (Next.js 12).

## Development
- **Commands**:
  - `yarn dev`: Start development server (port 3000).
  - `yarn build`: Production build.
  - `yarn tsc`: Check types (must pass for CI).
  - `yarn lint`: Check linting (must pass for CI).
  - `yarn lint:ci`: Runs `tsc` then `lint`.

## Testing
- **E2E (Cypress)**:
  - `yarn cypress:open`: Interactive UI mode.
  - `yarn cypress:run`: Headless run.
  - **Prerequisite**: The dev server must be running for `cypress:run` tests to function correctly if you are not using the `start:ci` helper.

## Tech Stack Notes
- **Framework**: Next.js 12.
- **Styling**: Chakra UI (v1.6.5).
- **Environment**: Node >=16.12.0.
