declare module '*.module.css' {
  const content: { [className: string]: string }
  export default content
}

declare const styles: {
  flexContainer: string
  categoriesLink: string
  icon: string
}

export default styles
