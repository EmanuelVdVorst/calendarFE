# Create Page

Create a new page component in `src/pages/`.

## Arguments
- `$ARGUMENTS` - Page name in PascalCase (e.g., "Dashboard", "Settings", "Profile")

## Instructions

Create the following files for the page named `$ARGUMENTS`:

### 1. Create directory
`src/pages/$ARGUMENTS/`

### 2. Create `$ARGUMENTS.styles.ts`
```typescript
import styled from 'styled-components';
import { colors } from '../../components/basics/Styles';

const $ARGUMENTSContainer = styled.div({
  display: 'flex',
  minHeight: '100vh',
  backgroundColor: colors.background,
});

const $ARGUMENTSContent = styled.main({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
});

export { $ARGUMENTSContainer, $ARGUMENTSContent };
```

### 3. Create `$ARGUMENTS.tsx`
```typescript
import type { ReactElement } from 'react';
import { $ARGUMENTSContainer, $ARGUMENTSContent } from './$ARGUMENTS.styles';
// Import containers as needed

function $ARGUMENTS(): ReactElement {
  return (
    <$ARGUMENTSContainer>
      <$ARGUMENTSContent>
        {/* Compose containers here */}
      </$ARGUMENTSContent>
    </$ARGUMENTSContainer>
  );
}

export default $ARGUMENTS;
```

### 4. Create `index.ts`
```typescript
export { default } from './$ARGUMENTS';
```

### 5. Verify
- Run `npm run lint` to check for errors

## Page Responsibilities
- Top-level layout composition
- Route-level structure
- Compose containers (NOT direct components)
- Minimal logic - delegate to containers
