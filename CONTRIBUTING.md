# Contributing to Kiro Finance

First off, thank you for considering contributing to Kiro Finance! It's people like you that make Kiro Finance such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

**Bug Report Template:**

```markdown
**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**
 - OS: [e.g. macOS, Windows, Linux]
 - Browser: [e.g. Chrome 120, Firefox 121]
 - Version: [e.g. 1.0.0]

**Additional context**
Add any other context about the problem here.
```

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

**Enhancement Template:**

```markdown
**Is your feature request related to a problem?**
A clear and concise description of what the problem is.

**Describe the solution you'd like**
A clear and concise description of what you want to happen.

**Describe alternatives you've considered**
A clear and concise description of any alternative solutions or features you've considered.

**Additional context**
Add any other context or screenshots about the feature request here.
```

### Pull Requests

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

**Pull Request Guidelines:**

- Follow the existing code style
- Write clear, descriptive commit messages
- Include tests for new features
- Update documentation as needed
- Ensure all tests pass
- Keep PRs focused on a single feature/fix

## Development Setup

### Prerequisites

- Node.js 18+ and npm
- Git

### Setup Steps

```bash
# Clone your fork
git clone https://github.com/your-username/kiro-finance.git
cd kiro-finance

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests (when available)
npm test

# Build for production
npm run build
```

### Project Structure

```
kiro-finance/
├── .kiro/                  # Kiro configuration
│   ├── specs/             # Feature specifications
│   ├── steering/          # Project guidelines
│   └── settings/          # Kiro settings
├── src/
│   ├── components/
│   │   ├── finance/       # Finance components
│   │   └── ui/            # UI components
│   ├── hooks/             # Custom hooks
│   ├── pages/             # Page components
│   ├── lib/               # Utilities
│   └── App.tsx            # Main app
├── public/                # Static assets
└── package.json           # Dependencies
```

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define explicit types for all functions and components
- Avoid `any` type - use `unknown` if necessary
- Use interfaces for object shapes

```typescript
// ✅ Good
interface User {
  id: string;
  name: string;
  email: string;
}

const getUser = (id: string): User => {
  // implementation
};

// ❌ Bad
const getUser = (id: any): any => {
  // implementation
};
```

### React Components

- Use functional components with hooks
- Destructure props
- Use meaningful component names
- Keep components focused and small

```typescript
// ✅ Good
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button = ({ label, onClick, disabled = false }: ButtonProps) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

// ❌ Bad
const Button = (props: any) => {
  return <button onClick={props.onClick}>{props.label}</button>;
};
```

### Styling

- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Use semantic color variables

```typescript
// ✅ Good
<div className="flex items-center gap-4 p-6 rounded-lg bg-card shadow-md">

// ❌ Bad
<div style={{ display: 'flex', padding: '24px' }}>
```

### State Management

- Use `useState` for local state
- Use custom hooks for shared logic
- Keep state as close to where it's used as possible

```typescript
// ✅ Good - Custom hook for shared state
export const useFinanceData = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  
  const addExpense = (expense: Expense) => {
    setExpenses(prev => [...prev, expense]);
  };
  
  return { expenses, addExpense };
};

// ❌ Bad - Prop drilling
<Parent>
  <Child1 data={data} />
  <Child2 data={data} />
  <Child3 data={data} />
</Parent>
```

### File Naming

- Components: PascalCase (`ExpenseTracker.tsx`)
- Hooks: camelCase with `use` prefix (`useFinanceData.ts`)
- Utilities: camelCase (`formatCurrency.ts`)
- Constants: UPPER_SNAKE_CASE (`STORAGE_KEYS.ts`)

### Git Commit Messages

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

## Testing

### Writing Tests

```typescript
// Component test
describe('ExpenseTracker', () => {
  it('should add expense when form is submitted', () => {
    render(<ExpenseTracker />);
    
    fireEvent.change(screen.getByLabelText('Amount'), {
      target: { value: '1000' }
    });
    fireEvent.click(screen.getByText('Add Expense'));
    
    expect(screen.getByText('₹1,000')).toBeInTheDocument();
  });
});

// Hook test
describe('useFinanceData', () => {
  it('should calculate total expenses correctly', () => {
    const { result } = renderHook(() => useFinanceData());
    
    act(() => {
      result.current.addExpense({
        id: '1',
        amount: 1000,
        category: 'Food',
        description: 'Groceries',
        date: new Date().toISOString()
      });
    });
    
    expect(result.current.totalExpenses).toBe(1000);
  });
});
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

## Documentation

### Code Comments

- Comment complex logic
- Explain "why" not "what"
- Keep comments up to date

```typescript
// ✅ Good
// Calculate compound interest with monthly contributions
// Formula: A = P(1 + r/n)^(nt)
const calculateReturns = (principal: number, rate: number, years: number) => {
  const n = 12; // Monthly compounding
  return principal * Math.pow(1 + rate / n, n * years);
};

// ❌ Bad
// This function calculates returns
const calculateReturns = (p, r, y) => {
  return p * Math.pow(1 + r / 12, 12 * y);
};
```

### README Updates

When adding new features, update:
- Feature list in README.md
- Usage examples
- Screenshots (if UI changes)
- API documentation (if applicable)

## Review Process

### What We Look For

1. **Code Quality**
   - Follows coding standards
   - Well-structured and readable
   - Properly typed (TypeScript)
   - No console.logs or debug code

2. **Testing**
   - Includes tests for new features
   - All tests pass
   - Good test coverage

3. **Documentation**
   - Code is well-commented
   - README updated if needed
   - Clear PR description

4. **Performance**
   - No unnecessary re-renders
   - Efficient algorithms
   - Proper memoization

5. **Accessibility**
   - Semantic HTML
   - ARIA labels where needed
   - Keyboard navigation works

### Review Timeline

- Initial review: Within 2-3 days
- Follow-up reviews: Within 1-2 days
- Merge: After approval from maintainer

## Community

### Getting Help

- 💬 [GitHub Discussions](https://github.com/yourusername/kiro-finance/discussions)
- 🐛 [GitHub Issues](https://github.com/yourusername/kiro-finance/issues)
- 📧 Email: support@kirofinance.com

### Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Credited in the about section

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Questions?

Don't hesitate to ask questions! We're here to help:

- Open a [GitHub Discussion](https://github.com/yourusername/kiro-finance/discussions)
- Comment on an existing issue
- Reach out to maintainers

## Thank You!

Your contributions make Kiro Finance better for everyone. We appreciate your time and effort! 🙏

---

**Happy Coding!** 🚀
