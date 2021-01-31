import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { Item } from "../types/Item";
import { BlobCruds } from "../types/BlobCruds";

const blobCrud = new BlobCruds<Item>();

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const item: Item = req.body;
  const location = await blobCrud.create(item);

  if (context.bindingData.id == item.id) {
    context.res = {
      status: 201,
      Location: location,
      body: item,
    };
  } else {
    context.res = {
      status: 409,
    };
  }
};

export default httpTrigger;
