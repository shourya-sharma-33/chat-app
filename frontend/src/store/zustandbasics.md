### What is Zustand?
Zustand is a lightweight state management library for React and Next.js apps. Its API is based on hooks, so you can define a global store and access it from any component without needing a context provider.

### Setting Up a Basic Store
Install Zustand with:
```bash
npm install zustand
```
Create your store like this:
```js
import { create } from 'zustand';

// Example store
const useCounterStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  reset: () => set({ count: 0 })
}));
```
- `create` builds a custom hook (`useCounterStore`) that manages your state.
- `set` is a function provided by Zustand for updating state efficiently.[5][4]

### Using the Store in Components
Use your store in any component:
```js
function Counter() {
  const { count, increment, reset } = useCounterStore();
  return (
    <div>
      <span>{count}</span>
      <button onClick={increment}>+</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```
Whenever state changes (calling `increment` or `reset`), components using the store hook will re-render automatically.[6][7]

### Key Concepts
- **No Provider Needed**: Hook-based global state, no context wrapper or provider setup.[3]
- **Actions**: Add functions in the store to update state—Zustand encourages keeping state logic close to actions.[4][5]
- **Immutability**: When updating state, always return a new object, never mutate directly.[4]
- **Selective Subscriptions**: You can select only specific pieces of state to avoid unnecessary re-renders.[4]

### Example Use Case
Ideal for things like:
- Authentication state
- Global UI state (theme, modals)
- Data shared across many components[2][8]

Zustand is especially useful for React developers looking for a simple yet scalable way to manage global state with minimal boilerplate.