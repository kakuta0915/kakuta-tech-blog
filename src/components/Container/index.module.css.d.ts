declare module '*.module.css' {
  const content: { [className: string]: string }
  export default content
}

declare const styles: {
  container: string
}

export default styles
