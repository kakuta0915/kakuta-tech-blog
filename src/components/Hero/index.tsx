import React from 'react'
import Link from 'next/link'
import useScrollAnimation from '@/src/components/UseScrollAnimation'
import useScrollAnimationStyles from '@/src/components/UseScrollAnimation/index.module.css'
import styles from './index.module.css'

interface HeroProps {
  title: string
  title2?: string | false
  description: string
  imageSrc: string
  contact?: boolean
}

const Hero: React.FC<HeroProps> = ({
  title,
  title2 = false,
  description,
  imageSrc,
  contact = false,
}) => {
  useScrollAnimation([
    `.${useScrollAnimationStyles['fadeInUp']}`,
    `.${useScrollAnimationStyles['fadeInRight']}`,
    `.${useScrollAnimationStyles['fadeInLeft']}`,
  ])

  return (
    <div
      className={styles['heroContainer']}
      style={{ backgroundImage: `url(${imageSrc})` }}
    >
      <div className={styles['heroText']}>
        <h1 className={useScrollAnimationStyles['fadeInLeft']}>{title}</h1>
        {title2 && (
          <h1 className={useScrollAnimationStyles['fadeInLeft']}>{title2}</h1>
        )}
        <p className={useScrollAnimationStyles['fadeInLeft']}>{description}</p>
        <div className={useScrollAnimationStyles['fadeInUp']}>
          {contact && (
            <Link href="/contact/" className={styles['heroContact']}>
              Contact
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Hero
