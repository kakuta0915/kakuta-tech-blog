declare module '*.module.css' {
  const content: { [className: string]: string }
  export default content
}

declare const styles: {
  stack: string
}

export default styles
