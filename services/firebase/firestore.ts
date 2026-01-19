import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './config';
import type { Diary, TimeCapsule } from '@/types';

/**
 * 일기 관련 Firestore 함수들
 */
export const diaryService = {
  /**
   * 새 일기 작성
   */
  async createDiary(userId: string, diaryData: Omit<Diary, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) {
    const diariesRef = collection(db, 'users', userId, 'diaries');
    const docRef = await addDoc(diariesRef, {
      ...diaryData,
      userId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  },

  /**
   * 일기 수정
   */
  async updateDiary(userId: string, diaryId: string, updates: Partial<Diary>) {
    const diaryRef = doc(db, 'users', userId, 'diaries', diaryId);
    await updateDoc(diaryRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  },

  /**
   * 일기 삭제
   */
  async deleteDiary(userId: string, diaryId: string) {
    const diaryRef = doc(db, 'users', userId, 'diaries', diaryId);
    await deleteDoc(diaryRef);
  },

  /**
   * 일기 단건 조회
   */
  async getDiary(userId: string, diaryId: string): Promise<Diary | null> {
    const diaryRef = doc(db, 'users', userId, 'diaries', diaryId);
    const diarySnap = await getDoc(diaryRef);

    if (!diarySnap.exists()) {
      return null;
    }

    return {
      id: diarySnap.id,
      ...diarySnap.data(),
    } as Diary;
  },

  /**
   * 사용자의 모든 일기 조회 (타임캡슐 제외, 최신순)
   */
  async getDiaries(userId: string): Promise<Diary[]> {
    const diariesRef = collection(db, 'users', userId, 'diaries');
    const q = query(
      diariesRef,
      where('isTimeCapsule', '==', false),
      orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Diary[];
  },
};

/**
 * 타임캡슐 관련 Firestore 함수들
 */
export const timeCapsuleService = {
  /**
   * 타임캡슐 생성
   */
  async createTimeCapsule(
    userId: string,
    diaryId: string,
    openDate: Date
  ): Promise<string> {
    const capsulesRef = collection(db, 'users', userId, 'timecapsules');
    const docRef = await addDoc(capsulesRef, {
      userId,
      diaryId,
      openDate: Timestamp.fromDate(openDate),
      isOpened: false,
      createdAt: serverTimestamp(),
      notificationScheduled: false,
    });
    return docRef.id;
  },

  /**
   * 타임캡슐 개봉
   */
  async openTimeCapsule(userId: string, capsuleId: string) {
    const capsuleRef = doc(db, 'users', userId, 'timecapsules', capsuleId);
    await updateDoc(capsuleRef, {
      isOpened: true,
    });
  },

  /**
   * 개봉 가능한 타임캡슐 목록 조회
   */
  async getOpenableTimeCapsules(userId: string): Promise<TimeCapsule[]> {
    const capsulesRef = collection(db, 'users', userId, 'timecapsules');
    const now = Timestamp.now();
    const q = query(
      capsulesRef,
      where('isOpened', '==', false),
      where('openDate', '<=', now),
      orderBy('openDate', 'asc')
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as TimeCapsule[];
  },

  /**
   * 모든 타임캡슐 조회 (개봉 여부 무관)
   */
  async getAllTimeCapsules(userId: string): Promise<TimeCapsule[]> {
    const capsulesRef = collection(db, 'users', userId, 'timecapsules');
    const q = query(capsulesRef, orderBy('openDate', 'desc'));

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as TimeCapsule[];
  },

  /**
   * 타임캡슐 단건 조회
   */
  async getTimeCapsule(userId: string, capsuleId: string): Promise<TimeCapsule | null> {
    const capsuleRef = doc(db, 'users', userId, 'timecapsules', capsuleId);
    const capsuleSnap = await getDoc(capsuleRef);

    if (!capsuleSnap.exists()) {
      return null;
    }

    return {
      id: capsuleSnap.id,
      ...capsuleSnap.data(),
    } as TimeCapsule;
  },
};
