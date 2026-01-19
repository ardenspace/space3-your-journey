import ExpoModulesCore
import UIKit

/**
 * 커스텀 텍스트 에디터 뷰
 * iOS의 UITextView를 확장하여 만든 네이티브 에디터
 */
class TextEditorView: ExpoView {
  private let textView = UITextView()

  required init(appContext: AppContext? = nil) {
    super.init(appContext: appContext)
    setupTextView()
  }

  private func setupTextView() {
    // 기본 설정
    textView.font = UIFont.systemFont(ofSize: 16)
    textView.backgroundColor = .clear
    textView.textContainerInset = UIEdgeInsets(top: 16, left: 16, bottom: 16, right: 16)
    textView.isScrollEnabled = true
    textView.isEditable = true
    textView.autocorrectionType = .default
    textView.spellCheckingType = .default

    // 레이아웃 설정
    textView.translatesAutoresizingMaskIntoConstraints = false
    addSubview(textView)

    NSLayoutConstraint.activate([
      textView.topAnchor.constraint(equalTo: topAnchor),
      textView.leadingAnchor.constraint(equalTo: leadingAnchor),
      textView.trailingAnchor.constraint(equalTo: trailingAnchor),
      textView.bottomAnchor.constraint(equalTo: bottomAnchor)
    ])

    // 텍스트 변경 알림
    NotificationCenter.default.addObserver(
      self,
      selector: #selector(textDidChange),
      name: UITextView.textDidChangeNotification,
      object: textView
    )
  }

  @objc private func textDidChange() {
    // TODO: onTextChange 이벤트 발생
  }

  /**
   * 폰트 패밀리 설정
   */
  func setFontFamily(_ fontFamily: String) {
    let size = textView.font?.pointSize ?? 16
    let font: UIFont

    switch fontFamily.lowercased() {
    case "monospace":
      font = UIFont.monospacedSystemFont(ofSize: size, weight: .regular)
    case "serif":
      font = UIFont(name: "TimesNewRomanPSMT", size: size) ?? UIFont.systemFont(ofSize: size)
    case "sans-serif":
      font = UIFont.systemFont(ofSize: size)
    default:
      font = UIFont.systemFont(ofSize: size)
    }

    textView.font = font
  }

  /**
   * 폰트 크기 설정 (pt)
   */
  func setFontSize(_ size: CGFloat) {
    if let currentFont = textView.font {
      textView.font = currentFont.withSize(size)
    } else {
      textView.font = UIFont.systemFont(ofSize: size)
    }
  }

  /**
   * 폰트 색상 설정
   */
  func setFontColor(_ hexColor: String) {
    if let color = UIColor(hexString: hexColor) {
      textView.textColor = color
    }
  }

  /**
   * 배경색 설정
   */
  func setBackgroundColorFromHex(_ hexColor: String) {
    if let color = UIColor(hexString: hexColor) {
      textView.backgroundColor = color
    }
  }

  /**
   * 텍스트 설정
   */
  func setText(_ text: String) {
    textView.text = text
  }

  /**
   * 텍스트 가져오기
   */
  func getText() -> String {
    return textView.text ?? ""
  }

  /**
   * 에디터 초기화
   */
  func clear() {
    textView.text = ""
  }

  deinit {
    NotificationCenter.default.removeObserver(self)
  }
}

// MARK: - UIColor Extension for Hex Colors
extension UIColor {
  convenience init?(hexString: String) {
    var hex = hexString.trimmingCharacters(in: .whitespacesAndNewlines).uppercased()

    if hex.hasPrefix("#") {
      hex.remove(at: hex.startIndex)
    }

    guard hex.count == 6 else {
      return nil
    }

    var rgbValue: UInt64 = 0
    Scanner(string: hex).scanHexInt64(&rgbValue)

    let red = CGFloat((rgbValue & 0xFF0000) >> 16) / 255.0
    let green = CGFloat((rgbValue & 0x00FF00) >> 8) / 255.0
    let blue = CGFloat(rgbValue & 0x0000FF) / 255.0

    self.init(red: red, green: green, blue: blue, alpha: 1.0)
  }
}
