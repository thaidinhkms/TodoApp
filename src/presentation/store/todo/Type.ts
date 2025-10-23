import { Todo } from '@/domain/entities';
import { AppError } from '@/utils/Result';

export interface TodoState {
  data: Todo[];
  loading: boolean;
  error?: AppError | null;
}
