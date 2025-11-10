export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export let todos: Todo[] = [
  { id: "1", title: "Learn ExpressJs", completed: false },
  { id: "2", title: "Build a REST API", completed: false },
];
