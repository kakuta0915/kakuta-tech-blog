/* eslint-disable @next/next/no-img-element */
import React from 'react'

const MockParser = (html: string): React.ReactNode => {
  if (html.includes('<img')) {
    return <img src="/image.jpg" alt="Example image" width={600} height={400} />
  }
  if (html.includes('<code')) {
    return (
      <code className="hljs">
        <span className="hljs-keyword">const</span>
      </code>
    )
  }
  if (html.includes('<p')) {
    return <p>This is a paragraph.</p>
  }
  return html
}

export default MockParser
