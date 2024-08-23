"use client";
import { createUser } from "@/service/auth";
import { Input } from "@nextui-org/input";
import { Button, Link } from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";
import { Formik, useFormik } from "formik";
import * as Yup from 'yup';

export default function Register() {
    const validationSchema = Yup.object({
        username: Yup.string()
            .required('Username is required'),
        password: Yup.string()
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
            .required('Confirm Password is required'),
    });

    return (
        <div className="min-h-screen flex justify-center">

            <div className="flex w-2/6 bg-blue-200 min-h-screen justify-center">
                <div className="flex flex-col items-center justify-items-center justify-center  w-4/6 gap-4">
                    Register

                    <Formik
                        initialValues={{
                            username: '',
                            password: '',
                            confirmPassword: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={async (values) => {
                            await createUser(values)
                        }}
                        validateOnChange={false}>
                        {
                            ({ values, handleSubmit, errors, touched, handleChange }) => (
                                <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center justify-items-center justify-center">
                                    <div className="flex flex-col w-full gap-4">

                                        <Input label="Username" isInvalid={Boolean(errors.username)} errorMessage={errors.username} name="username" onChange={handleChange} value={values.username} placeholder="Enter your username" />
                                        <Input type="password" isInvalid={Boolean(errors.password)} errorMessage={errors.password} name="password" onChange={handleChange} value={values.password} label="Password" placeholder="Enter your password" />
                                        <Input type="password" isInvalid={Boolean(errors.confirmPassword)} errorMessage={errors.confirmPassword} name="confirmPassword" onChange={handleChange} value={values.confirmPassword} label="Confirm Password" placeholder="Enter your password" />
                                    </div>

                                    <Button type="submit" className="w-3/6" color="primary">
                                        Register
                                    </Button>
                                </form>
                            )
                        }
                    </Formik>



                </div>
            </div>

        </div>
    )
};