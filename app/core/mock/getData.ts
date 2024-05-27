import { fakeData } from "./fakeData";

function fetchData(
  query: string,
  page: number,
  size: number
): Promise<
  {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    gender: string;
  }[]
> {
  console.log("i recived query", query);
  const machList = fakeData
    .filter((item) => item.first_name.includes(query))
    .slice((page - 1) * size, page * size);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(machList);
    }, 2000);
  });
}
export { fetchData };
