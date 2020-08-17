import { observable, action, computed } from "mobx";
import BookService from "./BookService";

class BookStore {
  rootStore: any;

  constructor(rootStore: any) {
    this.rootStore = rootStore;
  }

  @observable roomlist: any = []; // API Response
  @observable pageNum = 1; // API Page Count
  @observable OnlyBookMark = false; // 북마크 only & 전체 Flag
  @observable hasMore = true; // 더 불러올 정보가 있는지?

  /**
   * Api 요청을 통해 컨텐츠 리스트를 받는다.
   * 로컬스토리지의 북마크 리스트와 비교를 위해 hasBookmarkCheck 함수를 통해 데이터를 가공.
   * api 파라미터 pageNum을 통해  pathVariable 값을 Service 쪽으로 전달.
   */

  @action.bound
  async getRooms(pageNum: number) {
    try {
      const { data, status } = await BookService.findBookList(pageNum);

      if (status === 200 && data.length > 0) {
        let arr = [...data];
        // 스토어에 지정하기 전 북마크 타입 지정
        const renewData = await this.hasBookmarkCheck([
          ...this.roomlist,
          ...arr,
        ]);
        this.roomlist = renewData;
        return true;
      } else {
        if (data.length === 0) this.hasMore = false;
        return false;
      }
    } catch (error) {
      console.log("error : ", error);
      return false;
    }
  }

  // 리스트를 순회하여 로컬스토리지에 있는 북마크 리스트값을 비교하여 isBookMark 프로퍼티를 지정.
  hasBookmarkCheck = async (list: any) => {
    let storageList = await String(localStorage.getItem("bookmark"));
    if (storageList !== "null") {
      let tempArr = JSON.parse(storageList);
      const renewlist = list.map((item: any) => {
        if (tempArr.includes(item.id)) {
          item.isBookMark = true;
        } else {
          item.isBookMark = false;
        }
        return item;
      });
      return renewlist;
    } else {
      return list;
    }
  };

  // 최초 실행 시 로컬스토리지 'bookmark' 가 null 인 경우를 대비하여 null일시 array형태 제공
  @action.bound
  LocalCheck = async () => {
    const storage = await String(localStorage.getItem("bookmark"));
    if (storage === "null") {
      console.log("current local storage is Null");
      localStorage.setItem("bookmark", JSON.stringify([]));
    }
  };

  // 페이지번호 Add
  @action.bound
  AddPageNum = async () => {
    this.pageNum = this.pageNum + 1;
    return this.pageNum + 1;
  };

  // 북마크 목록 보기 Flag Setter
  @action.bound
  OnlyBookMarkList = async (value: boolean) => {
    this.OnlyBookMark = value;
  };

  // 북마크 버튼을 눌렀을 떄 액션.
  // 로컬스토리지 값을 비교하여 이미 북마크 처리가 되어있는 ID 값이라면 북마크 해제.
  @action.bound
  BookMarkAction = async (value: number) => {
    let list = await String(localStorage.getItem("bookmark"));

    // 로컬스토리지에 북마크 리스트가 있고,
    if (list !== "null") {
      let tempArr = JSON.parse(list);
      let testSet = new Set([...tempArr]);
      const isExistBook = testSet.has(value);

      //set 을 이용한 중복체크에서 중복이 있을경우 삭제
      if (isExistBook) {
        testSet.delete(value);
      } else {
        //중복없을 경우 추가
        testSet.add(value);
      }
      //set을 list화 하여 storage set
      localStorage.setItem("bookmark", JSON.stringify(Array.from(testSet)));

      const renewData = await this.hasBookmarkCheck([...this.roomlist]);
      this.roomlist = renewData;

      if (isExistBook) return false;
      else return true;

      // let newArr = [...temp];
      // console.log("newArr : ", newArr);
    } else {
      // 북마크가 한개도 없을 때 삽입
      let newArr = [value];
      localStorage.setItem("bookmark", JSON.stringify(newArr));
      return true;
    }
  };
}

export default BookStore;
