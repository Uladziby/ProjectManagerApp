//list of users or one user
export interface IUser {
  id: string;
  name: string;
  login: string;
}
//for changing info and sign up
export interface IUserInfo {
  name: string;
  login: string;
  password: string;
}

//for getting token
export interface IUserSignIn {
  login: string;
  password: string;
}

//getting boards list
export interface IBoards {
  id: string;
  title: string;
}

//set new board
export interface IBoardCreation {
  title: string;
}

//for getting board by id
export interface IBoard {
  id: string;
  title: string;
  columns: IColumn[];
}

//response for getting all columns
export interface IColumns {
  id: string;
  title: string;
  order: number;
}

//set new column
export interface IColumnCreation {
  title: string;
  order: number;
}

//getting column by id
export interface IColumn {
  id: string;
  title: string;
  order: number;
  tasks: {
    id: string;
    title: string;
    order: number;
    done: boolean;
    description: string;
    userId: string;
    files: {
      filename: string;
      fileSize: number;
    }[];
  }[];
}

//task interface
export interface ITask {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}

//for task creation
export interface ITaskCreate {
  title: string;
  order: number;
  description: string;
  userId: string;
}

//for task update
export interface ITaskNewInfo {
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}
