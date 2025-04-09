declare module '*.module.css' {
  const content: { [className: string]: string }
  export default content
}

declare const styles: {
  header: string
  flex: string
  nav: string
}

export default styles
