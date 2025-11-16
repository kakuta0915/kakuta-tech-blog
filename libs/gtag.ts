// Google Analytics設定
export const GA_MEASUREMENT_ID: string | undefined =
  process.env['NEXT_PUBLIC_GA_ID']

// windowにgtagがあることを型として追加
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

/**
 * ページビューを送信する関数
 * @param url - ページのパス
 */
export const pageview = (url: string): void => {
  if (!GA_MEASUREMENT_ID) return

  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    })
  }
}
