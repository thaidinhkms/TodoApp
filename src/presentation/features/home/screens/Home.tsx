import { Todo } from '@/domain/entities';
import { Button, TextInput, View } from '@/presentation/components';
import { useTodo } from '@/presentation/store';
import { useThemedStyles } from '@/presentation/themes';
import { useEffect, useState, useCallback } from 'react';
import { Alert, FlatList, RefreshControl } from 'react-native';
import { EditTodoModal } from '../components/EditTodoModal';
import { TodoItem } from '../components/TodoItem';

export function HomeScreen() {
  return <Home />;
}

function Home() {
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

  const { data, loading, error, fetch, create, edit, remove } = useTodo();

  useEffect(() => {
    (async () => {
      const res = await fetch();
      if (!res.ok) {
        Alert.alert('Error', res.error?.message ?? 'Failed to load todos');
      }
    })();
  }, [fetch]);

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error.message);
    }
  }, [error]);

  const refresh = useCallback(async () => {
    const res = await fetch();
    if (!res.ok) {
      Alert.alert('Error', res.error?.message ?? 'Failed to refresh todos');
    }
  }, [fetch]);

  const onAdd = async () => {
    if (!text.trim()) return;
    const todo = new Todo(text.trim());
    const res = await create(todo);
    if (res.ok) {
      setText('');
    } else {
      Alert.alert('Error', res.error?.message ?? 'Failed to create todo');
    }
  };

  const onDelete = async (item: Todo) => {
    const res = await remove(item);
    if (!res.ok) {
      Alert.alert('Error', res.error?.message ?? 'Failed to delete todo');
    }
  };

  const toggleDone = async (item: Todo) => {
    const res = await edit({ ...item, done: !item.done });
    if (!res.ok) {
      Alert.alert('Error', res.error?.message ?? 'Failed to update todo');
    }
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
    const res = await edit(updated);
    if (res.ok) {
      closeModal();
    } else {
      Alert.alert('Error', res.error?.message ?? 'Failed to save todo');
    }
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
      <Button
        title="Add Todo"
        onPress={onAdd}
        disabled={!text.trim().length || loading}
      />

      <FlatList
        data={data}
        keyExtractor={i => i.id}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refresh} />
        }
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
