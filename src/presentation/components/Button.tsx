import { useTheme } from '@/presentation/providers';
import {
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

type Props = TouchableOpacityProps & {
  title: string;
  variant?: 'primary' | 'danger';
  type?: 'contained' | 'outlined';
  loading?: boolean;
};

export const Button = ({
  title,
  variant = 'primary',
  type = 'contained',
  loading = false,
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
  const isDisabled = disabled || loading;

  if (isDisabled) {
    backgroundColor = theme.colors.disabledBackground;
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
    elevation: isDisabled ? 0 : theme.elevation,
    opacity: isDisabled ? 0.6 : 1,
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={isDisabled}
      style={[baseStyle, borderStyle, styles.button, style]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={isContained ? theme.colors.background : variantColor}
        />
      ) : (
        <Text style={{ color: textColor, fontSize: theme.typography.body }}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
