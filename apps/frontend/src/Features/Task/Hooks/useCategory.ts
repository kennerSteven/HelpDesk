import { GetStorageItem } from "../../../Utils/Storage.utils";
import { getCategories } from "../Services/category.service";
import type { CategoryTypes, Category } from "../Types/types"
import { useState } from "react";


interface props {
    closeModal: () => void
}


export default function useCategory({ closeModal }: props) {
    const [categories, setCategories] = useState<CategoryTypes[]>([]);

    async function GetAllCategories() {
        try {
            const get = await getCategories();
            setCategories(get || []);
        } catch (error) {
            console.log("Error al obtener categorias", error);
        }
    }

    async function UpdateCategories() {
        const updatedCategories = GetStorageItem(
            "category",
            [],
        ) as Category[];
        console.log("Categorías actualizadas:", updatedCategories);
        try {
            const freshCategories = await getCategories();
            setCategories(freshCategories || []);
        } catch (err) {
            console.log("Error al refrescar categorías", err);
        }
        closeModal()
    }

    return {
        GetAllCategories, categories, setCategories, UpdateCategories
    }

}