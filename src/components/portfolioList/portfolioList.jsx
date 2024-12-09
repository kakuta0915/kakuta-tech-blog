import Link from 'next/link'
import Image from 'next/image'
import styles from './portfolioList.module.css'

const PortfolioList = ({ className, portfolioData }) => {
  return (
    <div className={`${className} ${styles.grid}`}>
      {portfolioData.map((portfolio) => (
        <Link
          className={styles.portfolioItem}
          href={portfolio.link}
          key={portfolio.id}
        >
          <Image
            src={portfolio.imageUrl}
            alt={portfolio.title}
            layout="responsive"
            width={400}
            height={300}
          />
          <div className={styles.portfolioDetails}>
            <h3>{portfolio.title}</h3>
            <p>{portfolio.description}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default PortfolioList
