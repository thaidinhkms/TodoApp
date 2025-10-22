import { HomeScreen } from '@/presentation/features/home/screens/Home';
import { SettingScreen } from '@/presentation/features/setting/screens/Setting';
import { SettingButton } from '@/presentation/components/SettingButton';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type MainStackParamList = {
  Home: undefined;
  Setting: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

export function MainStack() {
  return (
    <Stack.Navigator initialRouteName={'Home'}>
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
    </Stack.Navigator>
  );
}
