type TocItem = {
  id: string
  text: string
  name?: 'h2' | 'h3'
}

export type TableOfContentsProps = {
  toc: TocItem[]
}
