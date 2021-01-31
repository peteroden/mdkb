import React, { useState, FormEventHandler } from "react";
import { useHistory } from "react-router-dom";
import { Operation } from "../types/Operation";
import { create, deleteById } from "../types/CrudsApi";
import { Item } from "@api/types/Item";

export const EditItem: React.FC<{
  item: Item;
  operation: Operation;
  setOperation: React.Dispatch<React.SetStateAction<Operation>>;
}> = ({ item, operation, setOperation }) => {
  const [editedItem, setEditedItem] = useState<Item>(item);
  const history = useHistory();
  const handleChange = <K extends keyof Item>(key: K, value: Item[K]) => {
    setEditedItem({
      ...editedItem,
      [key]: value,
    });
  };

  const handleCancelClick = () => setOperation(Operation.Read);
  const handleDeleteClick = async () => await deleteById(item.id);

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();
    await create(editedItem);
    alert("Submitted Profile Update form!");
    history.push({ pathname: `/item/${editedItem.id}`});
    setOperation(Operation.Read);
  };

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <header>
        <h3>Item</h3>
      </header>
      <label>
        ID:
        <input
          disabled={operation !== Operation.Create}
          type="text"
          value={editedItem.id}
          onChange={(event) => handleChange("id", event.target.value)}
        />
      </label>
      <label>
        Name:
        <input
          type="text"
          value={editedItem.name}
          onChange={(event) => handleChange("name", event.target.value)}
        />
      </label>
      <button type="submit">Save</button>
      <button type="button" onClick={handleDeleteClick}>
        Delete
      </button>
      <button type="button" onClick={handleCancelClick}>
        Cancel
      </button>
    </form>
  );
};
