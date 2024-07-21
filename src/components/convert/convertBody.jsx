// 変換処理を行うコンポーネント(html-react-parser)
import Image from 'next/image'
import parse from 'html-react-parser'
import hljs from 'highlight.js'

export default function ConvertBody({ contentHTML }) {
  const contentReact = parse(contentHTML, {
    replace: (node) => {
      if (node.name === 'img' && node.attribs) {
        const { src, alt, width, height } = node.attribs
        return (
          <Image
            layout="responsive"
            src={src}
            width={parseInt(width, 10)}
            height={parseInt(height, 10)}
            alt={alt}
            sizes="(min-width: 768px) 768px, 100vw"
          />
        )
      }
      if (node.name === 'code' && node.children[0] && node.children[0].data) {
        const result = hljs.highlightAuto(node.children[0].data)
        const dom = parse(result.value)

        return <code className="hljs">{dom}</code>
      }
    },
  })
  return <>{contentReact}</>
}
