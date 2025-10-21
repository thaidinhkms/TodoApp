import React, { useEffect, useState } from 'react';
import 'react-native-get-random-values';
import { ThemeProvider } from './presentation/providers/ThemeProvider';
import MainStack from './presentation/navigations/MainStack';
import { bootstrap } from './common/Bootstrap';
import { AuthProvider } from './presentation/providers/AuthProvider';
import { TodoProvider } from './presentation/providers/TodoProvider';
import { StorageProvider } from './presentation/providers/StorageProvider';

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      await bootstrap();
      setReady(true);
    })();
  }, []);

  if (!ready) return null;

  return (
    <StorageProvider>
      <ThemeProvider>
        <AuthProvider>
          <TodoProvider>
            <MainStack />
          </TodoProvider>
        </AuthProvider>
      </ThemeProvider>
    </StorageProvider>
  );
}
