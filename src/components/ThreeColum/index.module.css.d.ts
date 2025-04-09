declare module '*.module.css' {
  const content: { [className: string]: string }
  export default content
}

declare const styles: {
  flexContainer: string
  main: string
  sidebar: string
  socialActions: string
}

export default styles
