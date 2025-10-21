import React from 'react';
import {
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
  StyleSheet,
} from 'react-native';
import { useTheme } from '../providers/ThemeProvider';

type Props = TouchableOpacityProps & {
  title: string;
  variant?: 'primary' | 'danger';
  type?: 'contained' | 'outlined';
};

export const Button = ({
  title,
  variant = 'primary',
  type = 'contained',
  style,
  ...props
}: Props) => {
  const { theme } = useTheme();
  const variantColor =
    variant === 'danger' ? theme.colors.danger : theme.colors.primary;
  const background = type === 'outlined' ? 'transparent' : variantColor;
  const color = type === 'contained' ? theme.colors.background : theme.colors.primary;
  const border =
    type === 'outlined'
      ? {
          borderWidth: 1,
          borderColor: theme.colors.border,
          padding: theme.spacing.sm,
        }
      : {};

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        {
          backgroundColor: background,
          borderRadius: theme.rounded,
          paddingVertical: theme.spacing.sm,
          paddingHorizontal: theme.spacing.md,
          elevation: theme.elevation,
        },
        border,
        style,
        styles.button,
      ]}
      {...props}
    >
      <Text style={{ color, fontSize: theme.typography.body }}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
