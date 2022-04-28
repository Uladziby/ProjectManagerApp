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
