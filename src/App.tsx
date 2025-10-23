import React from 'react';
import 'react-native-get-random-values';
import { Provider } from 'react-redux';
import {
  DefaultTheme,
  DarkTheme,
  NavigationContainer,
} from '@react-navigation/native';

import { AuthStack } from '@/presentation/navigations/AuthStack';
import { MainStack } from '@/presentation/navigations/MainStack';
import {
  ThemeProvider,
  useTheme,
} from '@/presentation/providers/ThemeProvider';
import { store, useAuth } from '@/presentation/store';

export function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </Provider>
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
