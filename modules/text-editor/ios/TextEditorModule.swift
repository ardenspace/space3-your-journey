import ExpoModulesCore

/**
 * 네이티브 텍스트 에디터 모듈 (iOS)
 * 커스텀 UITextView를 사용하여 향상된 텍스트 편집 기능 제공
 */
public class TextEditorModule: Module {
  public func definition() -> ModuleDefinition {
    Name("TextEditor")

    // 에디터 설정 적용
    AsyncFunction("applyConfig") { (config: [String: Any]) in
      // TODO: 네이티브 UITextView에 설정 적용
      // - fontFamily: 폰트 패밀리 설정
      // - fontSize: 폰트 크기 설정 (pt)
      // - fontColor: 텍스트 색상 설정
      // - backgroundColor: 배경색 설정
      print("iOS - applyConfig called with: \(config)")
    }

    // 텍스트 가져오기
    AsyncFunction("getText") { () -> String in
      // TODO: UITextView에서 현재 텍스트 반환
      return ""
    }

    // 텍스트 설정
    AsyncFunction("setText") { (text: String) in
      // TODO: UITextView에 텍스트 설정
      print("iOS - setText: \(text)")
    }

    // 에디터 초기화
    AsyncFunction("clear") {
      // TODO: UITextView 내용 지우기
      print("iOS - clear called")
    }

    // 뷰 정의 (React Native 컴포넌트로 사용 가능)
    View(TextEditorView.self) {
      // Props 정의
      Prop("fontFamily") { (view: TextEditorView, fontFamily: String) in
        view.setFontFamily(fontFamily)
      }

      Prop("fontSize") { (view: TextEditorView, fontSize: CGFloat) in
        view.setFontSize(fontSize)
      }

      Prop("fontColor") { (view: TextEditorView, color: String) in
        view.setFontColor(color)
      }

      Prop("backgroundColor") { (view: TextEditorView, color: String) in
        view.setBackgroundColorFromHex(color)
      }

      Prop("text") { (view: TextEditorView, text: String) in
        view.setText(text)
      }

      // 이벤트 정의
      Events("onTextChange")
    }
  }
}
