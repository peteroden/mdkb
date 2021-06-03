import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { KbItem, emptyKbItem } from "../types/KbItem";
import { Operation } from "../types/Operation";
import { ReadKbItem } from "./ReadKbItem";
import { EditItem } from "./EditItem";
import { read } from "../types/CrudsApi";

export const Crud: React.FC<{ itemId: string }> = ({ itemId }) => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<KbItem>(emptyKbItem);
  const [operation, setOperation] = useState<Operation>( id === undefined ? Operation.Create : Operation.Read);

  useEffect(() => {
    const readItem = async () => {
      const item = await read<KbItem>(id);
      if (item instanceof Error) {
      } else {
        setItem(item);
      }
    };
    readItem();
  }, [id]);

  const showOperationComponent = (
    operation: Operation,
    setOperation: React.Dispatch<React.SetStateAction<Operation>>
  ) => {
    switch (operation) {
      case Operation.Read:
        return (
          <ReadKbItem
            kbItem={item}
            operation={operation}
            setOperation={setOperation}
          />
        );
      case Operation.Edit:
        return (
          <EditItem
            item={item}
            operation={operation}
            setOperation={setOperation}
          />
        );
    case Operation.Create:
        return (
            <EditItem
            item={item}
            operation={operation}
            setOperation={setOperation}
            />
        );
    }
  };

  return (
    <div>
      <hr />
      <p>CRUD page</p>
      {showOperationComponent(operation, setOperation)}
    </div>
  );
};
