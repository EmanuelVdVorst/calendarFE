# Create Container

Create a new smart container component with state management in `src/containers/`.

## Arguments
- `$ARGUMENTS` - Container name in PascalCase (e.g., "WeekView", "EventList", "Sidebar")

## Instructions

Create the following files for the container named `$ARGUMENTS`:

### 1. Create directory
`src/containers/$ARGUMENTS/`

### 2. Create `$ARGUMENTS.style.ts`
```typescript
import styled from 'styled-components';
import { colors, spacing } from '../../components/basics/Styles';

const $ARGUMENTSContainer = styled.div({
  // Layout styles only - containers focus on structure
  display: 'flex',
  flexDirection: 'column',
});

export { $ARGUMENTSContainer };
```

### 3. Create `$ARGUMENTS.tsx`
```typescript
import { useState, type ReactElement } from 'react';
import { $ARGUMENTSContainer } from './$ARGUMENTS.style';
import { useCalendar } from '../../hooks/useCalendar';
// Import feature components as needed

interface $ARGUMENTSState {
  // Local state type
}

function $ARGUMENTS(): ReactElement {
  // Context hooks
  const context = useCalendar();

  // Local state
  const [state, setState] = useState<$ARGUMENTSState | null>(null);

  // Event handlers
  const handleAction = (): void => {
    // Orchestration logic
  };

  return (
    <$ARGUMENTSContainer>
      {/* Compose feature components, pass handlers and context data */}
    </$ARGUMENTSContainer>
  );
}

export { $ARGUMENTS };
export default $ARGUMENTS;
```

### 4. Create `$ARGUMENTS.test.tsx`
```typescript
import { describe, it, expect, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { render } from '../../test/test-utils';
import { $ARGUMENTS } from './$ARGUMENTS';

// Mock API if needed
vi.mock('../../api/events.api', () => ({
  eventsApi: {
    getAll: vi.fn().mockResolvedValue([]),
    create: vi.fn().mockResolvedValue({ id: '1' }),
  },
}));

describe('$ARGUMENTS', () => {
  it('renders correctly', async () => {
    render(<$ARGUMENTS />);
    // Wait for async operations if needed
    await waitFor(() => {
      // Add assertions
    });
  });

  it('handles state changes', async () => {
    const { user } = render(<$ARGUMENTS />);
    // Test state-driven interactions
  });
});
```

### 5. Create `index.ts`
```typescript
export { $ARGUMENTS } from './$ARGUMENTS';
export { default } from './$ARGUMENTS';
```

### 6. Verify
- Run `npm run lint` to check for errors
- Run `npm run test:run` to verify tests pass

## Container Responsibilities
- State management (useState, useReducer)
- Context consumption (useCalendar, etc.)
- Side effects coordination
- Passing data/handlers down to feature components
- NO direct UI primitives - compose feature components instead
