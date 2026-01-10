# Run Tests

Run the test suite and report results.

## Arguments
- `$ARGUMENTS` - Optional: "all", "coverage", "e2e", or a specific test file path

## Instructions

Based on the argument, run the appropriate test command:

### No argument or "unit"
Run unit/component tests:
```bash
npm run test:run
```

### "coverage"
Run tests with coverage report:
```bash
npm run test:coverage
```

### "e2e"
Run E2E tests (requires dev server):
```bash
npm run test:e2e
```

### "all"
Run all tests:
```bash
npm run test:all
```

### Specific file path
Run tests for a specific file:
```bash
npx vitest run $ARGUMENTS
```

## After Running Tests

1. Report the number of passing/failing tests
2. If tests fail, identify the failing tests and suggest fixes
3. If coverage is run, report coverage percentages

## Common Test Issues

### Test fails with "not wrapped in act(...)"
- Wrap state updates in `waitFor` or use `user` from test-utils

### Test fails with "Unable to find element"
- Check if component renders conditionally
- Use `findBy*` for async elements
- Verify correct test ID or role

### Test fails with provider errors
- Use `render` instead of `renderWithoutProvider` for context-dependent components
