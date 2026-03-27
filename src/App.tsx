import { useState, useEffect } from 'react';
import { Todo, FilterType } from './types/todo';
import { useLocalStorage } from './hooks/useLocalStorage';
import { AddTodo } from './components/AddTodo';
import { TodoList } from './components/TodoList';
import { FilterButtons } from './components/FilterButtons';
import { ThemeToggle } from './components/ThemeToggle';

function App() {
  const [todos, setTodos] = useLocalStorage<Todo[]>('cool-todos', []);
  const [filter, setFilter] = useState<FilterType>('all');
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: Date.now(),
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: string, newText: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">✨ Todo List</h1>
        <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
      </header>

      <main className="app-card">
        <AddTodo onAdd={addTodo} />
        <FilterButtons filter={filter} onFilterChange={setFilter} />
        <TodoList
          todos={todos}
          filter={filter}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
          onClearCompleted={clearCompleted}
        />
      </main>
    </div>
  );
}

export default App;