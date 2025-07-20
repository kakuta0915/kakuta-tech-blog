import { ReactNode } from 'react'

const MockLink = ({
  href,
  children,
}: {
  href: string
  children: ReactNode
}) => {
  return <a href={href}>{children}</a>
}

export default MockLink
