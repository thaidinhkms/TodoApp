import React, { useEffect, useRef, useState } from 'react';
import { Modal, Platform, KeyboardAvoidingView, Alert } from 'react-native';
import { useThemedStyles } from '../../../themes/useThemedStyle';
import { TextInput } from '../../../components/TextInput';
import { Button } from '../../../components/Button';
import { Text } from '../../../components/Text';
import type { Todo } from '../../../../domain/entities/Todo';
import { View } from '../../../components/View';

type Props = {
  visible: boolean;
  initial?: Todo | null;
  onClose: () => void;
  onSave: (updated: Todo) => Promise<void> | void;
};

export const EditTodoModal = ({
  visible,
  initial,
  onClose,
  onSave,
}: Readonly<Props>) => {
  const [draft, setDraft] = useState('');
  const inputRef = useRef<any>(null);

  useEffect(() => {
    setDraft(initial?.title ?? '');
    if (visible) {
      setTimeout(() => inputRef.current?.focus?.(), 100);
    }
  }, [visible, initial]);

  const styles = useThemedStyles(theme => ({
    flex: {
      flex: 1,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      padding: theme.spacing.md,
      backgroundColor: 'rgba(0,0,0,0.4)',
    },
    modalCard: {
      backgroundColor: theme.colors.background,
      borderRadius: theme.rounded,
      padding: theme.spacing.md,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 4,
    },
    title: { marginBottom: theme.spacing.sm, fontSize: 16, fontWeight: '600' },
    modalInput: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      padding: theme.spacing.sm,
      borderRadius: theme.rounded,
      marginBottom: theme.spacing.sm,
    },
    buttons: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: theme.spacing.sm,
    },
  }));

  const save = async () => {
    if (!initial) return onClose();
    const trimmed = draft.trim();
    if (!trimmed) {
      Alert.alert('Validation', 'Title cannot be empty.');
      return;
    }
    await onSave({ ...initial, title: trimmed });
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalCard}>
            <Text style={styles.title}>Edit Todo</Text>

            <TextInput
              ref={inputRef}
              value={draft}
              onChangeText={setDraft}
              placeholder="Edit todo"
              style={styles.modalInput}
              returnKeyType="done"
              onSubmitEditing={save}
            />

            <View style={styles.buttons}>
              <Button title="Cancel" type="outlined" onPress={onClose} />
              <Button title="Save" onPress={save} />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
