import React, { useState } from "react";
import axios from "axios";
import { Button, Input } from "@nextui-org/react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

export default function ResetPassword() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);
  const toggleConfirmPasswordVisibility = () =>
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      window.alert("Passwords do not match");
      return;
    }

    // Retrieve token from local storage
    const token = localStorage.getItem("forgottoken");

    if (!token) {
      window.alert(
        "No reset token found. Please request a new password reset."
      );
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/reset-password",
        {
          token,
          newPassword,
        }
      );

      window.alert("Password has been reset successfully.");

      setNewPassword("");
      setConfirmPassword("");
      window.location.href = "/login";
    } catch (error) {
      const errorMessage = "Invalid or expired token";
      window.alert(errorMessage);
    }
  };

  return (
    <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
      <div className="mb-8">
        <h2 className="text-center font-bold">Reset Your Password</h2>
      </div>
      <div className="mb-6">
        <Input
          label="New Password"
          variant="underlined"
          placeholder="Enter your New password"
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
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <Input
          label="Confirm New Password"
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
        <Button color="primary" size="md" onClick={handleResetPassword}>
          Set New Password
        </Button>
      </div>
    </div>
  );
}
