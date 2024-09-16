export const getFormData = (form) => {
  const data = new FormData(form);
  const obj = {};
  for (const [key, value] of data.entries()) obj[key] = value;

  return obj;
};

export const collectItem = (array, item) => {
  const result = [];
  for (const obj of array) {
    result.push(obj[item]);
  }
  return Array.from(new Set(result));
};

export function validation(obj) {
  console.log(obj);
  const errors = {
    imageUrl: "gul rasmini yuklang",
    name: "Gul nomini kiriting",
    price: "Gul narxini kiriting",
    summary: "Gulga izoh kiritilishi kerek",
    smell: "Gul hidini kiriting",
    category: "Gul uchun turkum tanlang",
    country: "hududni tanlang",
    lifetime: "gul yashash davrini kiriting",
    color: "Gul uchun rang tanlang",
  };
  let checker = false;
  let errorMessage = "";
  for (const key in obj) {
    if (obj[key].trim() === "") {
      checker = true;
      errorMessage = errors[key];
    }
  }

  return { checker, errorMessage };
}

export const BASE_URL = "https://json-api.uz/api/project/gul-nomlari";
export const allowImageSize = 5_242_880;
export const summaryLimit = 5;
export const limit = 7;
