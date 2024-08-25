"use client";
import { loginUser } from "@/service/auth";
import { Input } from "@nextui-org/input";
import { Button, Link } from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";
import { Formik } from "formik";
import * as Yup from 'yup';
import { useRouter } from 'next/navigation'
import { useState } from "react";

export default function Login() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>();
    const validationSchema = Yup.object({
        username: Yup.string()
            .required('Username is required'),
        password: Yup.string()
            .required('Password is required'),
    });

    return (
        <div className="min-h-screen flex justify-center">

            <div className="flex w-2/6 bg-blue-200 min-h-screen justify-center">
                <Formik
                    initialValues={{
                        username: '',
                        password: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (values) => {
                        try {
                            setIsLoading(true);
                            await loginUser(values)
                            router.push('/information')
                        } catch (error: any) {
                            alert(error.message);
                        } finally {
                            setIsLoading(false);
                        }
                    }}
                    validateOnChange={false}>
                    {
                        ({ handleSubmit, values, errors, handleChange }) => (
                            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-items-center justify-center  w-4/6 gap-4">
                                <Avatar className="self-center" name="TODO" size="lg" />
                                <div className="flex flex-col w-full gap-2">
                                    <Input label="Username" isInvalid={Boolean(errors.username)} errorMessage={errors.username} name="username" onChange={handleChange} value={values.username} placeholder="Enter your username" />
                                    <Input type="password" isInvalid={Boolean(errors.password)} errorMessage={errors.password} name="password" onChange={handleChange} value={values.password} label="Password" placeholder="Enter your password" />
                                </div>

                                <Button isLoading={isLoading} type='submit' className="w-3/6" color="primary">
                                    Login
                                </Button>
                                <Link className="" href="/register" size="sm">
                                    Register
                                </Link>
                            </form>
                        )
                    }
                </Formik>
            </div>

        </div>
    )
};