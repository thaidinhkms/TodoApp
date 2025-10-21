import React, { useState } from 'react';
import { useThemedStyles } from '../../../themes/useThemedStyle';
import { Button } from '../../../components/Button';
import { View } from '../../../components/View';
import { Text } from '../../../components/Text';
import { useAuth } from '../../../providers/AuthProvider';
import { Alert } from 'react-native';
import { TextInput } from '../../../components/TextInput';

export default function AuthScreen() {
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
