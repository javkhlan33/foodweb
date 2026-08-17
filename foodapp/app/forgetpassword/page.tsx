"use client";

import { useState } from "react";

import Email from "./_components/email";
import Verify from "./_components/verify";
import NewPassword from "./_components/new-password";
import { useRouter } from "next/navigation";

export default function ForgetPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResend = () => {
    alert("Verification email sent.");
  };

  const handleResetPassword = () => {
    alert("Нууц үг амжилттай шинэчлэгдлээ.");
    router.push("/login");
  };

  return (
    <>
      {step === 1 && (
        <Email email={email} setEmail={setEmail} onNext={() => setStep(2)} />
      )}

      {step === 2 && (
        <Verify
          email={email}
          onBack={() => setStep(1)}
          onNext={() => setStep(3)}
        />
      )}

      {step === 3 && (
        <NewPassword
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          onBack={() => setStep(2)}
          onSubmit={handleResetPassword}
        />
      )}
    </>
  );
}
