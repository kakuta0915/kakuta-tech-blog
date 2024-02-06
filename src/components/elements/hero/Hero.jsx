import styles from './Hero.module.css'

export default function Hero({ title, subtitle }) {
  return (
    <div className={styles.heroContainer}>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  )
}
