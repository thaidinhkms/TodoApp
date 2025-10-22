import { container } from '@/di/Container';
import {
  darkTheme,
  lightTheme,
  type Theme,
  type ThemeName,
} from '@/presentation/themes';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Appearance, ColorSchemeName, StatusBar, Platform } from 'react-native';

const THEME_KEY = 'USER_THEME_PREFERENCE';

type ThemeContextValue = {
  theme: Theme;
  setPreference: (name: ThemeName) => Promise<void>;
  preference: ThemeName;
  resolvedScheme: 'light' | 'dark';
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [preferenceState, setPreferenceState] = useState<ThemeName>('system');
  const [systemScheme, setSystemScheme] = useState<ColorSchemeName>(
    Appearance.getColorScheme() ?? 'unspecified',
  );

  const storage = container.resolve('STORAGE');

  useEffect(() => {
    (async () => {
      const pref = (await storage.getString(THEME_KEY)) as ThemeName | null;
      if (pref) setPreferenceState(pref);
    })();

    const sub = Appearance.addChangeListener(({ colorScheme }) =>
      setSystemScheme(colorScheme),
    );
    return () => sub.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resolvedSystemScheme: 'light' | 'dark' =
    systemScheme === 'dark' ? 'dark' : 'light';

  const resolvedScheme: 'light' | 'dark' =
    preferenceState === 'system' ? resolvedSystemScheme : preferenceState;

  const theme = useMemo(
    () => (resolvedScheme === 'dark' ? darkTheme : lightTheme),
    [resolvedScheme],
  );

  useEffect(() => {
    const barStyle = theme === darkTheme ? 'light-content' : 'dark-content';
    StatusBar.setBarStyle(barStyle);
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(theme.colors.surface);
    }
  }, [theme]);

  const setPreference = async (name: ThemeName) => {
    setPreferenceState(name);
    await storage.setString(THEME_KEY, name);
  };

  const contextValue = useMemo(
    () => ({
      theme,
      setPreference,
      preference: preferenceState,
      resolvedScheme,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme, preferenceState, resolvedScheme],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
