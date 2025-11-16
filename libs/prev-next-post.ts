// 記事一覧から、指定した記事の前後の記事情報を取得する関数
export type PostSlug = {
  title: string
  slug: string
}

/**
 * 指定された記事の前後の記事を取得する
 * @param allSlugs
 * @param currentSlug
 * @returns [prevPost, nextPost] (存在しない場合は空オブジェクト)
 */
export function prevNextPost(
  allSlugs: PostSlug[],
  currentSlug: string,
): [PostSlug, PostSlug] {
  const index = allSlugs.findIndex(({ slug }) => slug === currentSlug)

  // indexが見つからなければ空オブジェクトを返す
  if (index === -1) {
    return [
      { title: '', slug: '' },
      { title: '', slug: '' },
    ]
  }

  // 前の記事（index + 1 の記事がなければ空オブジェクト）
  const prevPost: PostSlug = allSlugs[index + 1] ?? { title: '', slug: '' }

  // 次の記事（index - 1 の記事がなければ空オブジェクト）
  const nextPost: PostSlug = allSlugs[index - 1] ?? { title: '', slug: '' }

  return [prevPost, nextPost]
}
