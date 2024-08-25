"use client";
import './index.css'
import { Button, Link, useDisclosure } from "@nextui-org/react";
import ModalCreateTodo from "../components/ModalCreateTodo";
import { useEffect, useState } from "react";
import { deleteTodo, getTodo, Todo } from "@/service/todo";
import CardTodo from "../components/CardTodo";
import ModalConfirmDelete from '../components/ModalConfirmDelete';
import { logOut } from '@/service/auth';
import { useRouter } from 'next/navigation'


export default function Information() {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const { isOpen: isOpenDelete, onOpen: onOpenDelete, onOpenChange: onOpenChangeDelete, onClose: onCloseDelete } = useDisclosure();
    const [isCreate, setIsCreate] = useState<boolean>(false);
    const [todoDatas, setTodoDatas] = useState<Todo[]>([]);
    const [todoData, setTodoData] = useState<Todo>();
    const router = useRouter();

    const onClickOpenModal = (isCreate: boolean, data?: Todo) => {
        if (!isCreate) {
            setTodoData(data);
        }
        setIsCreate(isCreate);
        onOpen();
    }

    const onClickDelete = (data?: Todo) => {
        onOpenDelete();
        setTodoData(data);
    }

    const fetchTodos = async () => {
        const data = await getTodo()
        if (data.isSuccess) {
            setTodoDatas(data.data);
        }

    }

    const onClickConfirmDelete = async (id: string) => {
        await deleteTodo(id)
        onCloseDelete();
        await fetchTodos();
    }

    const onLogout = async () => {
        await logOut();
        router.push('/login');
    }


    useEffect(() => {
        fetchTodos();
    }, [])

    return (
        <div className="min-h-screen flex justify-center">

            <div className="flex w-2/6 bg-blue-200 max-h-screen justify-center">
                <div className="flex flex-col items-center justify-around justify-items-center w-4/6 gap-4">
                    <div className="h-5/6">
                        {
                            todoDatas.length === 0 ?
                                <label>click &quot;Create Todo&quot; for add new todo</label>
                                :
                                <div className="max-h-full gap-3 flex flex-col overflow-y-auto hide-scrollbar">
                                    {
                                        todoDatas.map(data => (
                                            <CardTodo
                                                onClickDelete={() => onClickDelete(data)}
                                                onPress={() => onClickOpenModal(false, data)}
                                                key={data.id}
                                                title={data.title}
                                                description={data.description} />
                                        ))
                                    }
                                </div>
                        }

                    </div>
                    <div className='flex w-full gap-2 justify-center'>
                        <Button onPress={() => onClickOpenModal(true)} type='submit' className="w-3/6" color="primary">
                            Create Todo
                        </Button>
                        <Button onPress={() => onLogout()} type='submit' className="w-2/6" color="danger">
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
            <ModalConfirmDelete onConfirmDelete={onClickConfirmDelete} data={todoData} isOpen={isOpenDelete} onClose={onCloseDelete} onOpen={onOpenDelete} onOpenChange={onOpenChangeDelete} />
            <ModalCreateTodo data={todoData} fetchTodos={fetchTodos} isCreate={isCreate} isOpen={isOpen} onClose={onClose} onOpen={onOpen} onOpenChange={onOpenChange} />
        </div>
    )

};