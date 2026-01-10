# Verify

Run all verification checks (lint + tests) before committing.

## Instructions

Run the following checks in order:

### 1. Lint Check
```bash
npm run lint
```
- Must pass with zero warnings
- Fix any issues before proceeding

### 2. Unit Tests
```bash
npm run test:run
```
- All tests must pass
- Report any failures

### 3. Type Check (via build)
```bash
npm run build
```
- Verifies TypeScript compilation
- Catches type errors not caught by lint

## Report Format

After running all checks, report:

```
Verification Results:
- Lint: PASS/FAIL (X warnings, Y errors)
- Tests: PASS/FAIL (X passed, Y failed)
- Build: PASS/FAIL

Ready to commit: YES/NO
```

## If Checks Fail

1. **Lint failures**: Show the errors and suggest fixes
2. **Test failures**: Identify failing tests and root cause
3. **Build failures**: Show TypeScript errors

## Quick Fix Commands

- Auto-fix lint issues: `npm run lint -- --fix`
- Run specific test: `npx vitest run path/to/test`
- Type check only: `npx tsc --noEmit`
