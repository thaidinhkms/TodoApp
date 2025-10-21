import React from 'react';
import { Text as RNText, TextProps } from 'react-native';
import { useTheme } from '../providers/ThemeProvider';

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
