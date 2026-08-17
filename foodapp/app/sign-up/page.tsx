"use client";

import { useState } from "react";

import SignupPage from "./_components/email";
import PasswordPage from "./_components/password";

export default function Page() {
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = () => {
    console.log({
      email,
      password,
    });

    alert("Бүртгэл амжилттай үүслээ!");
  };

  return (
    <>
      {step === 1 ? (
        <SignupPage
          email={email}
          setEmail={setEmail}
          onNext={() => setStep(2)}
        />
      ) : (
        <PasswordPage
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          onBack={() => setStep(1)}
          onSubmit={handleSignup}
        />
      )}
    </>
  );
}