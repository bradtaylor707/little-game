export type Todo = {
  completed: string | null;
  created: string;
  title: string;
};

export type FilterID = "all" | "incomplete" | "complete";

export type Filter = {
  value: FilterID;
};
