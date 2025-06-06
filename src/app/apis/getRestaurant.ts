export interface Restaurant {
  name: string;
  address: string;
  category_name: string;
  place: string;
  x: number;
  y: number;
}

export const getRestaurant = async (
  category_name?: string
): Promise<Restaurant> => {
  let url = "http://localhost:8000/recommend?lat=37.4963538&lng=126.9572222";
  if (category_name) {
    url += `&category=${category_name}`;
  }
  const res = await fetch(url);
  const data = await res.json();
  return data;
};