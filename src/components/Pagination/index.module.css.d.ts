declare module '*.module.css' {
  const content: { [className: string]: string }
  export default content
}

declare const styles: {
  flexContainer: string
  prev: string
  iconText: string
  next: string
}

export default styles
