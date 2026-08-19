import { useState, type ChangeEvent } from "react";
import Button from "../../../Components/Ui/Button";
import Input from "../../../Components/Ui/Input";

interface props {
    name: string,
    password: string
    role?: any
}

export default function CreateNewUser() {


    const [user, setUser] = useState<props>({
        name: "",
        password: "",
        role: "USER"

    })


    function HandleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target

        setUser((prev) => ({ ...prev, [name]: value }))

    }

    function HandleSubmit() {

        const users = JSON.parse(
            localStorage.getItem("users") || "[]"
        );
        console.log("Usuarios local storage",users)

        users.push(user);
        

        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );
    }




    return (
        <div>
            <form action={HandleSubmit}>
                <Input value={user.name} name="name" onChange={HandleChange} />
                <Input value={user.password} name="password" onChange={HandleChange} />
                <select name="role" onChange={HandleChange}>
                    <option value="SUPER_ADMIN">Super Admin</option>
                    <option value="ADMIN">Admin</option>
                    <option value="USER">User</option>
                </select>
                <Button typeBtn="submit" labelBtn="Crear usuario" />



            </form>

        </div>
    )
}