import { Todo } from "@/service/todo";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link, Textarea } from "@nextui-org/react";

interface ModalConfirmDeleteTodoProps {
    isOpen: boolean,
    onOpen: () => void,
    onOpenChange: () => void,
    onClose: () => void,
    data?: Todo,
    onConfirmDelete: (id: string) => Promise<void>,
}


const ModalConfirmDelete = ({ isOpen, onClose, onOpenChange, data, onConfirmDelete }: ModalConfirmDeleteTodoProps) => {

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                onOpenChange={onOpenChange}
            >
                <ModalContent>

                    <ModalHeader className="flex flex-col gap-1">Are you sure for delete &quot;{data?.title}&quot;</ModalHeader>
                    <ModalFooter>
                        <Button color="danger" onPress={onClose}>
                            Close
                        </Button>
                        <Button color="primary" onPress={() => onConfirmDelete(data!.id)}>
                            Delete
                        </Button>
                    </ModalFooter>

                </ModalContent>
            </Modal>
        </>
    )
};

export default ModalConfirmDelete;