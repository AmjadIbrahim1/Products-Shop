export interface ProductFormValues {
  title: string;
  price: string;
  description: string;
  image: string;
  colors?: string[]; 
  category?: string;
}

export interface ValidationResult {
  ok: boolean;
  errors: {
    title: string;
    description: string;
    image: string;
    price: string;
  };
}
const isImageLink = (str: string) => {
  if (!str) return false;

  if (str.startsWith("data:image/")) return true;

  if (!isNaN(Number(str))) return false;

  if (!str.includes(".")) return false;

  if (str.length < 8) return false;

  return true;
};

export default function isValid(values: ProductFormValues): ValidationResult {
  const errors = { title: "", description: "", image: "", price: "" };
  let ok = true;

  if (!values.title || values.title.length < 5 || values.title.length > 15) {
    errors.title = "Title must be between 5 and 15 characters.";
    ok = false;
  }

  if (
    !values.description ||
    values.description.length < 10 ||
    values.description.length > 900
  ) {
    errors.description = "Description must be between 10 and 900 characters.";
    ok = false;
  }

  if (!isImageLink(values.image)) {
    errors.image = "Invalid image link.";
    ok = false;
  }

  if (isNaN(Number(values.price)) || Number(values.price) <= 0) {
    errors.price = "Price must be a positive number.";
    ok = false;
  }

  return { ok, errors };
}
