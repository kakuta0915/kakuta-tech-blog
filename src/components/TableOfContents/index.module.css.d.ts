declare module '*.module.css' {
  const content: { [className: string]: string }
  export default content
}

declare const styles: {
  toc: string
  open: string
  close: string
  tocBtn: string
  icon: string
  accordion: string
  scroll: string
  tocLi: string
}

export default styles
