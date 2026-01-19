import { Timestamp } from 'firebase/firestore';

/**
 * 일기 데이터 타입
 */
export interface Diary {
  id: string;
  userId: string;
  title?: string;
  content: string;
  backgroundColor: string; // 앱 배경 색상 (hex)
  notebookDesign: string; // 속지 디자인 파일명 또는 URL
  fontFamily: string;
  fontSize: number;
  fontColor: string; // 글자 색상 (hex)
  createdAt: Timestamp;
  updatedAt: Timestamp;
  isTimeCapsule: boolean;
  timeCapsuleId?: string; // 타임캡슐인 경우 참조 ID
}

/**
 * 타임캡슐 데이터 타입
 */
export interface TimeCapsule {
  id: string;
  userId: string;
  diaryId: string; // 연결된 일기 ID
  openDate: Timestamp; // 개봉 날짜
  isOpened: boolean; // 개봉 여부
  createdAt: Timestamp;
  notificationScheduled: boolean; // 알림 예약 여부
}

/**
 * 사용자 설정 타입 (AsyncStorage에 저장)
 */
export interface UserSettings {
  // 마지막으로 사용한 설정 (다음 일기 작성 시 기본값)
  lastBackgroundColor: string;
  lastNotebookDesign: string;
  lastFontFamily: string;
  lastFontSize: number;
  lastFontColor: string;

  // 앱 설정
  enableNotifications: boolean;
  theme: 'light' | 'dark' | 'auto';
}

/**
 * 속지 디자인 타입
 */
export interface NotebookDesign {
  id: string;
  name: string;
  thumbnailUrl: string; // Firebase Storage URL
  imageUrl: string; // 실제 사용할 이미지 URL
  category?: string; // 예: 줄노트, 모눈, 무지 등
}

/**
 * 타임캡슐 개봉 옵션
 */
export type TimeCapsuleOption = '1달' | '3달' | '6달' | '1년' | '직접 입력';

/**
 * 일기 작성 폼 데이터
 */
export interface DiaryFormData {
  title?: string;
  content: string;
  backgroundColor: string;
  notebookDesign: string;
  fontFamily: string;
  fontSize: number;
  fontColor: string;
  isTimeCapsule: boolean;
  timeCapsuleOption?: TimeCapsuleOption;
  customOpenDate?: Date;
}

/**
 * Firebase 사용자 타입 (간소화)
 */
export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}
