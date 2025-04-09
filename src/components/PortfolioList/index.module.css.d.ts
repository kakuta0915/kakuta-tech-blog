declare module '*.module.css' {
  const content: { [className: string]: string }
  export default content
}

declare const styles: {
  grid: string
  portfolioItem: string
  portfolioDetails: string
}

export default styles
