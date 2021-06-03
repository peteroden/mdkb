import React from "react";
import ReactMarkdown from "react-markdown"
import { Operation } from "../types/Operation";
import { KbItem } from "../types/KbItem";

export const ReadKbItem: React.FC<{
  kbItem: KbItem;
  operation: Operation;
  setOperation: React.Dispatch<React.SetStateAction<Operation>>;
}> = ({ kbItem, operation, setOperation }) => {
  const handleEditClick = () => setOperation(Operation.Edit);

  return (
    <div>
      <hr />
      <div>ID: {kbItem.id}</div>
      <div>Name: {kbItem.title}</div>
      <ReactMarkdown children={kbItem.content}/>
      <button onClick={handleEditClick}>Edit</button>
    </div>
  );
};
