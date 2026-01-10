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
- Runs all unit tests with coverage report (`npm run test:coverage`)
- Runs full production build (`vite build`) which includes TypeScript type checking
- Prevents pushing code that has failing tests or doesn't compile
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

## Testing

### Testing Framework
- **Component Tests**: Vitest + React Testing Library
- **E2E Tests**: Playwright

### Running Tests
```bash
npm run test          # Run tests in watch mode
npm run test:run      # Run tests once
npm run test:coverage # Run tests with coverage report
npm run test:ui       # Run tests with Vitest UI
npm run test:e2e      # Run E2E tests (requires backend running)
npm run test:e2e:ui   # Run E2E tests with Playwright UI
npm run test:all      # Run all tests (unit + E2E)
```

### Test File Location
- Component tests: Place `ComponentName.test.tsx` in the same directory as the component
- Utility tests: Place `utilName.test.ts` in the same directory as the utility
- E2E tests: Place in `e2e/` directory

### Test Utilities
Import test utilities from `src/test/test-utils`:
```typescript
import { render, renderWithoutProvider, screen } from '../../../test/test-utils';
```

- `render` - Renders with all providers (CalendarContext, etc.)
- `renderWithoutProvider` - Renders without providers (for isolated component tests)

---

## Claude Commands

### Creating a Basic Component

When asked to create a new **basic/primitive component** (reusable UI component), create the following files in `src/components/basics/[ComponentName]/`:

**1. `ComponentName.type.ts`** - Types first
```typescript
interface ComponentNameProps {
  // Define all props with explicit types
}

export type { ComponentNameProps };
```

**2. `ComponentName.style.ts`** - Styled components
```typescript
import styled from 'styled-components';
import { colors, fonts, spacing } from '../Styles';

const StyledComponentName = styled.div({
  // Use design tokens from Styles/constants.ts
});

export { StyledComponentName };
```

**3. `ComponentName.tsx`** - Component implementation
```typescript
import type { ReactElement } from 'react';
import { StyledComponentName } from './ComponentName.style';
import type { ComponentNameProps } from './ComponentName.type';

function ComponentName({ prop1, prop2 }: ComponentNameProps): ReactElement {
  return (
    <StyledComponentName>
      {/* Component content */}
    </StyledComponentName>
  );
}

export { ComponentName };
```

**4. `ComponentName.test.tsx`** - Tests
```typescript
import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithoutProvider } from '../../../test/test-utils';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  const defaultProps = {
    // Default test props
  };

  it('renders correctly', () => {
    renderWithoutProvider(<ComponentName {...defaultProps} />);
    // Assertions
  });

  it('handles user interactions', async () => {
    const onClick = vi.fn();
    const { user } = renderWithoutProvider(<ComponentName {...defaultProps} onClick={onClick} />);
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });
});
```

**5. `index.ts`** - Public exports
```typescript
export * from './ComponentName';
export type { ComponentNameProps } from './ComponentName.type';
```

**6. Update `src/components/basics/index.ts`**
```typescript
export * from './ComponentName';
```

### Creating a Feature Component

When asked to create a **feature component** (domain-specific), create files in `src/components/[FeatureName]/`:

Follow the same structure as basic components but:
- Import and compose basic components from `../basics`
- Include feature-specific business logic
- May include local state management
- Tests should use `render` (with providers) if the component uses context

```typescript
// Feature component example
import { Form, TextField, Modal } from '../basics';
import { useCalendar } from '../../hooks/useCalendar';

function FeatureComponent(): ReactElement {
  const { events } = useCalendar();
  // Feature-specific logic using basic components
}
```

### Creating a Container

When asked to create a **container** (smart component with state/context), create files in `src/containers/[ContainerName]/`:

**Structure:**
```
src/containers/ContainerName/
├── ContainerName.tsx      # Container with state/hooks
├── ContainerName.style.ts # Layout styles only
├── ContainerName.test.tsx # Tests with mocked context
└── index.ts
```

**Container Pattern:**
```typescript
import { useState, type ReactElement } from 'react';
import styled from 'styled-components';
import { useCalendar } from '../../hooks/useCalendar';
import { FeatureComponent } from '../../components/FeatureName';

const ContainerWrapper = styled.div({
  // Layout styles
});

function ContainerName(): ReactElement {
  const context = useCalendar();
  const [localState, setLocalState] = useState<StateType>(initialState);

  const handleAction = (): void => {
    // Orchestration logic
  };

  return (
    <ContainerWrapper>
      <FeatureComponent onAction={handleAction} data={context.data} />
    </ContainerWrapper>
  );
}

export { ContainerName };
export default ContainerName;
```

### Creating a Page

When asked to create a **page**, create files in `src/pages/[PageName]/`:

```
src/pages/PageName/
├── PageName.tsx        # Page composition
├── PageName.styles.ts  # Page layout styles
└── index.ts
```

Pages compose containers and provide page-level layout.

### Style Constants Reference

When creating styles, import from `src/components/basics/Styles/constants.ts`:

```typescript
import {
  colors,      // Primary, secondary, background colors
  fonts,       // Font sizes and weights
  spacing,     // Spacing values (xxxsmall to medium)
  margins,     // Margin values
  paddings,    // Padding values
  borderRadius,// Border radius values
  weekGrid,    // Calendar-specific grid settings
  transitions, // Animation timings
  shadows,     // Box shadow values
  opacity,     // Opacity values
} from '../Styles';
```

### Component Checklist

Before completing a component, verify:
- [ ] Types defined in `.type.ts`
- [ ] Styles use design tokens from `Styles/constants.ts`
- [ ] Component has explicit return type (`ReactElement` or `JSX.Element`)
- [ ] Props use type-only imports (`import type { ... }`)
- [ ] Tests cover: rendering, user interactions, edge cases
- [ ] Exported from component's `index.ts`
- [ ] Exported from parent's `index.ts` (basics/index.ts or feature index)
- [ ] No inline styles
- [ ] No `any` types
- [ ] Functions under 100 lines
- [ ] Run `npm run lint` passes
- [ ] Run `npm run test:run` passes
