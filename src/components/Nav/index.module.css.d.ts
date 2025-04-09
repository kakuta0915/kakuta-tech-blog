declare module '*.module.css' {
  const content: { [className: string]: string }
  export default content
}

declare const styles: {
  headerNav: string
  nav: string
}

export default styles
