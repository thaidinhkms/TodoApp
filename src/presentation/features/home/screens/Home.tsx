import { Todo } from '@/domain/entities';
import { Button, TextInput, View } from '@/presentation/components';
import { TodoProvider, useTodo } from '@/presentation/providers';
import { useThemedStyles } from '@/presentation/themes';
import { useEffect, useState } from 'react';
import { Alert, FlatList } from 'react-native';
import { EditTodoModal } from '../components/EditTodoModal';
import { TodoItem } from '../components/TodoItem';

export function HomeScreen() {
  return (
    <TodoProvider>
      <Home />
    </TodoProvider>
  );
}

function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState('');
  const [editing, setEditing] = useState<Todo | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const styles = useThemedStyles(theme => ({
    container: { flex: 1, padding: theme.spacing.md, gap: theme.spacing.sm },
    input: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      padding: theme.spacing.sm,
      borderRadius: theme.rounded,
    },
  }));

  const { getTodos, createTodo, editTodo, deleteTodo } = useTodo();

  useEffect(() => {
    (async () => setTodos(await getTodos.execute()))();
  }, [getTodos]);

  const refresh = async () => setTodos(await getTodos.execute());

  const onAdd = async () => {
    if (!text.trim()) return;
    await createTodo.execute(new Todo(text));
    setText('');
    await refresh();
  };

  const onDelete = async (item: Todo) => {
    await deleteTodo.execute(item);
    await refresh();
  };

  const toggleDone = async (item: Todo) => {
    await editTodo.execute({ ...item, done: !item.done });
    await refresh();
  };

  const openEdit = (item: Todo) => {
    setEditing(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setEditing(null);
  };

  const onEdit = async (updated: Todo) => {
    await editTodo.execute(updated);
    await refresh();
  };

  const handleDelete = async (item: Todo) => {
    return new Promise<void>(resolve => {
      Alert.alert('Delete', 'Delete this todo?', [
        { text: 'Cancel', style: 'cancel', onPress: () => resolve() },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            onDelete(item);
            resolve();
          },
        },
      ]);
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="New todo"
        style={styles.input}
        placeholderTextColor="#888"
      />
      <Button title="Add Todo" onPress={onAdd} disabled={!text.length} />

      <FlatList
        data={todos}
        keyExtractor={i => i.id}
        renderItem={({ item }) => (
          <TodoItem
            item={item}
            onPress={toggleDone}
            onEditPress={openEdit}
            onDeletePress={handleDelete}
          />
        )}
      />

      <EditTodoModal
        visible={modalVisible}
        initial={editing}
        onClose={closeModal}
        onSave={onEdit}
      />
    </View>
  );
}
