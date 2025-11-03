'use client'

import React from 'react'
import Image from 'next/image'
import parse, { DOMNode } from 'html-react-parser'
import Prism from 'prismjs'
import CodeBlock from '../CodeBlock'
import { ConvertBodyProps } from './types'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-css'

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
          return (
            <Image
              src={src}
              alt={alt || ''}
              width={width ? parseInt(width, 10) : 800}
              height={height ? parseInt(height, 10) : 450}
              sizes="(min-width: 768px) 768px, 100vw"
              style={{ height: 'auto', width: '100%' }}
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

              const prismLanguage = language && Prism.languages[language]
              const highlightedHtml = prismLanguage
                ? Prism.highlight(codeText, prismLanguage, language)
                : Prism.util.encode(codeText)

              return (
                <CodeBlock
                  code={highlightedHtml as unknown as string}
                  rawCode={codeText}
                  language={language}
                />
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
