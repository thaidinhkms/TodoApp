import React, { useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { Button } from '../../../components/Button';
import { View } from '../../../components/View';
import { Text } from '../../../components/Text';
import { useAuth } from '../../../providers/AuthProvider';
import { useThemedStyles } from '../../../themes/useThemedStyle';
import { Icon } from '../../../components/Icon';
import { ChevronRight } from 'lucide-react-native';
import { ThemeModal } from '../components/ThemeModal';
import { useStorage } from '../../../providers/StorageProvider';

export default function SettingScreen() {
  const styles = useThemedStyles(theme => ({
    container: { flex: 1, padding: theme.spacing.md, gap: theme.spacing.sm },
    row: { flexDirection: 'row', gap: theme.spacing.sm },
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

  const { logout } = useAuth();
  const { storage } = useStorage();
  const [modalVisible, setModalVisible] = useState(false);

  const onLogout = async () => {
    const result = await logout();
    if (!result.ok) {
      Alert.alert('Log out failed', result.error.message);
    }
  };

  const onClearStorage = async () => {
    await storage.clearAll();
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.optionTouch} onPress={() => setModalVisible(true)}>
        <View style={styles.optionTextRow}>
          <Text>Theme</Text>
          <Icon as={ChevronRight} />
        </View>
      </TouchableOpacity>

      <Button title="Log out" onPress={onLogout} />
      <Button title="Clear data" variant='danger' onPress={onClearStorage} />

      <ThemeModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </View>
  );
}
