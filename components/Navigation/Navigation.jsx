import Link from 'next/link';

import styles from './Navigation.module.css';

const Navigation = ({ withoutAnimation }) => {
  return (
    <nav className={styles.navContainer}>
    <ul className={styles.nav}>
        <li className={styles.navItem}><Link href="/signin" prefetch={false}>Zaloguj</Link></li>
        <li className={`${styles.navItem}`}><Link href="/signup" prefetch={false}>Rejestracja</Link></li>
    </ul>
    <p><span className={!withoutAnimation ? styles.firstAppear : undefined}>Tam,</span><span className={!withoutAnimation ? styles.secondAppear : undefined}> gdzie nie ma walki,</span><span className={!withoutAnimation ? styles.thirdAppear : undefined}> nie ma siły...</span></p>
    </nav>
  )
}

export default Navigation;