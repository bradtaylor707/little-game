import { useMemo, useState } from "react";

const items = ["Eric", "John", "Brad", "Steve", "Rachel", "Anna"];

export default function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [savedSearches, setSavedSearches] = useState(() => new Set<string>());

  const search = (value?: string) => {
    const v = (value ?? searchValue).trim();

    setSearchValue(v);

    if (v) {
      setSavedSearches((prev) => {
        return new Set([v, ...prev]);
      });
    }
  };

  const shownItems = useMemo(() => {
    const lowerSearchValue = searchValue.toLowerCase();

    return items.filter((item) => {
      return item.toLowerCase().includes(lowerSearchValue);
    });
  }, [searchValue]);

  return (
    <div id={"search"}>
      <h1>Search Page</h1>
      <ol>
        {[...savedSearches].map((value) => {
          return (
            <li
              key={value}
              onClick={() => {
                search(value);
              }}
            >
              {value}
            </li>
          );
        })}
      </ol>
      <div>
        <form
          onSubmit={(evt) => {
            evt.preventDefault();

            search();
            setSearchValue("");
          }}
        >
          <label htmlFor={"search-input"}>Search</label>
          <input
            id={"search-input"}
            name={"searchField"}
            type={"text"}
            value={searchValue}
            onChange={(evt) => {
              search(evt.target.value);
            }}
          />
          <button
            onClick={() => {
              search();
              setSearchValue("");
            }}
          >
            Search
          </button>
        </form>
      </div>
      <div>
        <ul>
          {shownItems.map((item) => {
            return <li key={item}>{item}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}
