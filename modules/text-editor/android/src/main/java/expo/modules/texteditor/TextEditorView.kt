package expo.modules.texteditor

import android.content.Context
import android.graphics.Color
import android.graphics.Typeface
import android.text.Editable
import android.text.TextWatcher
import android.util.TypedValue
import android.widget.EditText
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.views.ExpoView

/**
 * 커스텀 텍스트 에디터 뷰
 * Android의 EditText를 확장하여 만든 네이티브 에디터
 */
class TextEditorView(context: Context, appContext: AppContext) : ExpoView(context, appContext) {

  private val editText: EditText = EditText(context).apply {
    // 기본 설정
    setPadding(16, 16, 16, 16)
    setTextSize(TypedValue.COMPLEX_UNIT_SP, 16f)
    setBackgroundColor(Color.TRANSPARENT)

    // 다중 라인 지원
    setSingleLine(false)
    maxLines = Int.MAX_VALUE

    // 텍스트 변경 리스너
    addTextChangedListener(object : TextWatcher {
      override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}
      override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {}
      override fun afterTextChanged(s: Editable?) {
        // TODO: onTextChange 이벤트 발생
      }
    })
  }

  init {
    addView(editText)
  }

  /**
   * 폰트 패밀리 설정
   */
  fun setFontFamily(fontFamily: String) {
    try {
      val typeface = when (fontFamily.lowercase()) {
        "monospace" -> Typeface.MONOSPACE
        "serif" -> Typeface.SERIF
        "sans-serif" -> Typeface.SANS_SERIF
        else -> Typeface.DEFAULT
      }
      editText.typeface = typeface
    } catch (e: Exception) {
      println("Error setting font family: ${e.message}")
    }
  }

  /**
   * 폰트 크기 설정 (sp)
   */
  fun setFontSize(size: Float) {
    editText.setTextSize(TypedValue.COMPLEX_UNIT_SP, size)
  }

  /**
   * 폰트 색상 설정
   */
  fun setFontColor(color: String) {
    try {
      editText.setTextColor(Color.parseColor(color))
    } catch (e: Exception) {
      println("Error parsing font color: ${e.message}")
    }
  }

  /**
   * 배경색 설정
   */
  override fun setBackgroundColor(color: String) {
    try {
      editText.setBackgroundColor(Color.parseColor(color))
    } catch (e: Exception) {
      println("Error parsing background color: ${e.message}")
    }
  }

  /**
   * 텍스트 설정
   */
  fun setText(text: String) {
    editText.setText(text)
  }

  /**
   * 텍스트 가져오기
   */
  fun getText(): String {
    return editText.text.toString()
  }

  /**
   * 에디터 초기화
   */
  fun clear() {
    editText.text.clear()
  }
}
