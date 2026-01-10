# Create Feature Component

Create a new domain-specific feature component in `src/components/`.

## Arguments
- `$ARGUMENTS` - Component name in PascalCase (e.g., "EventCard", "UserProfile", "SettingsPanel")

## Instructions

Create the following files for the feature component named `$ARGUMENTS`:

### 1. Create directory
`src/components/$ARGUMENTS/`

### 2. Create `$ARGUMENTS.type.ts`
```typescript
interface $ARGUMENTSProps {
  // Add feature-specific props
}

export type { $ARGUMENTSProps };
```

### 3. Create `$ARGUMENTS.style.ts`
```typescript
import styled from 'styled-components';
import { colors, fonts, spacing, borderRadius } from '../basics/Styles';

const Styled$ARGUMENTSContainer = styled.div({
  // Feature layout styles using design tokens
});

export { Styled$ARGUMENTSContainer };
```

### 4. Create `$ARGUMENTS.tsx`
```typescript
import type { ReactElement } from 'react';
import { Styled$ARGUMENTSContainer } from './$ARGUMENTS.style';
import type { $ARGUMENTSProps } from './$ARGUMENTS.type';
// Import basic components as needed
import { Form, TextField, Modal } from '../basics';

function $ARGUMENTS(props: $ARGUMENTSProps): ReactElement {
  return (
    <Styled$ARGUMENTSContainer>
      {/* Compose using basic components */}
    </Styled$ARGUMENTSContainer>
  );
}

export { $ARGUMENTS };
export default $ARGUMENTS;
```

### 5. Create `$ARGUMENTS.test.tsx`
```typescript
import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from '../../test/test-utils';
import { $ARGUMENTS } from './$ARGUMENTS';

describe('$ARGUMENTS', () => {
  const defaultProps = {
    // Default test props
  };

  it('renders correctly', () => {
    render(<$ARGUMENTS {...defaultProps} />);
    // Add assertions
  });

  it('handles user interactions', async () => {
    const onAction = vi.fn();
    const { user } = render(<$ARGUMENTS {...defaultProps} onAction={onAction} />);
    // Test interactions
  });
});
```

### 6. Create `index.ts`
```typescript
export * from './$ARGUMENTS';
export type { $ARGUMENTSProps } from './$ARGUMENTS.type';
```

### 7. Verify
- Run `npm run lint` to check for errors
- Run `npm run test:run` to verify tests pass

## Notes
- Feature components COMPOSE basic components (don't recreate them)
- Import from `../basics` for UI primitives
- Use `render` (with providers) in tests if component uses context
- Keep business logic in the component, styling in .style.ts
