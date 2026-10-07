import { useState } from "react";
import { GetStorageItem } from "../../../Utils/Storage.utils";
import { createCategory, getCategories } from "../Services/category.service";
import type { CategoryTypes, Category } from "../../Task/Types/types";
import type { CategorySchemaType } from "@repo/schemas";

interface UseCategoryProps {
  closeModal?: () => void;
  onCategoryCreated?: () => void;
  openToast?: () => void;
  reset?: () => void;
}

export default function useCategory({
  closeModal,
  onCategoryCreated,
  openToast,
  reset,
}: UseCategoryProps = {}) {
  const [categories, setCategories] = useState<CategoryTypes[]>([]);
  const [loadingList, setLoadingList] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  async function loadAllCategories() {
    setLoadingList(true);
    try {
      const data = await getCategories();
      if (Array.isArray(data)) {
        setCategories(data);
      } else if (data) {
        setCategories(data as any);
      }
    } catch (error) {
      console.log("Error al obtener categorías:", error);
    } finally {
      setLoadingList(false);
    }
  }

  async function GetAllCategories() {
    return loadAllCategories();
  }

  async function UpdateCategories() {
    const updatedCategories = GetStorageItem("category", []) as Category[];
    console.log("Categorías actualizadas:", updatedCategories);
    try {
      const freshCategories = await getCategories();
      setCategories(freshCategories || []);
    } catch (err) {
      console.log("Error al refrescar categorías", err);
    }
    closeModal?.();
  }

  async function onSubmitCategory(data: CategorySchemaType) {
    setIsSubmitting(true);
    try {
      const response = await createCategory(data);
      if (response) {
        openToast?.();
        reset?.();
        await loadAllCategories();
        onCategoryCreated?.();
      }
    } catch (error) {
      console.error("Error al crear categoría:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    categories,
    setCategories,
    loadingList,
    isSubmitting,
    loadAllCategories,
    GetAllCategories,
    UpdateCategories,
    onSubmitCategory,
  };
}
