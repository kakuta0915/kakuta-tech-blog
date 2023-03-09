export const GZ2M93GZB4V = process.env.NEXT_PUBLIC_GA_ID

export const pageview = (url) => {
  window.gtag('config', GZ2M93GZB4V, {
    page_path: url,
  })
}
