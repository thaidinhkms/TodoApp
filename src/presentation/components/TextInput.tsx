import React from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useTheme } from '../providers/ThemeProvider';

type Variant = 'outlined' | 'filled' | 'underlined';
type Size = 'small' | 'medium' | 'large';

export type InputProps = TextInputProps & {
  variant?: Variant;
  size?: Size;
  containerStyle?: ViewStyle;
};

export const TextInput = React.forwardRef<RNTextInput, InputProps>(
  (
    {
      variant = 'outlined',
      size = 'medium',
      style,
      placeholderTextColor,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme();

    const fontSize =
      size === 'small'
        ? theme.typography.small
        : size === 'large'
        ? theme.typography.h2
        : theme.typography.body;

    const padding =
      size === 'small'
        ? theme.spacing.xs
        : size === 'large'
        ? theme.spacing.lg
        : theme.spacing.md;

    const baseStyle: TextStyle = {
      color: theme.colors.text,
      fontSize,
      padding,
      borderRadius: theme.rounded,
      backgroundColor: theme.colors.surface,
      includeFontPadding: false,
    };

    const variantStyle: TextStyle = (() => {
      switch (variant) {
        case 'filled':
          return {
            backgroundColor: theme.colors.surface,
            borderWidth: 0,
          };
        case 'underlined':
          return {
            backgroundColor: 'transparent',
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.border,
            borderRadius: 0,
            paddingVertical: padding,
            paddingHorizontal: 0,
          };
        case 'outlined':
        default:
          return {
            backgroundColor: theme.colors.surface,
            borderWidth: 1,
            borderColor: theme.colors.border,
          };
      }
    })();

    return (
      <RNTextInput
        ref={ref}
        placeholderTextColor={placeholderTextColor ?? theme.colors.mutedText}
        selectionColor={props.selectionColor ?? theme.colors.primary}
        style={[baseStyle, variantStyle, style]}
        {...props}
      />
    );
  },
);
