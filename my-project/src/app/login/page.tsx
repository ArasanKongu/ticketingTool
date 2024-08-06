"use client";
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Input } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import { EyeFilledIcon } from "./EyeFilledIcon";
import RootLayout from "../layout";

export default function Login() {
    const [isVisible, setIsVisible] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [value, setValue] = React.useState('');
    const [passwordvalidation, setPasswordvalidation] = React.useState('');
    const toggleVisibility = () => setIsVisible(!isVisible);

    const validateEmail = (value: any) =>
        value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

    const isInvalid = React.useMemo(() => {
        if (value === "") return false;

        return validateEmail(value) ? false : true;
    }, [value]);

    const validatePassword = (passwordvalidation: any) =>
        passwordvalidation.match(
            /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        );

    const isNotValid = React.useMemo(() => {
        if (passwordvalidation === "") return false;

        return validatePassword(passwordvalidation) ? false : true;
    }, [passwordvalidation]);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const res = await fetch("http://localhost:8080/auth/login", {
            method: "POST",
            body: JSON.stringify({
                username,
                password,
            }),

            headers: {
                "Content-Type": "application/json",
            },
        });

        if (res.status === 401) {
            alert("Invaild credentials");
            console.log("Invalid credentials");
            return;
        }

        const user = await res.json();
        const accessToken = user.accessToken;
        console.log("token:", accessToken)

        if (!accessToken) {
            console.error("Access token not found in response");
            return;
        }

        localStorage.setItem("accessToken", accessToken);
        alert("Login Successfuly");
        window.location.href = "/dashboard";
        console.log("Log in :", user);
    }
    return (
        <RootLayout showSidebarAndNavbar={false}>
            <div className="flex h-screen w-screen items-center justify-center p-5">
                <Card className="flex min-w-96 max-w-[400px]">
                    <CardHeader className="flex text-3xl font-semibold justify-center">
                        Log In
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <form onSubmit={handleLogin}>
                            <Input
                                className="pb-5"
                                id="email"
                                type="email"
                                label="UserName"
                                labelPlacement="outside"
                                placeholder="Enter your UserName"
                                value={username}
                                isInvalid={isInvalid}
                                errorMessage={isInvalid && "Please enter a valid email"}
                                onValueChange={setValue}
                                onChange={(e) => setUsername(e.target.value)} />
                            <Input
                                className="pb-5"
                                id="password"
                                type={isVisible ? "text" : "password"}
                                label="Password"
                                labelPlacement="outside"
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                isInvalid={isNotValid}
                                errorMessage={
                                    isNotValid && "Password must be at least 8 characters "
                                }
                                onValueChange={setPasswordvalidation}
                                endContent={
                                    <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                                        {isVisible ? (
                                            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                        ) : (
                                            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                        )}
                                    </button>
                                } />
                            <div className="flex justify-center">
                                <Button
                                    variant="solid"
                                    type="submit"
                                    color="primary"
                                    className="items-center text-lg">Log In</Button>
                            </div>
                        </form>
                    </CardBody>
                    <Divider />
                    <CardFooter className="place-content-center">
                        <Link href="#">Forgot Password?</Link>
                    </CardFooter>
                </Card>
            </div>
        </RootLayout>

    )
}