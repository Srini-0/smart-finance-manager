# Coding Standards - Kiro Finance

## Overview

This document outlines the coding standards and best practices for the Kiro Finance project.

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: React Hooks (useState, useEffect)
- **Data Storage**: Browser localStorage
- **Charts**: Recharts
- **PDF Generation**: jsPDF
- **Date Handling**: date-fns

## File Structure

```
src/
├── components/
│   ├── finance/      # Feature-specific components
│   └── ui/           # Reusable UI components (shadcn/ui)
├── hooks/            # Custom React hooks
├── pages/            # Page components
├── lib/              # Utility functions
└── App.tsx           # Main application component
```

## TypeScript Guidelines

### Type Definitions

Always define explicit types for:
- Component props
- Function parameters and return types
- State variables
- API responses
- Data models

```typescript
// ✅ Good
interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

// ❌ Bad
const expense: any = { ... };
```

### Interfaces vs Types

- Use `interface` for object shapes
- Use `type` for unions, intersections, and primitives

```typescript
// ✅ Good
interface User {
  id: string;
  name: string;
}

type Status = 'active' | 'inactive' | 'pending';

// ❌ Bad
type User = {
  id: string;
  name: string;
}
```

## React Component Guidelines

### Component Structure

```typescript
import { useState } from "react";
import { ComponentProps } from "./types";

const MyComponent = ({ prop1, prop2 }: ComponentProps) => {
  // 1. Hooks
  const [state, setState] = useState();
  
  // 2. Derived state
  const derivedValue = computeValue(state);
  
  // 3. Event handlers
  const handleClick = () => {
    // handler logic
  };
  
  // 4. Effects
  useEffect(() => {
    // effect logic
  }, [dependencies]);
  
  // 5. Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
};

export default MyComponent;
```

### Naming Conventions

- **Components**: PascalCase (`ExpenseTracker`, `DashboardOverview`)
- **Files**: PascalCase for components (`ExpenseTracker.tsx`)
- **Hooks**: camelCase with `use` prefix (`useFinanceData`)
- **Functions**: camelCase (`calculateTotal`, `formatDate`)
- **Constants**: UPPER_SNAKE_CASE (`STORAGE_KEYS`, `MAX_AMOUNT`)
- **Interfaces**: PascalCase (`Expense`, `Transaction`)

### Props

```typescript
// ✅ Good - Destructure props
const Button = ({ label, onClick, disabled }: ButtonProps) => {
  return <button onClick={onClick} disabled={disabled}>{label}</button>;
};

// ❌ Bad - Using props object
const Button = (props: ButtonProps) => {
  return <button onClick={props.onClick}>{props.label}</button>;
};
```

## State Management

### Local State

Use `useState` for component-local state:

```typescript
const [isOpen, setIsOpen] = useState(false);
const [count, setCount] = useState(0);
```

### Shared State

Use custom hooks for shared state across components:

```typescript
// hooks/useFinanceData.ts
export const useFinanceData = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  
  const addExpense = (expense: Expense) => {
    setExpenses(prev => [...prev, expense]);
  };
  
  return { expenses, addExpense };
};
```

### Local Storage

Always sync state with localStorage for persistence:

```typescript
// Load from localStorage
useEffect(() => {
  const saved = localStorage.getItem('key');
  if (saved) setData(JSON.parse(saved));
}, []);

// Save to localStorage
useEffect(() => {
  localStorage.setItem('key', JSON.stringify(data));
}, [data]);
```

## Styling Guidelines

### Tailwind CSS

Use Tailwind utility classes for styling:

```typescript
// ✅ Good
<div className="flex items-center gap-4 p-6 rounded-lg bg-card shadow-md">

// ❌ Bad - Inline styles
<div style={{ display: 'flex', padding: '24px' }}>
```

### Responsive Design

Use Tailwind responsive prefixes:

```typescript
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
```

### Color Scheme

Use semantic color variables:

