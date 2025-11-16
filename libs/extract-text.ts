// 記事本文 (HTML) から 80文字に切り詰めて description を作る
import { convert } from 'html-to-text'

/**
 * HTML 文字列からテキストを抽出して要約する関数
 * @param html - HTML文字列
 * @param length - 抽出する最大文字数 (デフォルト 80)
 * @param more - 省略記号 (デフォルト "...")
 * @returns 要約されたテキスト
 */

export function extractText(
  html: string,
  length: number = 80,
  more: string = '...',
): string {
  const text: string = convert(html, {
    selectors: [
      { selector: 'img', format: 'skip' },
      { selector: 'a', options: { ignoreHref: true } },
    ],
  })

  return text.slice(0, length) + more
}
