"use client";
import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link, Textarea } from "@nextui-org/react";
import { createTodo, patchTodo, Todo, TodoCreate } from "@/service/todo";
import * as Yup from 'yup';
import { Formik } from "formik";

interface ModalCreateTodoProps {
    isOpen: boolean,
    onOpen: () => void,
    onOpenChange: () => void,
    onClose: () => void,
    fetchTodos: () => Promise<void>,
    isCreate: boolean,
    data?: Todo
}

const ModalCreateTodo = ({ isOpen, onOpen, onOpenChange, isCreate, onClose, fetchTodos, data }: ModalCreateTodoProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const validationSchema = Yup.object({
        title: Yup.string()
            .required('title is required'),
        description: Yup.string()
    });


    return (
        <>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement='center'
            >
                <Formik
                    initialValues={{
                        title: data?.title ?? '',
                        description: data?.description ?? '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (values) => {
                        try {
                            setIsLoading(true);
                            if (isCreate) {
                                await createTodo(values);
                            } else {
                                const patchData: TodoCreate = { title: values.title, description: values.description }
                                await patchTodo(data!.id, patchData)
                            }
                            onClose();
                            fetchTodos();
                        } catch (error: any) {
                            alert(error.message);
                        } finally {
                            setIsLoading(false);
                        }
                    }}
                    validateOnChange={false}>
                    {
                        ({ handleSubmit, values, errors, handleChange }) => (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                                <ModalContent>

                                    <ModalHeader className="flex flex-col gap-1">
                                        {isCreate ? 'Create Todo' : 'Edit Todo'}
                                    </ModalHeader>
                                    <ModalBody>
                                        <Input
                                            label="Title"
                                            isInvalid={Boolean(errors.title)}
                                            errorMessage={errors.title}
                                            name="title"
                                            onChange={handleChange}
                                            value={values.title}
                                            variant="bordered"
                                            placeholder="Enter your title" />

                                        <Textarea
                                            label="Description"
                                            isInvalid={Boolean(errors.description)}
                                            errorMessage={errors.description}
                                            onChange={handleChange}
                                            value={values.description}
                                            name="description"
                                            placeholder="Enter your description"
                                            variant="bordered"
                                        />
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="danger" variant="flat" onPress={onClose}>
                                            Close
                                        </Button>
                                        <Button isLoading={isLoading} type="submit" color="primary">
                                            {isCreate ? 'Create' : 'Edit'}
                                        </Button>
                                    </ModalFooter>
                                </ModalContent>
                            </form>
                        )}
                </Formik>
            </Modal >
        </>
    );
}

export default ModalCreateTodo;