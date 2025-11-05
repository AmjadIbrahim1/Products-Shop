interface Product {
  title: string;
  price: string;
  description: string;
  image: string;
}

export default function isValid({ title, description, image, price }: Product) {
  const errors = { title: "", description: "", image: "", price: "" };
  let ok = true;

  if (title.length < 5 || title.length > 80) {
    errors.title = "Title must be between 10 and 80 characters.";
    ok = false;
  }

  if (description.length < 10 || description.length > 900) {
    errors.description = "Description must be between 10 and 900 characters.";
    ok = false;
  }

  const imageRegex = /^(https?:\/\/.*\.(png|jpg|jpeg|gif|webp|svg))$/i;
  if (!imageRegex.test(image)) {
    errors.image = "Invalid image URL.";
    ok = false;
  }

  if (isNaN(Number(price)) || Number(price) <= 0) {
    errors.price = "Price must be a positive number.";
    ok = false;
  }

  return { ok, errors };
}
