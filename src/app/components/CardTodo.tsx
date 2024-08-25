import { Card, CardHeader, CardBody } from "@nextui-org/react";
import Delete from "./icons/Delete";

type CardTodoProps = {
    title: string,
    description: string
    onPress: () => void
    onClickDelete: () => void
}

const CardTodo = ({ title, description, onPress, onClickDelete }: CardTodoProps) => {
    return (
        <div onClick={onPress} style={{ cursor: 'pointer' }}>
            <Card className="w-full min-h-32 ">
                <CardHeader className="absolute z-10 top-1 flex-col !items-start gap-2">
                    <div className="flex w-full items-center justify-between">
                        <p className="text-tiny text-black/60 uppercase font-bold">
                            {title}
                        </p>
                        <Delete onClick={(e) => {
                            e.stopPropagation();
                            onClickDelete();
                        }} />
                    </div>
                    <h4 className="text-black/60 font-medium text-tiny">
                        {description}
                    </h4>
                </CardHeader>
                <CardBody className="overflow-visible py-2 ">
                    <div className="w-60">

                    </div>
                </CardBody>
            </Card>
        </div>
    )
}

export default CardTodo;