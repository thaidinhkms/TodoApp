import React from 'react';
import { useThemedStyles } from '../../../themes/useThemedStyle';
import type { Todo } from '../../../../domain/entities/Todo';
import { Text } from '../../../components/Text';
import { View } from '../../../components/View';
import { Icon } from '../../../components/Icon';
import { Check, Pen, Trash } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native';

type Props = {
  item: Todo;
  onPress: (item: Todo) => void;
  onEditPress: (item: Todo) => void;
  onDeletePress: (item: Todo) => void;
};

export const TodoItem = ({
  item,
  onPress,
  onEditPress,
  onDeletePress,
}: Readonly<Props>) => {
  const styles = useThemedStyles(theme => ({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderWidth: 1,
      borderColor: item.done ? 'transparent' : theme.colors.border,
      borderRadius: theme.rounded,
      padding: theme.spacing.sm,
      marginBottom: theme.spacing.sm,
      backgroundColor: item.done ? theme.colors.success : 'transparent',
    },
    background: {
      backgroundColor: 'transparent',
    },
    left: { flex: 1, marginRight: theme.spacing.sm },
    buttonRow: { flexDirection: 'row', gap: theme.spacing.md },
  }));

  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(item)}>
      <View style={[styles.left, styles.background]}>
        <Text>{item.title}</Text>
      </View>

      {item.done ? (
        <Icon as={Check} />
      ) : (
        <View style={[styles.buttonRow, styles.background]}>
          <Icon as={Pen} onPress={() => onEditPress(item)} />
          <Icon
            as={Trash}
            colorVariant="danger"
            onPress={() => onDeletePress(item)}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};
