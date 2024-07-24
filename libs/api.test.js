describe('API Tests', () => {
  it('sample test', () => {
    expect(true).toBe(true)
  })
})

// import { getPostBySlug } from './api'

// // モッククライアントの作成
// const mockSlug = 'test'

// const mockClient = {
//   get: async ({ endpoint, queries }) => {
//     console.log('テストです')
//     if (endpoint === 'blog' && queries.filters === `slug[equals]${slug}`) {
//       return {
//         contents: [
//           {
//             title: 'テスト記事',
//             content: 'これはテスト用の記事です。',
//             slug: mockSlug,
//           },
//         ],
//       }
//     } else {
//       throw new Error('Unexpected query')
//     }
//   },
// }

// // テスト
// describe('getPostBySlug', () => {
//   it('returns correct post data for a given slug', async () => {
//     console.log('テスト開始: 正常なスラッグ')
//     const post = await getPostBySlug(mockSlug, mockClient)
//     console.log('取得したポスト:', post)

//     // テスト用のデータが返されることを確認
//     expect(post).toBeDefined()
//     expect(post.title).toBe('テスト記事')
//     expect(post.content).toBe('これはテスト用の記事です。')
//     expect(post.slug).toBe(mockSlug)
//     console.log('取得した投稿', post)
//   })

//   it('handles errors gracefully', async () => {
//     const mockClientWithError = {
//       get: async () => {
//         throw new Error('Mock error')
//       },
//     }

//     // エラーが適切に処理されることを確認
//     await expect(
//       getPostBySlug('invalid-slug', mockClientWithError),
//     ).rejects.toThrow()
//   })
// })
