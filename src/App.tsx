import React from 'react';
import 'react-native-get-random-values';
import {
  DefaultTheme,
  DarkTheme,
  NavigationContainer,
} from '@react-navigation/native';

import { AuthStack } from '@/presentation/navigations/AuthStack';
import { MainStack } from '@/presentation/navigations/MainStack';
import { AuthProvider, useAuth } from '@/presentation/providers/AuthProvider';
import {
  ThemeProvider,
  useTheme,
} from '@/presentation/providers/ThemeProvider';
import { TodoProvider } from '@/presentation/providers/TodoProvider';

export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <TodoProvider>
          <AppContent />
        </TodoProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

function AppContent() {
  const { authenticated } = useAuth();
  const { theme } = useTheme();

  const navTheme = {
    ...DefaultTheme,
    dark: theme.name === 'dark',
    colors: {
      ...(theme.name === 'dark' ? DarkTheme.colors : DefaultTheme.colors),
      background: theme.colors.background,
      card: theme.colors.surface,
      text: theme.colors.text,
      border: theme.colors.border,
    },
  };

  return (
    <NavigationContainer theme={navTheme}>
      {authenticated ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
