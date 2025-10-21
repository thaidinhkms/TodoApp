import React from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  useNavigation,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import AuthScreen from '../features/auth/screens/Auth';
import { useTheme } from '../providers/ThemeProvider';
import { useAuth } from '../providers/AuthProvider';
import HomeScreen from '../features/home/screens/Home';
import SettingScreen from '../features/setting/screens/Setting';
import { Cog } from 'lucide-react-native';
import { Icon } from '../components/Icon';

export type RootStackParamList = {
  Auth: undefined;
  Home: undefined;
  Setting: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function SettingButton() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();
  return <Icon as={Cog} onPress={() => navigation.navigate('Setting')} />;
}

export default function MainStack() {
  const { theme } = useTheme();
  const { authenticated } = useAuth();

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
      <Stack.Navigator initialRouteName={authenticated ? 'Home' : 'Auth'}>
        {authenticated ? (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                title: 'Todos',
                headerRight: SettingButton,
              }}
            />
            <Stack.Screen
              name="Setting"
              component={SettingScreen}
              options={{ title: 'Setting' }}
            />
          </>
        ) : (
          <Stack.Screen
            name="Auth"
            component={AuthScreen}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