```typescript
// ✅ Good
<div className="text-primary bg-primary/10">
<div className="text-success bg-success/10">
<div className="text-warning bg-warning/10">

// ❌ Bad - Hard-coded colors
<div className="text-purple-600 bg-purple-100">
```

## Data Handling

### IDs

Use unique IDs for all data items:

```typescript
const newExpense: Expense = {
  id: `expense-${Date.now()}-${Math.random()}`,
  // ... other fields
};
```

### Dates

Use ISO string format for dates:

```typescript
const expense: Expense = {
  date: new Date().toISOString(),
  // ... other fields
};
```

Format dates for display using date-fns:

```typescript
import { format } from "date-fns";

const formattedDate = format(new Date(expense.date), "MMM d, yyyy");
```

## Error Handling

### Try-Catch

Always wrap risky operations:

```typescript
try {
  const data = JSON.parse(localStorage.getItem('key'));
  setData(data);
} catch (error) {
  console.error('Failed to load data:', error);
  toast({
    title: "Error",
    description: "Failed to load data",
    variant: "destructive"
  });
}
```

### User Feedback

Always provide feedback for user actions:

```typescript
const handleSave = () => {
  try {
    saveData();
    toast({
      title: "Success",
      description: "Data saved successfully"
    });
  } catch (error) {
    toast({
      title: "Error",
      description: "Failed to save data",
      variant: "destructive"
    });
  }
};
```

## Performance

### Memoization

Use `useMemo` for expensive calculations:

```typescript
const totalExpenses = useMemo(() => 
  expenses.reduce((sum, e) => sum + e.amount, 0),
  [expenses]
);
```

### Callback Optimization

Use `useCallback` for event handlers passed to children:

```typescript
const handleDelete = useCallback((id: string) => {
  setExpenses(prev => prev.filter(e => e.id !== id));
}, []);
```

## Accessibility

### Semantic HTML

Use appropriate HTML elements:

```typescript
// ✅ Good
<button onClick={handleClick}>Click me</button>
<nav>...</nav>
<main>...</main>

// ❌ Bad
<div onClick={handleClick}>Click me</div>
```

### ARIA Labels

Add labels for screen readers:

```typescript
<button aria-label="Delete expense" onClick={handleDelete}>
  <Trash className="h-4 w-4" />
</button>
```

## Testing

### Component Testing

Test user interactions and state changes:

```typescript
// Test that adding an expense updates the list
// Test that deleting an expense removes it
// Test that calculations are correct
```

### Edge Cases

Always test edge cases:
- Empty states
- Maximum values
- Invalid inputs
- Network failures

## Comments

### When to Comment

- Complex business logic
- Non-obvious algorithms
- Workarounds or hacks
- TODO items

```typescript
// Calculate compound interest with monthly contributions
const calculateReturns = (principal: number, rate: number, years: number) => {
  // Formula: A = P(1 + r/n)^(nt)
  const n = 12; // Monthly compounding
  return principal * Math.pow(1 + rate / n, n * years);
};
```

### When NOT to Comment

- Self-explanatory code
- Redundant information

```typescript
// ❌ Bad - Obvious comment
// Set the name to John
const name = "John";

// ✅ Good - No comment needed
const userName = "John";
```

## Git Commit Messages

Follow conventional commits:

```
feat: add investment calculator
fix: correct savings rate calculation
docs: update README with setup instructions
style: format code with prettier
refactor: extract expense logic to hook
test: add tests for budget calculations
chore: update dependencies
```

## Code Review Checklist

- [ ] TypeScript types are properly defined
- [ ] Components follow naming conventions
- [ ] State management is appropriate
- [ ] Error handling is implemented
- [ ] User feedback is provided
- [ ] Code is accessible
- [ ] Performance is optimized
- [ ] Tests are written
- [ ] Documentation is updated

---

**Remember**: Write code that is easy to read, maintain, and extend. Prioritize clarity over cleverness.
