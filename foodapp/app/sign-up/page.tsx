"use client";

import { useState } from "react";

import SignupPage from "./_components/email";
import PasswordPage from "./_components/password";
import { API_URL, saveAuth } from "@/lib/auth";

export default function Page() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signupError, setSignupError] = useState("");

  const handleSignup = async () => {
    setSignupError("");

    try {
      const response = await fetch(`${API_URL}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setSignupError(data.message || "Бүртгэл амжилтгүй боллоо");
        return false;
      }

      if (!data.token) {
        setSignupError("Token ирсэнгүй. Дахин оролдоно уу.");
        return false;
      }

      saveAuth(data.token, data.user || {}, email);
      window.location.href = "/";
      return true;
    } catch (error) {
      console.error(error);
      setSignupError("Бүртгэл хийхэд алдаа гарлаа");
      return false;
    }
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
          signupError={signupError}
        />
      )}
    </>
  );
}
