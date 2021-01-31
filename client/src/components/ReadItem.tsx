import React from "react";
import { Operation } from "../types/Operation";
import { Item } from "@api/types/Item";

export const ReadItem: React.FC<{
  item: Item;
  operation: Operation;
  setOperation: React.Dispatch<React.SetStateAction<Operation>>;
}> = ({ item, operation, setOperation }) => {
  const handleEditClick = () => setOperation(Operation.Edit);

  return (
    <div>
      <hr />
      <div>ID: {item.id}</div>
      <div>Name: {item.name}</div>
      <button onClick={handleEditClick}>Edit</button>
    </div>
  );
};
