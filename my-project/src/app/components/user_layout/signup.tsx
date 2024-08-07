import React, { useState } from "react";
import axios from "axios";
import { Button, Input } from "@nextui-org/react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import Link from "next/link";

const SignupLayout: React.FC = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);
  const toggleConfirmPasswordVisibility = () =>
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      //window.alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/signup", {
        username: userName,
        email,
        password,
      });

      console.log("Sign up successful:", response.data);
      window.alert(response.data.message || "Sign up successful");
      window.location.href = "/login";
      setUserName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Sign up error:", error);
      window.alert("An error occurred during sign up. Please try again.");
    }
  };

  return (
    <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
      <div className="mb-8">
        <h2 className="text-center font-bold">Welcome to Lovebirds</h2>
      </div>
      <div className="mb-4">
        <Input
          type="text"
          label="User Name"
          placeholder="Enter your Name"
          variant="underlined"
          className="max-w-xs mx-auto"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <Input
          type="email"
          label="Email"
          placeholder="Enter your email"
          variant="underlined"
          className="max-w-xs mx-auto"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <Input
          label="Password"
          variant="underlined"
          placeholder="Enter your password"
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={togglePasswordVisibility}
              aria-label="toggle password visibility"
            >
              {isPasswordVisible ? (
                <IoEyeOutline className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <IoEyeOffOutline className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isPasswordVisible ? "text" : "password"}
          className="max-w-xs mx-auto"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <Input
          label="Confirm Password"
          variant="underlined"
          placeholder="Enter your confirm password"
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              aria-label="toggle confirm password visibility"
            >
              {isConfirmPasswordVisible ? (
                <IoEyeOutline className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <IoEyeOffOutline className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isConfirmPasswordVisible ? "text" : "password"}
          className="max-w-xs mx-auto"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div className="mb-4 flex items-center justify-center">
        <Button color="primary" size="md" onClick={handleSignUp}>
          Sign Up
        </Button>
      </div>

      <div className="text-center">
        <p>
          Already Have Account&#63;&#32;
          <Link href="/login" className="text-sky-600 underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupLayout;
