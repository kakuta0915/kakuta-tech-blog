// Worklist.jsx

import Link from 'next/link'
import Image from 'next/image'
import styles from './Worklist.module.css'

const Worklist = ({ worksData }) => {
  return (
    <div className={styles.grid}>
      {worksData.map((work) => (
        <Link className={styles.workItem} href={work.link} key={work.id}>
          <Image
            src={work.imageUrl}
            alt={work.title}
            layout="responsive"
            width={400}
            height={300}
          />
          <div className={styles.workDetails}>
            <h3>{work.title}</h3>
            <p>{work.description}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Worklist
