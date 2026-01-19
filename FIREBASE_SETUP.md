# Firebase 설정 가이드

## 1. Firebase 프로젝트 생성

1. [Firebase Console](https://console.firebase.google.com/)에 접속
2. "프로젝트 추가" 클릭
3. 프로젝트 이름: `your-journey` (또는 원하는 이름)
4. Google Analytics는 선택사항 (무료 Spark 플랜이므로 활성화 추천)

## 2. Firebase 서비스 활성화

### 2.1 Authentication 설정

1. 좌측 메뉴 > Build > Authentication
2. "시작하기" 클릭
3. 로그인 제공업체에서 **이메일/비밀번호** 활성화
4. (선택) Google 로그인도 추가 가능

### 2.2 Firestore Database 설정

1. 좌측 메뉴 > Build > Firestore Database
2. "데이터베이스 만들기" 클릭
3. **프로덕션 모드**로 시작 (보안 규칙 직접 설정)
4. 위치: `asia-northeast3 (Seoul)` 선택 (한국 사용자용)
5. 생성 완료 후 **규칙** 탭으로 이동

**Firestore 보안 규칙 설정:**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 사용자는 자신의 데이터만 읽고 쓸 수 있음
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;

      // 일기 데이터
      match /diaries/{diaryId} {
        allow read: if request.auth != null && request.auth.uid == userId;
        allow write: if request.auth != null && request.auth.uid == userId;
      }

      // 타임캡슐 데이터
      match /timecapsules/{capsuleId} {
        allow read: if request.auth != null && request.auth.uid == userId
                    && (resource == null || resource.data.openDate <= request.time);
        allow write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```

### 2.3 Storage 설정

1. 좌측 메뉴 > Build > Storage
2. "시작하기" 클릭
3. **프로덕션 모드**로 시작
4. 위치: `asia-northeast3 (Seoul)`
5. **규칙** 탭에서 다음과 같이 설정:

**Storage 보안 규칙:**
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // 속지 디자인 이미지는 모든 인증된 사용자가 읽기 가능
    match /notebook-designs/{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if false; // 관리자만 업로드 (수동으로 업로드)
    }

    // 사용자별 이미지 (일기에 첨부한 사진 등)
    match /users/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 2.4 Cloud Messaging 설정

1. 좌측 메뉴 > Build > Cloud Messaging
2. "시작하기" 클릭
3. Android/iOS 앱 등록 후 자동으로 활성화됨

## 3. 앱 등록

### 3.1 Android 앱 등록

1. 프로젝트 개요 > 앱 추가 > Android 선택
2. Android 패키지 이름: `com.yourjourney.app`
3. 앱 닉네임: `당신의 여정 (Android)`
4. `google-services.json` 다운로드
5. **다운로드한 파일을 프로젝트 루트에 저장** (gitignore에 추가됨)

### 3.2 iOS 앱 등록

1. 프로젝트 개요 > 앱 추가 > iOS 선택
2. iOS 번들 ID: `com.yourjourney.app`
3. 앱 닉네임: `당신의 여정 (iOS)`
4. `GoogleService-Info.plist` 다운로드
5. **다운로드한 파일을 프로젝트 루트에 저장** (gitignore에 추가됨)

## 4. 환경 변수 설정

Firebase 설정 정보를 `.env` 파일에 저장합니다.

1. 프로젝트 루트에 `.env` 파일 생성
2. Firebase Console > 프로젝트 설정 > 일반 탭 > SDK 설정 및 구성에서 설정 정보 복사

**.env 파일 예시:**
```bash
# Firebase Configuration
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key_here
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
EXPO_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef
```

**⚠️ 중요:** `.env` 파일은 절대 Git에 커밋하지 마세요! (이미 .gitignore에 추가됨)

## 5. 속지 디자인 업로드

1. Firebase Console > Storage
2. `notebook-designs/` 폴더 생성
3. 준비한 속지 이미지 파일들 업로드 (PNG/JPG)
4. 파일명 예시: `lined.png`, `grid.png`, `dotted.png`, `blank.png` 등

## 6. Firestore 인덱스 생성 (필요시)

복잡한 쿼리 사용 시 인덱스 생성이 필요할 수 있습니다:

```javascript
// 예: 날짜순 정렬 쿼리
diaries (collection)
  - userId (Ascending)
  - createdAt (Descending)
```

앱 실행 중 인덱스 오류가 발생하면, 에러 메시지에 포함된 링크를 클릭하여 자동으로 인덱스 생성 가능합니다.

## 7. 비용 절감 팁

### Spark 플랜 (무료) 제한:
- Firestore: 읽기 50,000회/일, 쓰기 20,000회/일
- Storage: 5GB 저장, 1GB/일 다운로드
- Authentication: 무제한

### 비용 절감 전략:
1. **캐싱 활용**: AsyncStorage로 최근 일기 캐시
2. **쿼리 최적화**: 필요한 필드만 가져오기
3. **이미지 압축**: 속지 디자인을 WebP 형식으로 변환 (용량 50% 절감)
4. **오프라인 지원**: Firestore의 오프라인 캐싱 활용

## 다음 단계

Firebase 설정이 완료되면:
1. `.env` 파일에 설정 정보 입력
2. `google-services.json` (Android) 다운로드 및 저장
3. `GoogleService-Info.plist` (iOS) 다운로드 및 저장
4. 개발 빌드 생성: `pnpm run prebuild`
5. 앱 실행 및 테스트

---

**문제가 발생하면:**
- [Firebase 문서](https://firebase.google.com/docs)
- [Expo Firebase 가이드](https://docs.expo.dev/guides/using-firebase/)
