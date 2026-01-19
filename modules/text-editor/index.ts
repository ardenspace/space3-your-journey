import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to TextEditor.web.ts
// and on native platforms to TextEditor.ts
import TextEditorModule from './src/TextEditorModule';

/**
 * 네이티브 텍스트 에디터 설정
 */
export interface TextEditorConfig {
  fontFamily: string;
  fontSize: number;
  fontColor: string;
  backgroundColor: string;
  placeholder?: string;
  autoFocus?: boolean;
}

/**
 * 네이티브 텍스트 에디터 모듈
 */
export const TextEditor = {
  /**
   * 에디터 설정 적용
   */
  async applyConfig(config: TextEditorConfig): Promise<void> {
    return await TextEditorModule.applyConfig(config);
  },

  /**
   * 텍스트 가져오기
   */
  async getText(): Promise<string> {
    return await TextEditorModule.getText();
  },

  /**
   * 텍스트 설정
   */
  async setText(text: string): Promise<void> {
    return await TextEditorModule.setText(text);
  },

  /**
   * 에디터 초기화
   */
  async clear(): Promise<void> {
    return await TextEditorModule.clear();
  },
};

export { TextEditorConfig };
