import { useAtom } from "jotai";
import { todosFilterAtom, todosAtom } from "../store";
import { memo, useCallback, useMemo, useRef, useState } from "react";
import { Filter, FilterID, Todo } from "../types";
import { wait } from "../utils";

const filters: Array<Filter> = [
  {
    value: "all",
  },
  {
    value: "incomplete",
  },
  {
    value: "complete",
  },
];

const TodoItem = memo(function TodoItemCore({
  disabled,
  onCompletionChange,
  todo,
}: {
  disabled?: boolean;
  onCompletionChange: (todo: Todo, completed: boolean) => void;
  todo: Todo;
}) {
  return (
    <div className={"card border"}>
      <div>
        <input
          type={"checkbox"}
          checked={todo.completed != null}
          disabled={disabled}
          onChange={(event) => {
            onCompletionChange(todo, event.target.checked);
          }}
        />
      </div>
      <div>
        <div>{todo.title}</div>
        <div>{todo.created}</div>
        <div>{todo.completed != null ? "Complete" : "Incomplete"}</div>
      </div>
    </div>
  );
});

export default function Todos() {
  const [todos, setTodos] = useAtom(todosAtom);
  const [filter, setFilter] = useAtom(todosFilterAtom);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const shownTodos = useMemo(() => {
    switch (filter) {
      case "complete":
        return todos.filter((t) => t.completed != null);
      case "incomplete":
        return todos.filter((t) => t.completed == null);
      case "all":
      default:
        return todos;
    }
  }, [filter, todos]);

  const onCompletionChange = useCallback(
    async (todo: Todo, completed: boolean) => {
      setIsUpdating(true);

      await wait(250);

      setTodos((prev) => {
        const index = prev.findIndex((t) => t.created === todo.created);

        if (index < 0) {
          return prev;
        }

        prev.splice(index, 1, {
          ...todo,
          completed: completed ? new Date().toISOString() : null,
        });

        return [...prev];
      });

      setIsUpdating(false);
    },
    [setTodos],
  );

  return (
    <div id={"todos"}>
      <div className={"flex align-items-center"}>
        <input ref={inputRef} disabled={isPosting} type={"text"} maxLength={120} />
        <button
          disabled={isPosting}
          onClick={async () => {
            const title = (inputRef.current?.value ?? "").trim();

            if (!title /* and validate structure */) {
              return;
            }

            setIsPosting(true);

            await wait(250);

            setTodos((prev) => {
              return [
                ...prev,
                {
                  completed: null,
                  created: new Date().toISOString(),
                  title,
                },
              ];
            });

            setIsPosting(false);

            if (inputRef.current) {
              inputRef.current.value = "";
            }
          }}
        >
          Save
        </button>
        <div
          onChange={(event) => {
            const target = event.target as HTMLInputElement;

            setFilter(target.value as FilterID);
          }}
        >
          {filters.map(({ value }) => (
            <div key={value}>
              <input
                id={`radio-${value}`}
                type={"radio"}
                defaultChecked={value === filter}
                name={"filter-radio-group"}
                value={value}
              />
              <label htmlFor={`radio-${value}`}>{value.toUpperCase()}</label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className={"list-container"}>
          {shownTodos.map((todo) => (
            <TodoItem
              key={todo.created}
              disabled={isUpdating}
              todo={todo}
              onCompletionChange={onCompletionChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
