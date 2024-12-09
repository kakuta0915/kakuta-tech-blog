// ページネーション機能 (タイトルとスラッグを取得する関数、ページネーションは別)

export function prevNextPost(allSlugs, currentSlug) {
  const numberOfPosts = allSlugs.length

  const index = allSlugs.findIndex(({ slug }) => slug === currentSlug)

  const prevPost =
    index + 1 === numberOfPosts ? { title: '', slug: '' } : allSlugs[index + 1]

  const nextPost = index === 0 ? { title: '', slug: '' } : allSlugs[index - 1]

  return [prevPost, nextPost]
}
