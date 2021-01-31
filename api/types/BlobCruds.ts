import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";
import { BaseCruds } from "./BaseCruds";
import { IItem } from "./IItem";

export class BlobCruds<T extends IItem> extends BaseCruds<T> {
  constructor(
    storageConnectionString: string = process.env.ItemStorageConnectionString ||
      "",
    storageContainer: string = process.env.ItemStorageContainer || "item"
  ) {
    super();

    const blobServiceClient = BlobServiceClient.fromConnectionString(
      storageConnectionString
    );

    this.containerClient = blobServiceClient.getContainerClient(
      storageContainer
    );
  }

  async create(item: T): Promise<string> {
    const blockBlobClient = this.containerClient.getBlockBlobClient(
      `${item.id}.json`
    );
    const itemString = JSON.stringify(item);
    await blockBlobClient.upload(itemString, itemString.length);
    await this.upsertIndexItem(item);

    return `/api/item/${item.id}`;
  }

  async read(id: string): Promise<T | null> {
    const blockBlobClient = this.containerClient.getBlockBlobClient(
      `${id}.json`
    );

    if (await blockBlobClient.exists()) {
      const downloadResponse = await blockBlobClient.download(0);
      // TODO: This should have much better error trapping
      const blobString = (
        await this.streamToBuffer(downloadResponse.readableStreamBody!)
      ).toString();
      if (blobString === null) {
        return null;
      } else {
        const item: T = JSON.parse(blobString);
        return item;
      }
    } else {
      return null;
    }
  }

  async update(item: T): Promise<string | null> {
    const blockBlobClient = this.containerClient.getBlockBlobClient(
      `${item.id}.json`
    );

    if (await blockBlobClient.exists()) {
      const location = await this.create(item);
      await this.upsertIndexItem(item);
      return location;
    } else {
      return null;
    }
  }

  async delete(id: string): Promise<void | null> {
    const blockBlobClient = this.containerClient.getBlockBlobClient(
      `${id}.json`
    );

    if (await blockBlobClient.exists()) {
      await blockBlobClient.delete();
      await this.deleteIndexItem(id);
    } else {
      return null;
    }
  }

  private containerClient: ContainerClient;

  private async streamToBuffer(
    readableStream: NodeJS.ReadableStream
  ): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];
      readableStream.on("data", (data: Buffer | string) => {
        chunks.push(data instanceof Buffer ? data : Buffer.from(data));
      });
      readableStream.on("end", () => {
        resolve(Buffer.concat(chunks));
      });
      readableStream.on("error", reject);
    });
  }
}
