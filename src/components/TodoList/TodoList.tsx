import React from 'react';
import { Todo, FilterType } from '../../types/todo';
import { TodoItem } from '../TodoItem';
import './TodoList.css';

interface TodoListProps {
  todos: Todo[];
  filter: FilterType;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
  onClearCompleted: () => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  filter,
  onToggle,
  onDelete,
  onEdit,
  onClearCompleted,
}) => {
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const completedCount = todos.filter((todo) => todo.completed).length;
  const activeCount = todos.filter((todo) => !todo.completed).length;

  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📝</div>
        <h3>No tasks yet!</h3>
        <p>Add a task above to get started</p>
      </div>
    );
  }

  return (
    <div className="todo-list-container">
      <div className="todo-list">
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>

      {filteredTodos.length === 0 && filter !== 'all' && (
        <div className="empty-filter">
          <p>
            {filter === 'active'
              ? '🎉 No active tasks!'
              : '📋 No completed tasks yet'}
          </p>
        </div>
      )}

      <div className="todo-footer">
        <span className="todo-count">
          {activeCount} {activeCount === 1 ? 'task' : 'tasks'} remaining
        </span>
        {completedCount > 0 && (
          <button className="clear-completed" onClick={onClearCompleted}>
            Clear completed ({completedCount})
          </button>
        )}
      </div>
    </div>
  );
};