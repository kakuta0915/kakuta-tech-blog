declare module '*.module.css' {
  const content: { [className: string]: string }
  export default content
}

declare const styles: {
  fadeInUp: string
  fadeInRight: string
  fadeInLeft: string
  heroContainer: string
  heroText: string
  heroContact: string
}

export default styles
