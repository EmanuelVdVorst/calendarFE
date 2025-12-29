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
- All styles must be in separate `.style.ts` files
- Never use inline styles or traditional CSS files
- Create base styled components and extend them for variations
- Export layout components (ButtonGroup, containers) from style files

**Code Organization:**
- Create separate files for each component/utility
- Clear separation of concerns
- Build reusable components
- Keep files under 300 lines
- Keep functions under 100 lines with max complexity of 10

## Component Architecture

**CRITICAL: Build a Component Library, Not Just Styled Components**

When creating UI elements, follow this established pattern to build a reusable component library:

### Component Structure
Each component should have its own directory with:
- `ComponentName.tsx` - The component implementation
- `ComponentName.type.ts` - All TypeScript interfaces and types
- `ComponentName.style.ts` - All styled-components definitions
- `index.ts` - Public exports

**Example:**
```
src/components/basics/buttons/
├── Buttons.tsx           # CancelButton, DeleteButton, SubmitButton components
├── Button.props.type.ts  # OnlyClickButtonProps, LabeledSubmitButtonProps
├── Button.style.ts       # StyledCancelButton, StyledDeleteButton, etc.
└── index.ts              # export * from './Buttons'
```

### Component Abstraction Levels

**1. Primitive Components (Lowest Level)**
Small, focused, single-purpose components that serve as building blocks:
- `Input` - Basic input wrapper with onChange handler
- `Label` - Simple label component
- `ErrorMessage` - Error display component
- `CancelButton`, `DeleteButton`, `SubmitButton` - Specific button types

**2. Compound Components (Middle Level)**
Combine primitives to create more complex, reusable patterns:
- `TextField` - Combines Label + Input + ErrorMessage
- `TimeField` - TextField with type="time"
- `StartToEndInputField` - Two TimeFields side by side
- `Form` - Form wrapper with submit handling

**3. Feature Components (Highest Level)**
Domain-specific components that use compound components:
- `EventForm` - Uses TextField, TimeField, ButtonGroup
- `EventModal` - Uses Form and other compounds for specific feature

### Design Principles

**Create Abstractions, Not Just Wrappers:**
❌ BAD - Just wrapping styled-components everywhere:
```typescript
// Don't do this in feature code
<StyledInput value={title} onChange={e => setTitle(e.target.value)} />
<StyledLabel>Title</StyledLabel>
```

✅ GOOD - Create reusable component abstractions:
```typescript
// Create the abstraction once in src/components/basics/
function TextField({ label, value, onChange, error }: InputFieldProps) {
  return (
    <StyledFormGroup>
      <Label id={id} label={label} />
      <Input value={value} onChange={onChange} />
      {error && <ErrorMessage label={error} />}
    </StyledFormGroup>
  );
}

// Use clean components in feature code
<TextField label="Title" value={title} onChange={setTitle} error={errors.title} />
```

**Component Responsibilities:**
- **Styled components** (`.style.ts`): Only styling, no logic
- **Component abstractions** (`.tsx`): Handle props, compose smaller components, contain behavior
- **Types** (`.type.ts`): Define clean, specific prop interfaces
- **Exports** (`index.ts`): Control public API

**Build for Reusability:**
- Create small, composable components that can be used across the application
- Each component should do one thing well
- Prefer composition over configuration
- Think "component library" not "one-off implementations"

**Examples from Codebase:**
- See `src/components/basics/buttons/` for button component patterns
- See `src/components/basics/Form/` for form field composition
- See `src/components/basics/Modal/` for modal pattern

### Location of Components
- **Reusable UI components**: `src/components/basics/`
- **Feature-specific components**: `src/components/[FeatureName]/`
- **Layout components**: Export from `.style.ts` files (e.g., `ButtonGroup`, `StyledFormGroup`)

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
- **Root component**: `src/App.tsx` - Calendar application with week view
- **Component library**: `src/components/basics/` - Reusable UI components (buttons, forms, modals)
- **Feature components**: `src/components/` - Feature-specific components (EventForm, Calendar views)
- **Styling**: All styling via styled-components in `.style.ts` files

**Component Organization:**
```
src/components/
├── basics/              # Reusable component library
│   ├── buttons/        # Button components (Cancel, Delete, Submit)
│   ├── Form/           # Form components and input fields
│   └── Modal/          # Modal components
└── [Features]/         # Feature-specific components (EventForm, etc.)
```

### Backend Integration
The backend API runs on `http://localhost:5000` (see `../backend/CLAUDE.md`). When implementing API calls, ensure CORS is properly handled (already configured on backend).
