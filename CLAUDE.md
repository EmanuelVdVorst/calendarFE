# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the frontend for a Calendar application built with React, TypeScript, and Vite. It's part of a larger monorepo structure with a separate backend directory at `../backend`.

## Coding Standards

**Type Safety:**
- Use strong typing - no `any` types allowed
- Explicit return types required for all functions
- Prefer interfaces over type aliases
- Use type-only imports when importing types

**Styling:**
- Always use styled-components for component styling
- Avoid inline styles and traditional CSS when possible

**Code Organization:**
- Create separate files for each component/utility
- Clear separation of concerns
- Build reusable components
- Keep files under 300 lines
- Keep functions under 100 lines with max complexity of 10

## Development Commands

### Running the Development Server
```bash
npm run dev
```
Starts Vite development server with hot module replacement (HMR) on `http://localhost:3000`.

### Building for Production
```bash
npm run build
```
Compiles TypeScript and builds optimized production bundle. The build process runs `tsc` for type checking followed by `vite build`.

### Preview Production Build
```bash
npm run preview
```
Serves the production build locally for testing before deployment.

### Linting
```bash
npm run lint
```
Runs ESLint with comprehensive TypeScript and React rules. The linter is configured with **zero tolerance for warnings** (`--max-warnings 0`), ensuring high code quality.

**Key Enforced Rules:**
- **Strong Typing**: `no-explicit-any` is an error, explicit return types required for functions
- **Type Imports**: Use `type` keyword for type-only imports
- **React Best Practices**: Self-closing components, no useless fragments, proper hook usage
- **Clean Code**: Max function length (100 lines), max complexity (10), max nesting depth (3)
- **File Organization**: Max file length (300 lines) to encourage separation of concerns

## Git Hooks (Husky)

The project uses Husky to enforce code quality before commits and pushes:

### Pre-commit Hook
- Runs `lint-staged` on staged files
- Auto-fixes ESLint issues where possible
- Prevents commits with linting errors or warnings
- Only lints files that are being committed (fast!)

### Pre-push Hook
- Runs full TypeScript type checking (`tsc`)
- Runs full production build (`vite build`)
- Prevents pushing code that doesn't compile or has type errors
- This is the final quality gate before code reaches GitHub

**Note:** If you need to bypass hooks in an emergency (not recommended), use `git commit --no-verify` or `git push --no-verify`.

## Architecture

### Technology Stack
- **Framework**: React 18.2 with TypeScript
- **Build Tool**: Vite 5.x with @vitejs/plugin-react
- **Language**: TypeScript with strict mode enabled
- **Styling**: styled-components for component-scoped CSS-in-JS
- **Module System**: ESNext modules with bundler resolution

### TypeScript Configuration
- Strict mode enabled with comprehensive linting checks (`noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`)
- Target: ES2020 with DOM libraries
- JSX mode: `react-jsx` (automatic runtime, no need to import React in every file)
- Module resolution: bundler mode (allows importing `.ts`/`.tsx` extensions)
- `noEmit: true` (Vite handles bundling, TypeScript only checks types)

### Application Structure
- **Entry point**: `index.html` loads `src/main.tsx`
- **Root component**: `src/App.tsx` - Currently a minimal template with counter demo
- **Styling**: Component-level CSS (`App.css`) and global styles (`index.css`)

The application is currently in initial setup phase with placeholder content. As it grows, consider organizing components, hooks, and utilities into dedicated directories within `src/`.

### Backend Integration
The backend API runs on `http://localhost:5000` (see `../backend/CLAUDE.md`). When implementing API calls, ensure CORS is properly handled (already configured on backend).
