import React from 'react';
import { View as RNView, ViewProps } from 'react-native';
import { useTheme } from '../providers/ThemeProvider';

export const View = ({ style, ...props }: ViewProps) => {
  const { theme } = useTheme();
  return (
    <RNView
      style={[{ backgroundColor: theme.colors.background }, style]}
      {...props}
    />
  );
};
