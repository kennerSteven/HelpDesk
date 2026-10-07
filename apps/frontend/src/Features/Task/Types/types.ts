export interface Category {
  nameCategory: string;
  descriptionCategory: string;
}

export interface CategoryTypes {
  _id: string;
  nameCategory: string;
  descriptionCategory?: string;
}

export interface CreateTaskProps {
  onSuccess?: () => void;

  className?: string;
  showButtons?: boolean;
}
