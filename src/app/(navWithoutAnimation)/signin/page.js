'use client';
import { validateSignInForm } from '@/helpers/helpers';
import { useSearchParams } from 'next/navigation'
import { useState } from 'react';

import Input from '../../../../components/Input/Input';
import PrimaryButton from '../../../../components/PrimaryButton/PrimaryButton';

import styles from './signInPage.module.css'

export default function SignUpPage() {
  const searchParams = useSearchParams();
  const afterRegistration = searchParams.get('signup');

  const initialUserData = {
    email: "",
    password: "",
  };

  const initialInputErrors = {
    email: "",
    password: "",
  };

  const [userData, setUserData] = useState(initialUserData);
  const [inputErrors, setInputErrors] = useState(initialInputErrors);
  const [requestError, setRequestError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (property, value) => {
    setUserData(prevState => {
      return {
        ...prevState,
        [property]: value,
      }
    })
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setRequestError("");
    setInputErrors(initialInputErrors);

    const formIsValid = validateSignInForm(userData, setInputErrors);
    console.log('formIsValid', formIsValid)
    console.log('userData', userData)
    if (!formIsValid) {
      setLoading(false);
      return;
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      console.log('response', response);
      const data = await response.json();
      console.log('data', data)
      if (!response.ok) {
        setRequestError(data.message);
        setLoading(false);
      } else {
        setLoading(false);
        console.log("Signed in successfully!");
        console.log('data', data);
        //TODO navigate to another page
      }
    } catch (err) {
      console.log('err', err);
      setRequestError(err.message);
      setLoading(false);
    }
  };

  return (
    <>
      {afterRegistration && <p className={styles.successRegistration}>Rejestracja konta przebiegła pomyślnie, możesz się zalogować</p>}
      <h1 className={styles.title}>Zaloguj</h1>
      <form className={styles.signInForm} onSubmit={handleFormSubmit}>
        <Input label="Adres e-mail" labelFor="email" type="email" value={userData.email} onChange={(e) => handleInputChange("email", e.target.value)} inputError={inputErrors.email} />
        <Input label="Hasło" labelFor="password" type="password" value={userData.password} onChange={(e) => handleInputChange("password", e.target.value)} inputError={inputErrors.password} />
        {requestError && <p className="requestError">{requestError}</p>}
        <PrimaryButton type="submit" name="Zaloguj" loading={loading} />
      </form>
    </>
  )
}
