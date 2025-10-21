import { MMKVStorage } from '../infrastructure/storage/MMKVStorage';
import { RNBiometrics } from '../infrastructure/biometric/RNBiometric';
import { LocalTodoDataSource } from '../infrastructure/datasources/LocalTodoDataSource';
import { TodoRepositoryImpl } from '../infrastructure/repositories/TodoRepositoryImpl';
import GetTodos from '../application/usecases/todo/GetTodos';
import CreateTodo from '../application/usecases/todo/CreateTodo';
import EditTodo from '../application/usecases/todo/EditTodo';
import DeleteTodo from '../application/usecases/todo/DeleteTodo';
import { container } from './Container';
import { AuthService } from '../infrastructure/auth/AuthService';
import LoginWithBiometrics from '../application/usecases/auth/LoginWithBiometrics';
import LoginWithCredentials from '../application/usecases/auth/LoginWithCredentials';
import Logout from '../application/usecases/auth/Logout';
import Register from '../application/usecases/auth/Register';
import RegisterBiometrics from '../application/usecases/auth/RegisterBiometrics';

export async function bootstrap() {
  if (container.isRegistered('STORAGE')) return;

  const storage = new MMKVStorage();
  const biometrics = new RNBiometrics();

  const localTodoDataSource = new LocalTodoDataSource(storage);
  const todoRepo = new TodoRepositoryImpl(localTodoDataSource);

  const authService = new AuthService(storage, biometrics);

  const loginWithBiometrics = new LoginWithBiometrics(authService);
  const loginWithCredentials = new LoginWithCredentials(authService);
  const register = new Register(authService);
  const registerBiometrics = new RegisterBiometrics(authService);
  const logout = new Logout(authService);

  const getTodos = new GetTodos(todoRepo);
  const createTodo = new CreateTodo(todoRepo);
  const editTodo = new EditTodo(todoRepo);
  const deleteTodo = new DeleteTodo(todoRepo);

  container.register('STORAGE', storage);
  container.register('BIOMETRIC', biometrics);

  container.register('AUTH_SERVICE', authService);

  container.register('LOGIN_WITH_BIOMETRICS', loginWithBiometrics);
  container.register('LOGIN_WITH_CREDENTIALS', loginWithCredentials);
  container.register('REGISTER', register);
  container.register('REGISTER_BIOMETRIC', registerBiometrics);
  container.register('LOGOUT', logout);

  container.register('GET_TODOS', getTodos);
  container.register('CREATE_TODO', createTodo);
  container.register('EDIT_TODO', editTodo);
  container.register('DELETE_TODO', deleteTodo);
}
