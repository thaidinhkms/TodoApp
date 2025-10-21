import GetTodos from '../application/usecases/todo/GetTodos';
import CreateTodo from '../application/usecases/todo/CreateTodo';
import EditTodo from '../application/usecases/todo/EditTodo';
import DeleteTodo from '../application/usecases/todo/DeleteTodo';
import LoginWithBiometrics from '../application/usecases/auth/LoginWithBiometrics';
import LoginWithCredentials from '../application/usecases/auth/LoginWithCredentials';
import Logout from '../application/usecases/auth/Logout';

import IStorage from '../infrastructure/contracts/IStorage';
import IBiometric from '../infrastructure/contracts/IBiometric';
import IAuthService from '../domain/auth/IAuthService';
import Register from '../application/usecases/auth/Register';
import RegisterBiometrics from '../application/usecases/auth/RegisterBiometrics';

export interface ContainerTypes {
  STORAGE: IStorage;
  BIOMETRIC: IBiometric;
  AUTH_SERVICE: IAuthService;

  LOGIN_WITH_BIOMETRICS: LoginWithBiometrics;
  LOGIN_WITH_CREDENTIALS: LoginWithCredentials;
  REGISTER: Register;
  REGISTER_BIOMETRIC: RegisterBiometrics;
  LOGOUT: Logout;

  GET_TODOS: GetTodos;
  CREATE_TODO: CreateTodo;
  EDIT_TODO: EditTodo;
  DELETE_TODO: DeleteTodo;
}
