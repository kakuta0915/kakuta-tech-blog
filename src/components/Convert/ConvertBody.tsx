import React from 'react'
import Image from 'next/image'
import parse, { DOMNode } from 'html-react-parser'
import hljs from 'highlight.js'

interface ConvertBodyProps {
  contentHTML: string
  id?: string
}

function isElementNode(node: DOMNode): node is DOMNode & {
  name: string
  attribs: { [key: string]: string }
  children?: DOMNode[]
} {
  return node.type === 'tag' && !!node.name
}

function isTextNode(node: DOMNode): node is DOMNode & { data: string } {
  return node.type === 'text' && !!node.data
}

const ConvertBody: React.FC<ConvertBodyProps> = ({ contentHTML }) => {
  const contentReact = parse(contentHTML, {
    replace: (node) => {
      if (isElementNode(node)) {
        if (node.name === 'img' && node.attribs) {
          const { src, alt, width, height } = node.attribs

          if (!src) return null

          const imageWidth = width ? parseInt(width, 10) : 0
          const imageHeight = height ? parseInt(height, 10) : 0
          const imageAlt = alt || ''

          return (
            <Image
              layout="responsive"
              src={src}
              width={imageWidth || 0}
              height={imageHeight || 0}
              alt={imageAlt}
              sizes="(min-width: 768px) 768px, 100vw"
            />
          )
        }

        if (
          node.name === 'code' &&
          node.children?.[0] &&
          isTextNode(node.children[0])
        ) {
          const result = hljs.highlightAuto(node.children[0].data)
          const dom = parse(result.value)

          return <code className="hljs">{dom}</code>
        }
      }

      return null
    },
  })
  return <>{contentReact}</>
}

export default ConvertBody
