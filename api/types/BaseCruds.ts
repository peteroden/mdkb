import { AzureKeyCredential, SearchClient } from "@azure/search-documents";
import { IItem } from "./IItem";

export abstract class BaseCruds<T extends IItem> {
  constructor() {
    this.searchClient = new SearchClient(
      `https://${process.env.SearchService}.search.windows.net`,
      process.env.SearchIndex!,
      new AzureKeyCredential(process.env.SearchApiKey!)
    );
  }

  abstract create(item: T): Promise<string>;
  abstract read(id: string): Promise<T | null>;
  abstract update(item: T): Promise<string | null>;
  abstract delete(id: string): Promise<void | null>;

  async search(searchText: string): Promise<any> {
    const searchResponse = await this.searchClient.search(searchText);
    searchResponse.results;
  }

  protected async upsertIndexItem(item: T): Promise<void> {
    await this.searchClient.uploadDocuments([item]);
  }

  protected async deleteIndexItem(id: string): Promise<void> {
    await this.searchClient.deleteDocuments([{ id: id }]);
  }

  private searchClient: SearchClient<unknown>;
}
