import {
  LoginWithBiometrics,
  LoginWithCredentials,
  Logout,
  Register,
  RegisterBiometrics,
} from '@/application/usecases/auth';
import {
  CreateTodo,
  EditTodo,
  DeleteTodo,
  GetTodos,
} from '@/application/usecases/todo';
import { IBiometric } from '@/infrastructure/contracts/IBiometric';
import { IStorage } from '@/infrastructure/contracts/IStorage';

export interface ContainerTypes {
  STORAGE: IStorage;
  BIOMETRIC: IBiometric;

  LOGIN_WITH_BIOMETRICS: LoginWithBiometrics;
  LOGIN_WITH_CREDENTIALS: LoginWithCredentials;
  LOGOUT: Logout;
  REGISTER: Register;
  REGISTER_BIOMETRIC: RegisterBiometrics;

  CREATE_TODO: CreateTodo;
  EDIT_TODO: EditTodo;
  DELETE_TODO: DeleteTodo;
  GET_TODOS: GetTodos;
}
