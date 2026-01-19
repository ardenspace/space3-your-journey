import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import '../global.css';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { AuthProvider } from '@/contexts/AuthContext';
import { SettingsProvider } from '@/contexts/SettingsContext';
import { validateFirebaseConfig } from '@/services/firebase/config';
import { setupNotificationListeners } from '@/services/notifications/timeCapsule';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    // Firebase 설정 검증
    const isValid = validateFirebaseConfig();
    if (!isValid) {
      console.warn('Firebase 설정이 올바르지 않습니다. FIREBASE_SETUP.md를 확인하세요.');
    }

    // 알림 리스너 설정
    const cleanup = setupNotificationListeners();
    return cleanup;
  }, []);

  return (
    <AuthProvider>
      <SettingsProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </SettingsProvider>
    </AuthProvider>
  );
}
