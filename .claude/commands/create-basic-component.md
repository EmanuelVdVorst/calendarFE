# Create Basic Component

Create a new reusable UI component in `src/components/basics/`.

## Arguments
- `$ARGUMENTS` - Component name in PascalCase (e.g., "Button", "Card", "Avatar")

## Instructions

Create the following files for the component named `$ARGUMENTS`:

### 1. Create directory
`src/components/basics/$ARGUMENTS/`

### 2. Create `$ARGUMENTS.type.ts`
```typescript
interface $ARGUMENTSProps {
  // Add props based on component purpose
  children?: React.ReactNode;
}

export type { $ARGUMENTSProps };
```

### 3. Create `$ARGUMENTS.style.ts`
```typescript
import styled from 'styled-components';
import { colors, fonts, spacing, borderRadius, transitions } from '../Styles';

const Styled$ARGUMENTS = styled.div({
  // Use design tokens from constants
});

export { Styled$ARGUMENTS };
```

### 4. Create `$ARGUMENTS.tsx`
```typescript
import type { ReactElement } from 'react';
import { Styled$ARGUMENTS } from './$ARGUMENTS.style';
import type { $ARGUMENTSProps } from './$ARGUMENTS.type';

function $ARGUMENTS({ children }: $ARGUMENTSProps): ReactElement {
  return (
    <Styled$ARGUMENTS>
      {children}
    </Styled$ARGUMENTS>
  );
}

export { $ARGUMENTS };
```

### 5. Create `$ARGUMENTS.test.tsx`
```typescript
import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithoutProvider } from '../../../test/test-utils';
import { $ARGUMENTS } from './$ARGUMENTS';

describe('$ARGUMENTS', () => {
  it('renders correctly', () => {
    renderWithoutProvider(<$ARGUMENTS>Test content</$ARGUMENTS>);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  // Add more tests for interactions and edge cases
});
```

### 6. Create `index.ts`
```typescript
export * from './$ARGUMENTS';
export type { $ARGUMENTSProps } from './$ARGUMENTS.type';
```

### 7. Update `src/components/basics/index.ts`
Add export for the new component:
```typescript
export * from './$ARGUMENTS';
```

### 8. Verify
- Run `npm run lint` to check for errors
- Run `npm run test:run` to verify tests pass

## Design Tokens Reference
Import from `../Styles`:
- `colors` - Primary, secondary, background colors
- `fonts` - Font sizes (.size) and weights (.weight)
- `spacing` - xxxsmall (1px) to medium (12px)
- `margins` - xxxsmall (2px) to medium (12px)
- `borderRadius` - small (4px), medium (6px)
- `transitions` - fast, medium, slow
- `shadows` - light, medium
