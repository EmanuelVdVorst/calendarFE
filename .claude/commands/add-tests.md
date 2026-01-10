# Add Tests

Add tests to an existing component that doesn't have tests yet.

## Arguments
- `$ARGUMENTS` - Path to component file (e.g., "src/components/EventBlock/EventBlock.tsx")

## Instructions

### 1. Read the Component
First, read the component file to understand:
- Props interface
- Component behavior
- User interactions
- Conditional rendering
- Side effects

### 2. Create Test File
Create `ComponentName.test.tsx` in the same directory as the component.

### 3. Test Structure
```typescript
import { describe, it, expect, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { render, renderWithoutProvider } from 'PATH_TO_TEST_UTILS';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  // Default props for reuse
  const defaultProps = {
    // ... extract from component props
  };

  describe('rendering', () => {
    it('renders with required props', () => {
      // Test basic rendering
    });

    it('renders conditionally based on props', () => {
      // Test conditional rendering
    });
  });

  describe('interactions', () => {
    it('handles click events', async () => {
      const onClick = vi.fn();
      const { user } = render(<ComponentName onClick={onClick} />);
      await user.click(screen.getByRole('button'));
      expect(onClick).toHaveBeenCalled();
    });

    it('handles form submissions', async () => {
      // Test form behavior
    });
  });

  describe('edge cases', () => {
    it('handles empty data', () => {
      // Test with empty/null values
    });

    it('handles loading state', () => {
      // Test loading states if applicable
    });
  });
});
```

### 4. Test Checklist
Ensure tests cover:
- [ ] Basic rendering with required props
- [ ] Rendering with optional props
- [ ] User interactions (clicks, typing, etc.)
- [ ] Conditional rendering paths
- [ ] Error states
- [ ] Loading states (if applicable)
- [ ] Edge cases (empty data, null values)

### 5. Run Tests
```bash
npx vitest run $ARGUMENTS
```

## Test Utils Path Reference
- From `src/components/basics/*/`: `../../../test/test-utils`
- From `src/components/*/`: `../../test/test-utils`
- From `src/containers/*/`: `../../test/test-utils`

## When to Use Which Render
- `renderWithoutProvider`: Isolated basic components
- `render`: Components using CalendarContext or other providers
