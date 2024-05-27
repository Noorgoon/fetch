import { fakeData } from "./fakeData";

function fetchDataPageCount(query: string): Promise<number> {
  console.log("i recived query", query);

  return new Promise((resolve) => {
    setTimeout(() => {
      const total = fakeData.filter((item) =>
        item.first_name.includes(query)
      ).length;
      resolve(total);
    }, 2000);
  });
}
export { fetchDataPageCount };
