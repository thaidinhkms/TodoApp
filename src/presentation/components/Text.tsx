import { useTheme } from '@/presentation/providers';
import { Text as RNText, TextProps } from 'react-native';

export const Text = ({ style, children, ...props }: TextProps) => {
  const { theme } = useTheme();
  return (
    <RNText
      style={[
        { color: theme.colors.text, fontSize: theme.typography.body },
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
};
