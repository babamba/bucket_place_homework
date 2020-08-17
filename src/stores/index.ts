import BookStore from "./BookStore";

/**
 * 여러가지 분류로 나뉘어 있는 Store를 하나로 combine.
 */

class RootStore {
  bookStore: any;
  constructor() {
    this.bookStore = new BookStore(this);
  }
}

export default RootStore;
