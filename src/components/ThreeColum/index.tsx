import React from 'react'
import { ReactNode } from 'react'
import styles from './index.module.css'

type ThreeColumProps = {
  children: ReactNode
}

export const ThreeColum: React.FC<ThreeColumProps> = ({ children }) => {
  return <div className={styles['flexContainer']}>{children}</div>
}

export const ThreeColumMain: React.FC<ThreeColumProps> = ({ children }) => {
  return <div className={styles['main']}>{children}</div>
}

export const ThreeColumSidebar: React.FC<ThreeColumProps> = ({ children }) => {
  return <div className={styles['sidebar']}>{children}</div>
}

export const ThreeColumSocialActions: React.FC<ThreeColumProps> = ({
  children,
}) => {
  return <div className={styles['socialActions']}>{children}</div>
}
