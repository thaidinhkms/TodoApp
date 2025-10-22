import { Button, Text, TextInput, View } from '@/presentation/components';
import { useAuth } from '@/presentation/providers';
import { useThemedStyles } from '@/presentation/themes';
import { useState } from 'react';
import { Alert } from 'react-native';

export function AuthScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { loginWithCredentials, loginWithBiometrics, register } = useAuth();

  const styles = useThemedStyles(theme => ({
    container: {
      flex: 1,
      padding: theme.spacing.md,
      gap: theme.spacing.sm,
    },
    input: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      padding: theme.spacing.sm,
      borderRadius: theme.rounded,
      marginBottom: theme.spacing.sm,
    },
    row: { flexDirection: 'row', gap: theme.spacing.sm },
  }));

  const onLoginWithCredentials = async () => {
    const result = await loginWithCredentials(username, password);
    if (!result.ok) {
      Alert.alert('Login failed', result.error.message);
    }
  };

  const onLoginWithBiometrics = async () => {
    const result = await loginWithBiometrics();
    if (!result.ok) {
      Alert.alert('Login failed', result.error.message);
    }
  };

  const onRegister = async () => {
    const result = await register(username, password);
    if (!result.ok) {
      Alert.alert('Register failed', result.error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Authentication</Text>
      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
        style={styles.input}
        placeholderTextColor="#888"
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        style={styles.input}
        placeholderTextColor="#888"
      />
      <Button title="Login" onPress={onLoginWithCredentials} />
      <Button title="Register" onPress={onRegister} />
      <Button title="Login with Biometric" onPress={onLoginWithBiometrics} />
    </View>
  );
}
