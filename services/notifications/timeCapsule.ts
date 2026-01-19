import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

/**
 * 알림 핸들러 설정
 */
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

/**
 * 타임캡슐 알림 서비스
 */
export const timeCapsuleNotificationService = {
  /**
   * 알림 권한 요청
   */
  async requestPermissions(): Promise<boolean> {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      console.warn('알림 권한이 거부되었습니다.');
      return false;
    }

    // Android 채널 설정
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('timecapsule', {
        name: '타임캡슐 알림',
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    return true;
  },

  /**
   * 타임캡슐 개봉 알림 예약
   * @param capsuleId 타임캡슐 ID
   * @param openDate 개봉 날짜
   * @param title 일기 제목 (있을 경우)
   * @returns 알림 ID
   */
  async scheduleTimeCapsuleNotification(
    capsuleId: string,
    openDate: Date,
    title?: string
  ): Promise<string | null> {
    const hasPermission = await this.requestPermissions();
    if (!hasPermission) {
      return null;
    }

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: '타임캡슐이 개봉되었습니다! 🎁',
        body: title
          ? `"${title}" 일기를 이제 읽을 수 있습니다.`
          : '당신의 추억을 다시 만나보세요.',
        data: { capsuleId, type: 'timecapsule' },
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: openDate,
        channelId: Platform.OS === 'android' ? 'timecapsule' : undefined,
      },
    });

    return notificationId;
  },

  /**
   * 예약된 알림 취소
   */
  async cancelNotification(notificationId: string) {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
  },

  /**
   * 모든 예약된 알림 조회
   */
  async getAllScheduledNotifications() {
    return await Notifications.getAllScheduledNotificationsAsync();
  },

  /**
   * 타임캡슐 관련 알림 모두 취소
   */
  async cancelAllTimeCapsuleNotifications() {
    const scheduled = await this.getAllScheduledNotifications();
    const timeCapsuleNotifications = scheduled.filter(
      notif => notif.content.data?.type === 'timecapsule'
    );

    for (const notif of timeCapsuleNotifications) {
      await this.cancelNotification(notif.identifier);
    }
  },
};

/**
 * 알림 리스너 설정 (앱에서 사용)
 */
export const setupNotificationListeners = () => {
  // 앱이 포그라운드에 있을 때 알림 수신
  const notificationListener = Notifications.addNotificationReceivedListener(notification => {
    console.log('알림 수신:', notification);
  });

  // 사용자가 알림을 탭했을 때
  const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
    const data = response.notification.request.content.data;
    console.log('알림 탭:', data);

    if (data.type === 'timecapsule' && data.capsuleId) {
      // TODO: 타임캡슐 상세 화면으로 이동
      console.log('타임캡슐 ID:', data.capsuleId);
    }
  });

  return () => {
    notificationListener.remove();
    responseListener.remove();
  };
};
