import { container } from '@/di/Container';
import { Button, Icon, Text, View } from '@/presentation/components';
import { useAuth } from '@/presentation/providers';
import { useThemedStyles } from '@/presentation/themes';
import { ChevronRight } from 'lucide-react-native';
import { useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { ThemeModal } from '../components/ThemeModal';

export function SettingScreen() {
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
  const [modalVisible, setModalVisible] = useState(false);

  const onLogout = async () => {
    const result = await logout();
    if (!result.ok) {
      Alert.alert('Log out failed', result.error.message);
    }
  };

  const storage = container.resolve("STORAGE");

  const onClearStorage = async () => {
    await storage.clearAll();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.optionTouch}
        onPress={() => setModalVisible(true)}
      >
        <View style={styles.optionTextRow}>
          <Text>Theme</Text>
          <Icon as={ChevronRight} />
        </View>
      </TouchableOpacity>

      <Button title="Log out" onPress={onLogout} />
      <Button title="Clear data" variant="danger" onPress={onClearStorage} />

      <ThemeModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}
