import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../Services/category.service";
import type { CategoryTypes } from "../../Task/Types/types";
import { categoryKeys, CATEGORIES_QUERY_KEY } from "../Constants/categoryKeys";

export { CATEGORIES_QUERY_KEY };

export default function useCategory(_?: any) {
  const {
    data: categories = [],
    isLoading: loadingList,
    error,
    refetch,
  } = useQuery<CategoryTypes[]>({
    queryKey: categoryKeys.all,
    queryFn: getCategories,
  });

  return {
    categories,
    loadingList,
    error,
    refetch,
    GetAllCategories: refetch,
    UpdateCategories: refetch,
  };
}
