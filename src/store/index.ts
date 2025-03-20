import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { FilterID, Todo } from "../types";

export const messageAtom = atomWithStorage<string>("futureMessage", "");

export const todosAtom = atom<Todo[]>([]);

export const todosFilterAtom = atomWithStorage<FilterID>("todosFilter", "all");
