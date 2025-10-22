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
import { container } from '@/di/Container';
import { AuthRepositoryImpl } from '@/infrastructure/repositories/AuthRepositoryImpl';
import { RNBiometrics } from '@/infrastructure/services/RNBiometric';
import { TodoRepositoryImpl } from '@/infrastructure/repositories/TodoRepositoryImpl';
import { MMKVStorage } from '@/infrastructure/storage/MMKVStorage';

export function bootstrap() {
  if (container.isRegistered('STORAGE')) return;

  const storage = new MMKVStorage();
  const biometrics = new RNBiometrics();

  const todoRepo = new TodoRepositoryImpl(storage);
  const authRepo = new AuthRepositoryImpl(storage, biometrics);

  const loginWithBiometrics = new LoginWithBiometrics(authRepo);
  const loginWithCredentials = new LoginWithCredentials(authRepo);
  const logout = new Logout(authRepo);
  const register = new Register(authRepo);
  const registerBiometrics = new RegisterBiometrics(authRepo);

  const getTodos = new GetTodos(todoRepo);
  const createTodo = new CreateTodo(todoRepo);
  const editTodo = new EditTodo(todoRepo);
  const deleteTodo = new DeleteTodo(todoRepo);

  container.register('STORAGE', storage);
  container.register('BIOMETRIC', biometrics);

  container.register('LOGIN_WITH_BIOMETRICS', loginWithBiometrics);
  container.register('LOGIN_WITH_CREDENTIALS', loginWithCredentials);
  container.register('LOGOUT', logout);
  container.register('REGISTER', register);
  container.register('REGISTER_BIOMETRIC', registerBiometrics);

  container.register('CREATE_TODO', createTodo);
  container.register('EDIT_TODO', editTodo);
  container.register('DELETE_TODO', deleteTodo);
  container.register('GET_TODOS', getTodos);
}
