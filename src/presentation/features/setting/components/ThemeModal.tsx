import React from 'react';
import {
  Modal,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import { Button } from '../../../components/Button';
import { View } from '../../../components/View';
import { Text } from '../../../components/Text';
import { useThemedStyles } from '../../../themes/useThemedStyle';
import { useTheme } from '../../../providers/ThemeProvider';

type Scheme = 'light' | 'dark' | 'system';

type ThemeModalProps = {
  visible: boolean;
  onClose: () => void;
};

export const ThemeModal = ({ visible, onClose }: ThemeModalProps) => {
  const styles = useThemedStyles(theme => ({
    flex: { flex: 1 },
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
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 4,
    },
    modalTitle: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: theme.spacing.sm,
    },
    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: theme.spacing.sm,
      marginTop: theme.spacing.sm,
    },
    optionTouch: {
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      borderRadius: theme.rounded,
      marginBottom: theme.spacing.sm,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    optionTextRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    optionSelected: {
      borderColor: 'transparent',
    },
  }));

  const { preference, setPreference } = useTheme();

  const choices: { key: Scheme; label: string }[] = [
    { key: 'light', label: 'Light' },
    { key: 'dark', label: 'Dark' },
    { key: 'system', label: 'System' },
  ];

  const selectScheme = (scheme: Scheme) => {
    setPreference(scheme);
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
            <Text style={styles.modalTitle}>Choose theme</Text>

            {choices.map(c => {
              const selected = preference === c.key;
              return (
                <TouchableOpacity
                  key={c.key}
                  onPress={() => selectScheme(c.key)}
                  activeOpacity={0.7}
                  accessibilityRole="button"
                  accessibilityState={{ selected }}
                  style={[
                    styles.optionTouch,
                    selected && styles.optionSelected,
                  ]}
                >
                  <View style={styles.optionTextRow}>
                    <Text>{c.label}</Text>
                    <Text>{selected ? '✓' : ''}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}

            <View style={styles.modalButtons}>
              <Button title="Cancel" onPress={onClose} />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
