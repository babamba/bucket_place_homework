import { observable, action, computed } from "mobx";
import BookService from "./BookService";
import axios from "axios";

class BookStore {
  rootStore: any;

  constructor(rootStore: any) {
    this.rootStore = rootStore;
  }

  @observable list = []; // 숫자만 가진 전화번호 입력값
  @observable bookMarkList = [];
  @observable pageNum = 1;

  @action.bound
  async getRooms(param: number) {
    this.pageNum = param;

    try {
      const { data, status } = await BookService.findBookList(param);
      console.log("data : ", data);
      if (status === 200 && data.length > 0) {
        this.bookMarkList = data;
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log("error : ", error);
      return false;
    }
  }

  @action.bound
  AddBookMark = async (value: number) => {
    const current = await localStorage.getItem("favor");
  };

  @action.bound
  DeleteBookMark = async (value: number) => {
    const current = await localStorage.getItem("favor");
  };
}

export default BookStore;
