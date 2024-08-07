import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleResetPassword = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await axios.post(
        "http://localhost:8000/api/forgot-password",
        { email }
      );

      // Assuming the token is in the response data
      const token = response.data.token;
      localStorage.setItem("forgottoken", token);
      const successMsg =
        response.data.message ||
        "Password reset link has been sent to your email.";
      setSuccessMessage(successMsg);
      ////window.alert(successMsg);

      window.location.href = "/reset_password";

      setEmail("");
    } catch (error) {
      const errorMsg = "Email Not found";
      setErrorMessage(errorMsg);
      //window.alert(errorMsg);
    }
  };

  return (
    <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
      <div className="mb-8">
        <h2 className="text-center font-bold">
          Please Enter your Registered Email Id
        </h2>
      </div>
      {errorMessage && (
        <p className="text-red-500 text-center mb-4">{errorMessage}</p>
      )}
      {successMessage && (
        <p className="text-green-500 text-center mb-4">{successMessage}</p>
      )}
      <div className="mb-4">
        <Input
          type="email"
          label="Email"
          placeholder="Enter your Registered Email Id"
          variant="underlined"
          className="max-w-xs mx-auto"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-4 flex items-center justify-center">
        <Button color="primary" size="md" onClick={handleResetPassword}>
          Reset Password
        </Button>
      </div>
      <div className="text-center">
        <p className="font">
          Back to Login &#63;&#32;
          <Link href="/login" className="text-sky-600 underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
