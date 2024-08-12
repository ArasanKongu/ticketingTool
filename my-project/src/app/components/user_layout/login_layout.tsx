import React, { useState } from "react";
import { Button, Input, CircularProgress } from "@nextui-org/react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import Link from "next/link";
import axios from "axios";

export default function LoginLayout() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("http://localhost:8080/login", {
        email,
        password,
      });
      const { accessToken } = response.data.data;
      console.log("response", response);
      localStorage.setItem("token", accessToken);
      setSuccess("Login successful!");
      setError("");
      window.location.href = "/createTicket";
      setEmail("");
      setPassword("");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
      <div className="mb-8">
        <h2 className="text-center font-bold text-orange-800">
          Nexware Technologies
        </h2>
      </div>
      {loading && (
        <div className="flex justify-center mb-4">
          <CircularProgress color="default" aria-label="Loading..." />
        </div>
      )}
      {error && <div className="mb-4 text-center text-red-500">{error}</div>}
      {success && (
        <div className="mb-4 text-center text-green-500">{success}</div>
      )}
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
              onClick={toggleVisibility}
              aria-label="toggle password visibility"
            >
              {isVisible ? (
                <IoEyeOutline className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <IoEyeOffOutline className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
          className="max-w-xs mx-auto"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="mb-4 flex items-center justify-center">
        <Button
          color="primary"
          size="md"
          onClick={handleLogin}
          disabled={loading}
        >
          Login
        </Button>
      </div>
      <div className="mb-4 text-center">
        <Link
          href="/forgot_password"
          className="text-sm text-sky-600 underline"
        >
          Forgot password?
        </Link>
      </div>
      <div className="text-center">
        <p>
          New to Lovebirds?
          <Link href="/signup" className="text-sky-600 underline">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}
