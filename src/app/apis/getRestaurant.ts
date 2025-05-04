export interface Restaurant {
  name: string;
  address: string;
  category_name: string;
}

export const getRestaurant = async (): Promise<Restaurant> => {
    const res = await fetch("http://localhost:8000/recommend?lat=37.4963538&lng=126.9572222");
    const data = await res.json();
    return data;
  };