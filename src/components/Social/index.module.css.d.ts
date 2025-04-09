declare module '*.module.css' {
  const content: { [className: string]: string }
  export default content
}

declare const styles: {
  socialListFooter: string
  socialList: string
  link: string
  icon: string
}

export default styles
