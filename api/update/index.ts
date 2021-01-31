import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { BlobCruds } from "../types/BlobCruds";
import { Item } from "../types/Item";

const blobCrud = new BlobCruds<Item>();

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const item: Item = req.body;
  const location = await blobCrud.update(item);

  context.res =
    location === null || context.bindingData.id != item.id
      ? { status: 409 }
      : { status: 200, body: location };
};

export default httpTrigger;
