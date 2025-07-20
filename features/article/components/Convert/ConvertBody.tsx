import React from 'react'
import Image from 'next/image'
import parse, { DOMNode } from 'html-react-parser'
import hljs from 'highlight.js'

type ConvertBodyProps = {
  contentHTML: string
  id?: string
}

function isElementNode(node: DOMNode): node is DOMNode & {
  name: string
  attribs: { [key: string]: string }
  children: DOMNode[]
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
        if (node.name === 'img') {
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

        if (node.name === 'pre') {
          const codeNodeCandidate = node.children.find(
            (child) => isElementNode(child) && child.name === 'code',
          )

          if (codeNodeCandidate && isElementNode(codeNodeCandidate)) {
            const codeTextNodeCandidate = codeNodeCandidate.children[0]

            if (codeTextNodeCandidate && isTextNode(codeTextNodeCandidate)) {
              const codeText = codeTextNodeCandidate.data
              const language = codeNodeCandidate.attribs['class']
                ? codeNodeCandidate.attribs['class']
                    .replace(/^language-/, '')
                    .trim()
                : undefined

              const result = language
                ? hljs.highlight(codeText, { language }).value
                : hljs.highlightAuto(codeText).value

              const highlightedDom = parse(result)

              return (
                <pre className={`stack language-${language || 'plaintext'}`}>
                  <code className="hljs">{highlightedDom}</code>
                </pre>
              )
            }
          }
        }
      }

      return undefined
    },
  })

  return <>{contentReact}</>
}

export default ConvertBody
