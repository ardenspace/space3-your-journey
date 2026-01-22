import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import '../global.css';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { SettingsProvider } from '@/contexts/SettingsContext';
import { validateFirebaseConfig } from '@/services/firebase/config';
import { setupNotificationListeners } from '@/services/notifications/timeCapsule';

export const unstable_settings = {
  anchor: '(tabs)',
};

function RootLayoutNav() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const colorScheme = useColorScheme();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = (segments[0] as string) === '(auth)';

    if (!user && !inAuthGroup) {
      // 로그인되지 않았고 auth 화면이 아니면 로그인 화면으로
      router.replace('/(auth)/login' as any);
    } else if (user && inAuthGroup) {
      // 로그인되어 있고 auth 화면이면 메인 화면으로
      router.replace('/(tabs)' as any);
    }
  }, [user, loading, segments]);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

export default function RootLayout() {
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
        <RootLayoutNav />
      </SettingsProvider>
    </AuthProvider>
  );
}
