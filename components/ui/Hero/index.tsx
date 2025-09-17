import React from 'react'
import styles from './index.module.css'
import { HeroProps } from '@/types'

const Hero: React.FC<HeroProps> = ({
  title,
  title2 = false,
  description,
  imageSrc,
}) => {
  return (
    <div
      className={styles['heroContainer']}
      style={{ backgroundImage: `url(${imageSrc})` }}
    >
      <div className={styles['heroText']}>
        <h1>{title}</h1>
        {title2 && <h1>{title2}</h1>}
        <p>{description}</p>
      </div>
    </div>
  )
}

export default Hero
