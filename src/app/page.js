import Image from 'next/image';
import Navigation from '../../components/Navigation/Navigation';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <>
    <Navigation />
    <div className={styles.homepageContainer}>
      <div className={styles.imageNdesc}>
        <div className={styles.imageContainer}>
          { <Image
            src='/images/homepageBackground.jpg'
            width={0}
            height={0}
            className={styles.image}
            alt="background image"
            quality={100}
            unoptimized
            priority
  /> }
        </div>
        <div className={styles.descriptionContainer}>
        <p className={styles.description}>Razem z <span>Fit</span><span>Mate</span> osiągniesz swój cel!</p>
        </div>
      </div>
    </div>
    </>
  )
}
