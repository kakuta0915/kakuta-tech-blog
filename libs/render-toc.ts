// 目次用のデータに整形する関数 (対象はh2とh3)
import * as cheerio from 'cheerio'

export type TocItem = {
  text: string
  id: string
  name: 'h2' | 'h3'
}

/**
 * 記事本文HTMLから目次用の配列を生成する
 * @param body - 記事本文のHTML文字列
 * @returns TocItem[] - 目次用の配列
 */

export const renderToc = (body: string): TocItem[] => {
  const $ = cheerio.load(body)
  const headings = $('h2,h3').toArray()

  const toc: TocItem[] = headings
    .map((element) => {
      const heading = $(element)
      const id = heading.attr('id')
      const name = element.tagName as 'h2' | 'h3'
      const text = heading.text().trim()

      if (!id || !text) return null
      return { text, id, name }
    })
    .filter((item): item is TocItem => item !== null)

  return toc
}
