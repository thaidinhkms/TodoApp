import { MainStackParamList } from '@/presentation/navigations/MainStack';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Icon } from './Icon';
import { Cog } from 'lucide-react-native';

export function SettingButton() {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList, 'Home'>>();
  return <Icon as={Cog} onPress={() => navigation.navigate('Setting')} />;
}
