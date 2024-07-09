import React from 'react';
import { MainProps } from '../../types/MainProps';
import { TodoItem } from '../TodoItem';
import { Filter } from '../../types/Filter';

export const Main: React.FC<MainProps> = ({
  todos,
  filterBy,
  tempTodo,
  handleTodoDelete,
  deletingCompleted,
}) => {
  const visibleTodos = todos.filter(todo => {
    switch (filterBy) {
      case Filter.active:
        return !todo.completed;
      case Filter.completed:
        return todo.completed;
      default:
        return true;
    }
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          tempTodo={tempTodo}
          onDelete={handleTodoDelete}
          deletingCompleted={deletingCompleted}
        />
      ))}

      {tempTodo && (
        <TodoItem
          todo={tempTodo}
          tempTodo={tempTodo}
          onDelete={handleTodoDelete}
          deletingCompleted={deletingCompleted}
        />
      )}

      {/* This todo is being edited */}
      {false && (
        <div data-cy="Todo" className="todo">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
            />
          </label>

          {/* This form is shown instead of the title and remove button */}
          <form>
            <input
              data-cy="TodoTitleField"
              type="text"
              className="todo__title-field"
              placeholder="Empty todo will be deleted"
              value="Todo is being edited now"
            />
          </form>

          <div data-cy="TodoLoader" className="modal overlay">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      )}
    </section>
  );
};