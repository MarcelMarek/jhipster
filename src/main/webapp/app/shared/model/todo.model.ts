export interface ITodo {
  id?: number;
  todo?: string;
  priority?: number | null;
}

export class Todo implements ITodo {
  constructor(public id?: number, public todo?: string, public priority?: number | null) {}
}
