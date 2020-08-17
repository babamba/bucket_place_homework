import axios from "axios";

class BookService {
  findBookList = async (page: number) => {
    const url = `${process.env.REACT_APP_URL}/page_${page}.json`;
    return axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
}

// 싱글톤으로 리턴 (매번 새로운 객체를 생성 할 필요가 없다면 처음 부터 싱글톤으로 export)
export default new BookService();
