import { useTheme } from '@/presentation/providers';
import { LucideProps } from 'lucide-react-native';

type ColorVariant = 'text' | 'primary' | 'muted' | 'success' | 'danger';

type ThemedIconProps = LucideProps & {
  as: React.ComponentType<LucideProps>;
  colorVariant?: ColorVariant;
};

export const Icon = ({
  as: IconComponent,
  colorVariant = 'text',
  color,
  ...props
}: ThemedIconProps) => {
  const { theme } = useTheme();

  const resolvedColor =
    color ??
    {
      text: theme.colors.text,
      primary: theme.colors.primary,
      muted: theme.colors.mutedText,
      success: theme.colors.success,
      danger: theme.colors.danger,
    }[colorVariant] ??
    theme.colors.text;

  return <IconComponent color={resolvedColor} {...props} />;
};
