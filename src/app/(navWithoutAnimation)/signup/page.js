"use client"
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Input from "../../../../components/Input/Input";
import PrimaryButton from "../../../../components/PrimaryButton/PrimaryButton";

import { getRandomFunFact } from "@/funFacts";
import { validateSignUpForm } from "@/helpers/helpers";

import styles from './signUpPage.module.css';

export default function SignUpPage() {
  const router = useRouter();
  const initialInputErrors = {
    usernameError: "",
    emailError: "",
    passwordError: "",
    repeatedPasswordError: "",
  };

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    repeatedPassword: "",
  });
  const [funFact, setFunFact] = useState("");
  const [requestError, setRequestError] = useState("");
  console.log('requestError', requestError)
  const [inputErrors, setInputErrors] = useState(initialInputErrors);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (property, value) => {
    setUserData(prevState => {
      return {
        ...prevState,
        [property]: value,
      }
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setRequestError("");
    setInputErrors(initialInputErrors);

    console.log(userData);
    const formIsValid = validateSignUpForm(userData, setInputErrors);
    if (!formIsValid) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (!response.ok) {
        setRequestError(data.message);
        setLoading(false);
      } else {
        setLoading(false);
        console.log("User was successful created: ", data.user);
        //TODO navigate to login screen
        router.push("/signin?signup=success");
      }
    } catch (err) {
      console.log('err', err);
      setRequestError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    setFunFact(getRandomFunFact());
  }, [])

  return (
    <>
      <h1 className={styles.title}>Załóż konto</h1>
      <form className={styles.signUpForm} onSubmit={handleFormSubmit}>
        <div className={styles.inputsContainer}>
          <Input label="Imię / Nick" labelFor="nickname" type="text" value={userData.username} onChange={(e) => handleInputChange("username", e.target.value)} inputError={inputErrors.username} />
          <Input label="Adres e-mail" labelFor="email" type="email" value={userData.email} onChange={(e) => handleInputChange("email", e.target.value)} inputError={inputErrors.email} />
          <Input label="Hasło" labelFor="password" type="password" value={userData.password} onChange={(e) => handleInputChange("password", e.target.value)} inputError={inputErrors.password} />
          <Input label="Powtórz hasło" labelFor="repeatedPassword" type="password" value={userData.repeatedPassword} onChange={(e) => handleInputChange("repeatedPassword", e.target.value)} inputError={inputErrors.repeatedPassword} />
          {requestError && <p className="requestError">{requestError}</p>}
          <PrimaryButton type="submit" name="Wyślij" loading={loading} />
        </div>
        <p className={styles.funFact}>
          {funFact}
        </p>
      </form>
    </>
  )
}
