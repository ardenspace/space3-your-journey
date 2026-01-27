import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const router = useRouter();

  const handleEmailAuth = async () => {
    if (!email || !password) {
      Alert.alert('오류', '이메일과 비밀번호를 입력해주세요.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('오류', '비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }

    setLoading(true);
    try {
      if (isSignUp) {
        await signUp(email, password);
        Alert.alert('성공', '회원가입이 완료되었습니다!');
      } else {
        await signIn(email, password);
      }
    } catch (error: any) {
      const errorMessage = getErrorMessage(error.code);
      Alert.alert('오류', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getErrorMessage = (errorCode: string) => {
    switch (errorCode) {
      case 'auth/invalid-email':
        return '유효하지 않은 이메일 주소입니다.';
      case 'auth/user-disabled':
        return '비활성화된 계정입니다.';
      case 'auth/user-not-found':
        return '존재하지 않는 계정입니다.';
      case 'auth/wrong-password':
        return '잘못된 비밀번호입니다.';
      case 'auth/email-already-in-use':
        return '이미 사용 중인 이메일입니다.';
      case 'auth/weak-password':
        return '비밀번호가 너무 약합니다.';
      case 'auth/network-request-failed':
        return '네트워크 연결을 확인해주세요.';
      default:
        return '오류가 발생했습니다. 다시 시도해주세요.';
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white dark:bg-gray-900"
    >
      <ScrollView
        contentContainerClassName="flex-grow justify-center px-6"
        keyboardShouldPersistTaps="handled"
      >
        <View className="w-full max-w-md mx-auto">
          {/* 로고/타이틀 */}
          <View className="items-center mb-12">
            <Text className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Your Journey
            </Text>
            <Text className="text-gray-600 dark:text-gray-400">
              {isSignUp ? '새로운 여정을 시작하세요' : '다시 만나서 반가워요'}
            </Text>
          </View>

          {/* 이메일/비밀번호 입력 폼 */}
          <View className="space-y-4">
            <View>
              <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                이메일
              </Text>
              <TextInput
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white"
                placeholder="example@email.com"
                placeholderTextColor="#9CA3AF"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                editable={!loading}
              />
            </View>

            <View>
              <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                비밀번호
              </Text>
              <TextInput
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white"
                placeholder="최소 6자 이상"
                placeholderTextColor="#9CA3AF"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                editable={!loading}
              />
            </View>

            {/* 로그인/회원가입 버튼 */}
            <TouchableOpacity
              className="w-full py-4 bg-blue-600 rounded-lg items-center mt-2 disabled:opacity-50"
              onPress={handleEmailAuth}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white font-semibold text-lg">
                  {isSignUp ? '회원가입' : '로그인'}
                </Text>
              )}
            </TouchableOpacity>

            {/* 모드 전환 */}
            <TouchableOpacity
              className="items-center py-2"
              onPress={() => setIsSignUp(!isSignUp)}
              disabled={loading}
            >
              <Text className="text-gray-600 dark:text-gray-400">
                {isSignUp ? '이미 계정이 있으신가요? ' : '계정이 없으신가요? '}
                <Text className="text-blue-600 font-semibold">
                  {isSignUp ? '로그인' : '회원가입'}
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
