/* eslint-disable @next/next/no-img-element */
import React from 'react'

const MockImage = (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
  return <img alt="モック画像" {...props} />
}

export default MockImage
