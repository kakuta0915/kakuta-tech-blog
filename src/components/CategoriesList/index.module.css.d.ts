declare module '*.module.css' {
  const content: { [className: string]: string }
  export default content
}

declare const styles: {
  fadeInUp: string
  fadeInRight: string
  fadeInLeft: string
  categories: string
  open: string
  close: string
  categoriesBtn: string
  icon: string
  iconImg: string
  name: string
  accordion: string
  scrollHeight: string
  categoriesList: string
  categoriesLink: string
}

export default styles
