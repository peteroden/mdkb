import { IItem } from "@api/types/IItem";

export const create = async function <T extends IItem>(
  item: T
): Promise<T | Error> {
    //const emptyItem: T = {id:'' } as T;
    const response = await fetch(
    `/api/item/${item.id}`,
    {
      method: "POST",
      body: JSON.stringify(item),
    }
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const responseData: T = await response.json();
  return responseData;
};

export const read = async function <T extends IItem>(
  id: string
): Promise<T | Error> {
  //const emptyItem: T = {id:''} as T;

  const response = await fetch(`/api/item/${id}`);
  const responseJson: T = await response.json();
  return responseJson;
};

export const update = async function <T extends IItem>(
  item: T
): Promise<T | Error> {
  const response = await fetch(`/api/item/${item.id}`, {
    method: "PATCH",
    body: JSON.stringify(item),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const responseData: T = await response.json();
  return responseData;
};

export const deleteById = async function (id: string): Promise<String | Error> {
  const response = await fetch(`/api/item/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const responseJson = await response.json();
  return responseJson.id;
};

export const search = async (query: string): Promise<any | Error> => {
  const response = await fetch("/api/search?api-version=2020-06-30", {
    method: "POST",
    body: JSON.stringify({ search: query }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const responseJson = await response.json();
  return responseJson.value;
};
