declare module '*.module.css' {
  const content: { [className: string]: string }
  export default content
}

declare const styles: {
  footerLogo: string
  headerLogo: string
  linkImage: string
}

export default styles
