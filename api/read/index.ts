import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { Item } from "../types/Item";
import { BlobCruds } from "../types/BlobCruds";

const blobCrud = new BlobCruds<Item>();

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const item = await blobCrud.read(context.bindingData.id);

  context.res = item === null ? { status: 404 } : { status: 200, body: item };
};

export default httpTrigger;
