package expo.modules.texteditor

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

/**
 * 네이티브 텍스트 에디터 모듈 (Android)
 * 커스텀 EditText를 사용하여 향상된 텍스트 편집 기능 제공
 */
class TextEditorModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("TextEditor")

    // 에디터 설정 적용
    AsyncFunction("applyConfig") { config: Map<String, Any?> ->
      // TODO: 네이티브 EditText에 설정 적용
      // - fontFamily: 폰트 패밀리 설정
      // - fontSize: 폰트 크기 설정 (sp)
      // - fontColor: 텍스트 색상 설정
      // - backgroundColor: 배경색 설정
      println("Android - applyConfig called with: $config")
    }

    // 텍스트 가져오기
    AsyncFunction("getText") {
      // TODO: EditText에서 현재 텍스트 반환
      ""
    }

    // 텍스트 설정
    AsyncFunction("setText") { text: String ->
      // TODO: EditText에 텍스트 설정
      println("Android - setText: $text")
    }

    // 에디터 초기화
    AsyncFunction("clear") {
      // TODO: EditText 내용 지우기
      println("Android - clear called")
    }

    // 뷰 정의 (React Native 컴포넌트로 사용 가능)
    View(TextEditorView::class) {
      // Props 정의
      Prop("fontFamily") { view: TextEditorView, fontFamily: String ->
        view.setFontFamily(fontFamily)
      }

      Prop("fontSize") { view: TextEditorView, fontSize: Float ->
        view.setFontSize(fontSize)
      }

      Prop("fontColor") { view: TextEditorView, color: String ->
        view.setFontColor(color)
      }

      Prop("backgroundColor") { view: TextEditorView, color: String ->
        view.setBackgroundColor(color)
      }

      Prop("text") { view: TextEditorView, text: String ->
        view.setText(text)
      }

      // 이벤트 정의
      Events("onTextChange")
    }
  }
}
