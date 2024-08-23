import { Input } from "@nextui-org/input";
import { Button, Link } from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";

export default function Login() {

    return (
        <div className="min-h-screen flex justify-center">

            <div className="flex w-2/6 bg-blue-200 min-h-screen justify-center">
                <div className="flex flex-col items-center justify-items-center justify-center  w-4/6 gap-4">
                    <Avatar className="self-center" name="TODO" size="lg" />
                    <div className="flex flex-col w-full gap-2">

                        <Input label="Username" placeholder="Enter your username" />
                        <Input type="password" label="Password" placeholder="Enter your password" />
                    </div>

                    <Button className="w-3/6" color="primary">
                        Login
                    </Button>
                    <Link className="" href="/register" size="sm">
                        Register
                    </Link>

                </div>
            </div>

        </div>
    )
};