# 네이티브 텍스트 에디터 모듈

React Native의 기본 TextInput을 대체하는 커스텀 네이티브 에디터입니다.

## 개요

이 모듈은 Android의 `EditText`와 iOS의 `UITextView`를 직접 사용하여 향상된 텍스트 편집 경험을 제공합니다.

### 주요 기능

- ✅ 폰트 패밀리, 크기, 색상 커스터마이징
- ✅ 배경색 설정
- ✅ 다중 라인 텍스트 지원
- ✅ 네이티브 성능 (매끄러운 스크롤, 입력)
- ✅ 설정 영구 저장 (Context와 연동)

## 개발 단계

### 현재 상태: 초기 세팅 완료 ✅

다음 구현 필요 사항:

#### 1. Android (Kotlin)
- [ ] `TextEditorView.kt`: 고급 폰트 설정 (커스텀 폰트 파일 로드)
- [ ] `TextEditorModule.kt`: 모듈 함수 구현 완료
- [ ] 이벤트 핸들러: `onTextChange` 이벤트 발생
- [ ] 스타일링: 줄 간격, 자간 등 추가 스타일링 옵션

#### 2. iOS (Swift)
- [ ] `TextEditorView.swift`: 커스텀 폰트 로드 기능
- [ ] `TextEditorModule.swift`: 모듈 함수 구현 완료
- [ ] 이벤트 핸들러: `onTextChange` 이벤트 발생
- [ ] 스타일링: 줄 간격, 자간 등 추가 스타일링 옵션

#### 3. TypeScript 인터페이스
- [ ] `index.ts`: React Native 컴포넌트 래퍼 추가
- [ ] 타입 정의 개선
- [ ] 에러 핸들링

## 사용법

### 기본 사용

```tsx
import { TextEditor } from '@/modules/text-editor';

// 설정 적용
await TextEditor.applyConfig({
  fontFamily: 'sans-serif',
  fontSize: 18,
  fontColor: '#333333',
  backgroundColor: '#FFFFFF',
  placeholder: '오늘의 일기를 작성하세요...',
});

// 텍스트 가져오기
const text = await TextEditor.getText();

// 텍스트 설정
await TextEditor.setText('새로운 내용');

// 초기화
await TextEditor.clear();
```

### React Native 컴포넌트로 사용 (TODO)

```tsx
import TextEditorView from '@/modules/text-editor/TextEditorView';

<TextEditorView
  fontFamily="sans-serif"
  fontSize={16}
  fontColor="#000000"
  backgroundColor="#FFFFFF"
  text={content}
  onTextChange={(text) => setContent(text)}
/>
```

## 빌드 및 테스트

### 개발 빌드 생성

네이티브 모듈을 사용하려면 Expo Go가 아닌 **개발 빌드**가 필요합니다:

```bash
# Android 개발 빌드
pnpm run prebuild
npx expo run:android

# iOS 개발 빌드 (macOS 필요)
pnpm run prebuild
npx expo run:ios
```

### 테스트

```bash
# Android 에뮬레이터에서 실행
npx expo run:android

# iOS 시뮬레이터에서 실행
npx expo run:ios
```

## 폴더 구조

```
modules/text-editor/
├── android/                    # Android 네이티브 코드
│   └── src/main/java/expo/modules/texteditor/
│       ├── TextEditorModule.kt
│       └── TextEditorView.kt
├── ios/                        # iOS 네이티브 코드
│   ├── TextEditorModule.swift
│   └── TextEditorView.swift
├── src/                        # TypeScript 인터페이스
│   └── TextEditorModule.ts
├── index.ts                    # 메인 엔트리
├── expo-module.config.json     # Expo 모듈 설정
└── README.md
```

## 추가 학습 자료

- [Expo Modules API 문서](https://docs.expo.dev/modules/overview/)
- [Android EditText 커스터마이징](https://developer.android.com/reference/android/widget/EditText)
- [iOS UITextView 가이드](https://developer.apple.com/documentation/uikit/uitextview)

## 다음 단계

1. ✅ 기본 구조 세팅 완료
2. ⏳ 네이티브 코드 구현 (Android/iOS)
3. ⏳ TypeScript 래퍼 컴포넌트 작성
4. ⏳ 일기 작성 화면에 통합
5. ⏳ 테스트 및 디버깅

---

**참고:** 네이티브 모듈 개발 중 오류가 발생하면:
- Android: Android Studio에서 Logcat 확인
- iOS: Xcode에서 디버그 콘솔 확인
