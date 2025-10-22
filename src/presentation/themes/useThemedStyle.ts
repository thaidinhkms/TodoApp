import { useTheme } from '@/presentation/providers/ThemeProvider';
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';

type RNStyle = ViewStyle | TextStyle | ImageStyle;
type NamedStyles<T> = { [P in keyof T]: RNStyle };
type StyleFactory<T extends NamedStyles<T>> = (
  theme: ReturnType<typeof useTheme>['theme'],
) => T;

export function useThemedStyles<T extends NamedStyles<T>>(
  factory: StyleFactory<T>,
) {
  const { theme } = useTheme();
  return StyleSheet.create(factory(theme)) as unknown as T;
}
