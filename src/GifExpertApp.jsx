import { useState } from "react";
import { AddCategory, GifGrid } from "./components";

export const GifExpertApp = () => {
  const [categories, setCategories] = useState(["One Punch"]);

  const onAddCategory = (newCategory) => {
    // categories.push(newCategory)
    // setcategories((prevCategories) => [...prevCategories, "Chainsaw Man"]); // Por medio del callback que también se le puede pasar a las funciones del useState

    if (categories.includes(newCategory)) return;
    setCategories([newCategory, ...categories]); // El spread operator crea una copia de las catego... que ya tenemos y así añadimos una nueva sin perder el resto
  };
  return (
    <>
      <h1>GifExpertApp</h1>

      <AddCategory
        // setCategories={setCategories}
        onNewCategory={onAddCategory}
      />

      {categories.map((category) => (
        <GifGrid key={category} category={category} />
      ))}
    </>
  );
};
