// 変換処理を行うコンポーネント(html-react-parser)
import Image from 'next/image'
import parse from 'html-react-parser'
import hljs from 'highlight.js'

export default function ConvertBody({ contentHTML }) {
  const contentReact = parse(contentHTML, {
    replace: (node) => {
      if (node.name === 'img') {
        const { src, alt, width, height } = node.attribs
        return (
          <Image
            layout="responsive"
            src={src}
            width={width}
            height={height}
            alt={alt}
            sizes="(min-width: 768px) 768px, 100vw"
          />
        )
      }
      if (node.name === 'code') {
        const result = hljs.highlightAuto(node.children[0].data)
        const dom = parse(result.value)

        return <code className="hljs">{dom}</code>
      }
    },
  })
  return <>{contentReact}</>
}
