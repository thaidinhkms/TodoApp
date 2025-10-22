import { useTheme } from '@/presentation/providers';
import { View as RNView, ViewProps } from 'react-native';

export const View = ({ style, ...props }: ViewProps) => {
  const { theme } = useTheme();
  return (
    <RNView
      style={[{ backgroundColor: theme.colors.background }, style]}
      {...props}
    />
  );
};
