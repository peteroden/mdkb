import { IItem } from "./IItem";

interface KbItem extends IItem {
  id: string;
  title: string;
  tags: string[];
  author: string;
  published: string;
  content: string;
}

var emptyKbItem: KbItem = {
  id: '',
  title: '',
  tags: [],
  author: '',
  published: '',
  content: '',
};

export {KbItem, emptyKbItem}