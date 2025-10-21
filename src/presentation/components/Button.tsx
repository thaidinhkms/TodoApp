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
  disabled,
  ...props
}: Props) => {
  const { theme } = useTheme();

  const variantColor =
    variant === 'danger' ? theme.colors.danger : theme.colors.primary;

  const isOutlined = type === 'outlined';
  const isContained = type === 'contained';

  let backgroundColor = isOutlined ? 'transparent' : variantColor;
  let textColor = isContained ? theme.colors.background : variantColor;
  let borderStyle = isOutlined
    ? { borderWidth: 1, borderColor: variantColor }
    : {};

  // Apply universal disabled style
  if (disabled) {
    backgroundColor = theme.colors.disabledBackground ?? theme.colors.border;
    textColor = theme.colors.disabledText;
    borderStyle = isOutlined
      ? { borderWidth: 1, borderColor: theme.colors.disabledBorder }
      : {};
  }

  const baseStyle = {
    backgroundColor,
    borderRadius: theme.rounded,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    elevation: disabled ? 0 : theme.elevation,
    opacity: disabled ? 0.6 : 1,
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled}
      style={[baseStyle, borderStyle, styles.button, style]}
      {...props}
    >
      <Text style={{ color: textColor, fontSize: theme.typography.body }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
