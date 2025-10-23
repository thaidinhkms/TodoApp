import React from 'react';
import { ActivityIndicator, Modal } from 'react-native';
import { View } from './View';
import { Text } from './Text';
import { useThemedStyles } from '../themes';

interface LoadingProps {
  visible: boolean;
  message?: string;
}

export const Loading = ({ visible, message }: LoadingProps) => {
  const styles = useThemedStyles(theme => ({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.4)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      padding: theme.spacing.lg,
      borderRadius: theme.spacing.md,
      backgroundColor: 'transparent',
      alignItems: 'center',
    },
    message: {
      marginTop: theme.spacing.sm,
      textAlign: 'center',
    },
  }));
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <ActivityIndicator size="large" />
          {message ? <Text style={styles.message}>{message}</Text> : null}
        </View>
      </View>
    </Modal>
  );
};
