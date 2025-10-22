import { useTheme } from '@/presentation/providers';
import { forwardRef } from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps,
  ViewStyle,
  TextStyle,
} from 'react-native';

type Variant = 'outlined' | 'filled' | 'underlined';
type Size = 'small' | 'medium' | 'large';

export type InputProps = TextInputProps & {
  variant?: Variant;
  size?: Size;
  containerStyle?: ViewStyle;
};

export const TextInput = forwardRef<RNTextInput, InputProps>(
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

    let fontSize;
    let padding;

    switch (size) {
      case 'small':
        fontSize = theme.typography.small;
        padding = theme.spacing.xs;
        break;
      case 'large':
        fontSize = theme.typography.h2;
        padding = theme.spacing.lg;
        break;
      default:
        fontSize = theme.typography.body;
        padding = theme.spacing.md;
    }

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
