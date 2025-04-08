declare module '*.module.css' {
  const content: { [className: string]: string }
  export default content
}

declare const styles: {
  header: string
  headerIcon: string
  headerTitle: string
  icon: string
  publish: string
}

export default styles
