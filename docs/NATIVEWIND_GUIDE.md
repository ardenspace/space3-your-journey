# NativeWind 사용 가이드

NativeWind는 Tailwind CSS를 React Native에서 사용할 수 있게 해주는 라이브러리입니다.

## 기본 사용법

### 1. className으로 스타일링

```tsx
import { View, Text } from 'react-native';

export default function Example() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold text-gray-900">
        안녕하세요!
      </Text>
    </View>
  );
}
```

### 2. 동적 스타일

```tsx
const isActive = true;

<View className={`p-4 ${isActive ? 'bg-blue-500' : 'bg-gray-200'}`}>
  <Text className={isActive ? 'text-white' : 'text-gray-900'}>
    상태에 따른 스타일
  </Text>
</View>
```

### 3. 커스텀 테마 사용

`tailwind.config.js`에 정의된 커스텀 색상 사용:

```tsx
<View className="bg-notebook-beige p-diary-md">
  <Text className="text-primary-600">
    커스텀 테마 색상
  </Text>
</View>
```

## 자주 사용하는 유틸리티 클래스

### Layout
- `flex-1` - flex: 1 (화면 전체 차지)
- `flex-row` - 가로 방향 정렬
- `items-center` - 세로 중앙 정렬
- `justify-center` - 가로 중앙 정렬
- `p-4` - padding: 16px
- `m-2` - margin: 8px
- `gap-2` - gap: 8px

### Typography
- `text-sm` - 작은 텍스트 (14px)
- `text-base` - 기본 텍스트 (16px)
- `text-lg` - 큰 텍스트 (18px)
- `text-2xl` - 매우 큰 텍스트 (24px)
- `font-bold` - 굵은 글씨
- `text-center` - 텍스트 중앙 정렬

### Colors
- `bg-white` - 흰색 배경
- `text-gray-900` - 검은색에 가까운 회색 텍스트
- `text-primary-600` - 커스텀 primary 색상
- `border-gray-300` - 회색 테두리

### Borders & Shadows
- `rounded-lg` - 둥근 모서리
- `border` - 테두리
- `border-2` - 2px 테두리
- `shadow-lg` - 그림자 효과

## 일기장 앱에서의 활용 예시

### 1. 일기 카드 컴포넌트

```tsx
export function DiaryCard({ title, content, date }: DiaryCardProps) {
  return (
    <View className="bg-white rounded-xl p-4 shadow-md mb-4">
      <Text className="text-lg font-bold text-gray-900 mb-2">
        {title}
      </Text>
      <Text className="text-sm text-gray-600 mb-3">
        {date}
      </Text>
      <Text className="text-base text-gray-800 line-clamp-3">
        {content}
      </Text>
    </View>
  );
}
```

### 2. 속지 디자인 선택 버튼

```tsx
export function NotebookDesignPicker({ designs, selected, onSelect }) {
  return (
    <View className="flex-row gap-3 flex-wrap">
      {designs.map((design) => (
        <Pressable
          key={design.id}
          onPress={() => onSelect(design.id)}
          className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
            selected === design.id ? 'border-primary-600' : 'border-gray-200'
          }`}
        >
          <Image source={{ uri: design.imageUrl }} className="w-full h-full" />
        </Pressable>
      ))}
    </View>
  );
}
```

### 3. 타임캡슐 배지

```tsx
export function TimeCapsuleBadge({ openDate }: { openDate: Date }) {
  const isOpenable = openDate <= new Date();

  return (
    <View className={`px-3 py-1 rounded-full ${
      isOpenable ? 'bg-green-100' : 'bg-gray-100'
    }`}>
      <Text className={`text-xs font-medium ${
        isOpenable ? 'text-green-700' : 'text-gray-600'
      }`}>
        {isOpenable ? '개봉 가능 🎁' : '개봉 대기중 🔒'}
      </Text>
    </View>
  );
}
```

## 다크 모드 지원

NativeWind는 다크 모드를 자동으로 지원합니다:

```tsx
<View className="bg-white dark:bg-gray-900">
  <Text className="text-gray-900 dark:text-white">
    라이트/다크 모드 자동 전환
  </Text>
</View>
```

## 성능 최적화 팁

1. **정적 스타일은 className으로**
   ```tsx
   // Good
   <View className="flex-1 p-4 bg-white" />

   // Avoid
   <View style={{ flex: 1, padding: 16, backgroundColor: 'white' }} />
   ```

2. **동적 스타일만 조건부로**
   ```tsx
   // Good
   <View className={`p-4 ${isActive ? 'bg-blue-500' : 'bg-gray-200'}`} />
   ```

3. **복잡한 스타일은 컴포넌트로 분리**
   ```tsx
   // 재사용 가능한 Button 컴포넌트 생성
   <Button variant="primary" size="lg">저장</Button>
   ```

## 참고 자료

- [NativeWind 공식 문서](https://www.nativewind.dev/)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
- [커스텀 테마 설정](../tailwind.config.js)

## 예제 컴포넌트

프로젝트에 포함된 예제:
- `components/ui/Button.tsx` - 재사용 가능한 버튼 컴포넌트
