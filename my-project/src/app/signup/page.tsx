'use client';
import { Card, CardHeader, Divider, CardBody, Button, CardFooter, Input } from "@nextui-org/react";
import Link from "next/link";
import RootLayout from "../layout";
import { EyeFilledIcon } from "../login/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../login/EyeSlashFilledIcon";
import { useRef, useState } from "react";
import React from "react";

type FormInputs = {
    email_id: string;
    user_name: string;
    admin_code: string;
    password: string
}
export default function SignUp() {
    const [value, setValue] = React.useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [passwordvalidation, setPasswordvalidation] = React.useState('');
    const register = async () => {
        const res = await fetch('http://localhost:8080/user', {
            method: 'POST',
            body: JSON.stringify({
                user_name: data.current.user_name,
                admin_code: data.current.admin_code,
                email_id: data.current.email_id,
                password: data.current.password,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!res.ok) {
            alert(res.statusText);

            return;
        }

        const response = await res.json();
        alert("User Registered!");
        window.location.href = "/login";
    };
    const data = useRef<FormInputs>({
        user_name: "",
        admin_code: "",
        email_id: "",
        password: "",
    });

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

    const toggleVisibility = () => setIsVisible(!isVisible);
    return (
        <RootLayout showSidebarAndNavbar={false}>
            <div className="flex h-screen w-screen items-center justify-center p-5">
                <Card className="flex min-w-96 max-w-[400px]">
                    <CardHeader className="flex text-3xl font-semibold justify-center">
                        Sign Up
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <form onSubmit={register}>
                            <Input
                                label='User Name'
                                labelPlacement="outside"
                                placeholder="Enter User Name"
                                className="pb-4"
                                onChange={(e) => (data.current.user_name = e.target.value)} />
                            <Input
                                label='Admin Code'
                                labelPlacement="outside"
                                placeholder="Enter Admin Code"
                                className="pb-4"
                                onChange={(e) => (data.current.admin_code = e.target.value)} />
                            <Input
                                label='Email ID'
                                labelPlacement="outside"
                                placeholder="Enter Email ID"
                                className="pb-4"
                                isInvalid={isInvalid}
                                errorMessage={isInvalid && "Please enter a valid email"}
                                onValueChange={setValue}
                                onChange={(e) => (data.current.email_id = e.target.value)} />
                            <Input
                                label='Password'
                                labelPlacement="outside"
                                placeholder="Enter Password"
                                className="pb-4"
                                isInvalid={isNotValid}
                                errorMessage={
                                    isNotValid &&
                                    "Password must be at least 8 characters long with uppercase, numeric and special character"
                                }
                                onValueChange={setPasswordvalidation}
                                type={isVisible ? "text" : "password"}
                                onChange={(e) => (data.current.password = e.target.value)}
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
                                    className="items-center text-lg">Sign Up</Button>
                            </div>
                        </form>
                    </CardBody>
                    <Divider />
                    <CardFooter className="place-content-center">
                        <p>Already have an account. <Link href="/login">Click here</Link></p>
                    </CardFooter>
                </Card>
            </div>
        </RootLayout>
    )
}