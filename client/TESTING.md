# Testing Guide

## Overview

This project uses **Vitest** and **React Testing Library** for component testing. The testing setup follows best practices for React 19 applications.

## Tech Stack

- **Vitest** - Fast unit test framework powered by Vite
- **React Testing Library** - Testing utilities that encourage good testing practices
- **@testing-library/user-event** - Advanced user interaction simulation
- **@testing-library/jest-dom** - Custom matchers for DOM assertions
- **jsdom** - JavaScript implementation of web standards for Node.js

## Running Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode
npm run test

# Run tests with UI
npm run test:ui

# Run tests with coverage report
npm run test:coverage
```

## Test Structure

Tests are organized alongside the components they test:

```
src/components/
├── atoms/
│   ├── CyberButton.tsx
│   └── __tests__/
│       └── CyberButton.test.tsx
├── molecules/
│   ├── ResourceCard.tsx
│   └── __tests__/
│       └── ResourceCard.test.tsx
└── organisms/
    ├── Header.tsx
    └── __tests__/
        └── Header.test.tsx
```

## Test Coverage

### Atoms (Basic Components)
- **CyberButton** - 6 tests
  - Rendering with labels
  - Click handlers
  - Disabled states
  - Loading states
  - Icon rendering

- **NeonText** - 6 tests
  - Text rendering
  - Color variants (cyan/red)
  - Custom classes and sizes
  - Font styling

- **GlassPanel** - 6 tests
  - Children rendering
  - Active/inactive states
  - Custom styling
  - Backdrop effects

- **ProgressBar** - 5 tests
  - Element rendering
  - Color variants
  - Rounded styling
  - Transition effects

### Molecules (Composite Components)
- **ResourceCard** - 6 tests
  - Resource display
  - Critical state handling
  - Button interactions
  - Icon rendering for different resource types
  - Disabled states

- **LogEntry** - 6 tests
  - Timestamp and message display
  - Log type styling (ALERT/SUCCESS/INFO)
  - Typography

### Organisms (Complex Components)
- **Header** - 6 tests
  - Title rendering
  - Connection status display
  - Status indicators (green/red)
  - Icon animations

- **NotFound** - 5 tests
  - 404 message display
  - Navigation functionality
  - Alert icon rendering
  - Button interactions

## Writing Tests

### Example Test Pattern

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MyComponent from '../MyComponent'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent prop="value" />)
    expect(screen.getByText('value')).toBeInTheDocument()
  })

  it('handles user interaction', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(<MyComponent onClick={handleClick} />)
    
    await user.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalled()
  })
})
```

### Best Practices

1. **Use semantic queries** - Prefer `getByRole`, `getByLabelText` over `getByTestId`
2. **Test user behavior** - Focus on what users see and do, not implementation details
3. **Avoid testing implementation** - Don't test internal state or methods
4. **Mock external dependencies** - Mock API calls, timers, and browser APIs
5. **Keep tests simple** - One assertion per test when possible
6. **Use descriptive names** - Test names should clearly describe what they verify

## Configuration

### vite.config.ts

```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
  },
})
```

### Test Setup (src/test/setup.ts)

```typescript
import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

expect.extend(matchers)

afterEach(() => {
  cleanup()
})
```

## Common Testing Patterns

### Testing Components with State

```typescript
it('updates state on click', async () => {
  const user = userEvent.setup()
  render(<Counter />)
  
  await user.click(screen.getByRole('button', { name: /increment/i }))
  expect(screen.getByText('1')).toBeInTheDocument()
})
```

### Testing Async Operations

```typescript
it('loads data', async () => {
  render(<DataLoader />)
  
  await waitFor(() => {
    expect(screen.getByText('Data loaded')).toBeInTheDocument()
  })
})
```

### Testing with Router

```typescript
import { BrowserRouter } from 'react-router-dom'

it('navigates correctly', () => {
  render(
    <BrowserRouter>
      <MyComponent />
    </BrowserRouter>
  )
})
```

## Troubleshooting

### Tests Failing Due to CSS Classes
If testing Tailwind classes, ensure `css: true` is set in vite.config.ts

### TypeScript Errors with Matchers
Install `@testing-library/jest-dom` and extend expect in setup file

### Async Test Warnings
Always use `await` with `userEvent` methods and `waitFor` for async assertions

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Library Queries](https://testing-library.com/docs/queries/about)
- [User Event API](https://testing-library.com/docs/user-event/intro)
