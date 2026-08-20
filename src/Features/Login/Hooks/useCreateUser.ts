import { GetStorageItem, SetStorageItem } from "../../../Utils/Storage.utils";
import useForm from "./useForm";

export default function useCreateUser() {

    const { values: newUser, HandleChange } = useForm({ name: "", role: "", password: "" })


    function HandleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault()
        console.log(newUser.name, newUser.password, newUser.role)
        const users = GetStorageItem("users", []);
        users.push(newUser);
        SetStorageItem("users", users);
    }

    return {
        HandleSubmit,
        HandleChange,
        newUser
    }

}