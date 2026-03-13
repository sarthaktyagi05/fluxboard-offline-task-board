
```markdown
# FluxBoard 📋

A high-performance, offline-first task management board built with React and TypeScript. FluxBoard is engineered to handle massive datasets (5,000+ tasks) while maintaining 60fps animations, strict immutability, and a robust offline experience.

Designed following **Material Design 3 (M3)** principles.

## 🚀 Key Features

* **Performance at Scale:** Renders thousands of tasks effortlessly using customized windowing/virtualization and a normalized state model.
* **Native Drag & Drop:** Utilizes the native HTML5 DnD API without relying on heavy third-party libraries.
* **Time-Travel (Undo/Redo):** Features a robust history stack (capped at 15 actions) to undo/redo complex state changes like drag-and-drop operations.
* **Live Timers:** Task cards display an auto-updating "Modified X mins ago" label that is immune to React's Stale Closure traps.
* **Offline-First PWA:** Changes are persisted locally via a custom debounced storage hook with built-in corruption repair.
* **Advanced Search:** Real-time filtering that integrates seamlessly with virtualized columns.

---

## 🏗️ Engineering Architecture

### 1. Referential Equality & Performance Strategy
To maintain a constant **60fps** with 5,000+ tasks, FluxBoard employs a multi-layered memoization and state shape strategy:
* **Normalized State Model:** The application state separates the core data (`tasks: Record<TaskId, Task>`) from the UI rendering order (`order: TaskId[]`). This $O(1)$ lookup complexity ensures that updating a single task's description only triggers a re-render for that specific `TaskCard`, rather than the entire board.
* **Stable Callbacks:** Core functions like `handleMoveTask` are wrapped in `useCallback` and depend only on targeted state slices.
* **Virtualization:** The `Column` component uses mathematically calculated `useMemo` windows based on `scrollTop` to render only the visible subset of tasks plus a small buffer, keeping DOM node counts extremely low.

### 2. Undo/Redo Implementation (Dual-Stack)
The history system is implemented using a strict **Dual-Stack Architecture** within the `boardReducer`. 
* Every state-altering action (e.g., `MOVE_TASK`, `ADD_TASK`) captures a snapshot of the current state and unshifts it into the `history` array. 
* To prevent memory leaks during long-running sessions, the stack is strictly capped at a **maximum depth of 15 items** using `.slice(0, 15)`. 
* When `UNDO` is triggered, the current state is shifted to the `future` stack, allowing for seamless bidirectional time-travel. Searches and filtering do not pollute the history stack.

### 3. Defeating the "Stale Closure" Trap
A common pitfall with `setInterval` in React is capturing outdated state variables. The `TaskCard` timer completely bypasses this by calculating the elapsed time dynamically against the system clock rather than a local counter:
```typescript
const seconds = Math.floor((Date.now() - task.updatedAt) / 1000);

```

This guarantees 100% accuracy regardless of how many times the component has (or hasn't) re-rendered.

### 4. High-Frequency Persistence

Local storage syncing is managed by `useDebouncedLS`, a custom hook that implements an 800ms debounce. This batches rapid, successive actions (like rapid typing in a modal or dropping multiple tasks) into a single write operation. It also includes a `try/catch` repair cycle to reset the board if `localStorage` quota is exceeded or data becomes corrupted.

---

## 🛠️ Local Setup

1. **Clone the repository**
2. **Install dependencies:**
```bash
npm install

```


3. **Run the development server:**
```bash
npm run dev

```


4. **Build for production:**
```bash
npm run build

```



## 💻 Tech Stack

* React 18
* TypeScript (Strict Mode)
* Context API + `useReducer`
* Native HTML5 Drag and Drop API

```