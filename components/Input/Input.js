import styles from './Input.module.css';

export default function Input({ label, labelFor, type, value, onChange, inputError }) {
  return (
    <div className='inputWrapper'>
    <label htmlFor={labelFor}>{label}</label>
    <input id={labelFor} type={type} value={value} onChange={onChange} />
    { <p className={styles.inputError}>{inputError}</p>}
    </div>
  )
}
