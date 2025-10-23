import { AppError } from '@/utils/Result';

export interface AuthState {
  authenticated: boolean;
  loading: boolean;
  error?: AppError | null;
}
