export const Z2M93GZB4V = process.env.NEXT_PUBLIC_GA_ID

export const pageview = (url) => {
  window.gtag('config', Z2M93GZB4V, {
    page_path: url,
  })
}
