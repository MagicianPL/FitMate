import { Oval } from 'react-loader-spinner';

import styles from './PrimaryButton.module.css';

export default function PrimaryButton({ name, type, loading }) {
  return (
    <button type={type} className={styles.primaryButton} disabled={loading}>
      {!loading ?
        name :
        <Oval
          width={30}
          height={30}
          color="white" />}
    </button>
  )
}
