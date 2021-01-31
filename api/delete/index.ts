import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { BlobCruds } from "../types/BlobCruds";
import { Item } from "../types/Item";

const blobCrud = new BlobCruds<Item>();

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const deletedResult = await blobCrud.delete(context.bindingData.id);

  context.res =
    deletedResult === null
      ? { status: 404 }
      : { status: 200, body: { id: context.bindingData.id } };
};

export default httpTrigger;
