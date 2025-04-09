declare module '*.module.css' {
  const content: { [className: string]: string }
  export default content
}

declare const styles: {
  postsContainer: string
  link: string
  publishDate: string
  flexSocialActions: string
  socialActions: string
  icon: string
  postsCategoriesLi: string
  tagIcon: string
  name: string
  btnBox: string
  btn: string
}

export default styles
