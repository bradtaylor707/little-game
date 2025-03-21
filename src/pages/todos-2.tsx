import { FilterID, Todo } from "../types";
import { Fragment, useMemo, useState } from "react";

const FILTERS: FilterID[] = ["all", "incomplete", "complete"];

// tests: should be able to input text
// should be able to press button
// should clear text after submission
// should be able to press filter buttons
// filtering should work accordingly

export default function Todos2() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterID>("all");

  const shownTodos = useMemo(() => {
    switch (filter) {
      case "incomplete":
        return todos.filter(({ completed }) => completed == null);
      case "complete":
        return todos.filter(({ completed }) => completed != null);
      case "all":
      default:
        return todos.slice();
    }
  }, [filter, todos]);

  const post = (title: string) => {
    // need to validate in backend as well
    setTodos((prev) => {
      return [...prev, { title, completed: null, created: new Date().toISOString() }];
    });
  };

  const updateStatus = (id: string, completed: boolean) => {
    setTodos((prev) => {
      const index = prev.findIndex(({ created }) => created === id);

      if (index < 0) {
        return prev;
      }

      const todo = prev[index];

      prev.splice(index, 1, {
        ...todo,
        completed: completed ? new Date().toISOString() : null,
      });

      return [...prev];
    });
  };

  const [inputValue, setInputValue] = useState("");

  return (
    <div>
      <section>
        <fieldset>
          <legend>Filters</legend>
          <div>
            {FILTERS.map((filterId) => {
              const id = "radio-" + filterId;

              return (
                <Fragment key={filterId}>
                  <input
                    id={id}
                    defaultChecked={filterId === filter}
                    name={"filter-group"}
                    type={"radio"}
                    onChange={({ target }) => {
                      setFilter(target.value as FilterID);
                    }}
                    value={filterId}
                  />
                  <label htmlFor={id}>{filterId}</label>
                </Fragment>
              );
            })}
          </div>
        </fieldset>
      </section>
      <section>
        <input
          type={"text"}
          maxLength={100}
          value={inputValue}
          onChange={(evt) => setInputValue(evt.target.value)}
        />
        <button
          onClick={() => {
            post(inputValue);
            setInputValue("");
          }}
        >
          Submit
        </button>
      </section>
      <section>
        <div>
          {shownTodos.map(({ completed, created, title }) => {
            return (
              <div key={created}>
                <div>
                  <input
                    type={"checkbox"}
                    checked={completed != null}
                    onChange={(evt) => {
                      const done = evt.target.checked;

                      updateStatus(created, done);
                    }}
                  />
                </div>
                <div>
                  <div>{title}</div>
                  <div>{created}</div>
                  <div>{completed || "Incomplete"}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
