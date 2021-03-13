import { API } from "../../backend";

export const getAllProducts = () => {
  return fetch(`${API}/products`, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));
};
