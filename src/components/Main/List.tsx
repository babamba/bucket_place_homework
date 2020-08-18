import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Spin, Skeleton, Empty } from 'antd';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import useStores from '../../hooks/useStores';
import Card from './Card';
import { Content } from '../../interface/content';
import InfiniteScroll from 'react-infinite-scroller';
// import { LoadingOutlined } from "@ant-design/icons";

const Container = styled.div``;
const SpinBox = styled.div`
  height: 200px;
  text-align: center;
`;

const List = () => {
  const scrollParentRef = useRef<HTMLDivElement>(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [cardList, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    bookStore: { getRooms, roomlist, AddPageNum, hasMore, OnlyBookMark }
  } = useStores();

  useEffect(() => {
    handleFetch(1);
  }, []);

  useEffect(() => {
    if (OnlyBookMark) {
      const check = roomlist.findIndex((item: Content) => {
        console.log('check : ', item.isBookMark);
        return item.isBookMark === true;
      });

      if (check === -1) setIsEmpty(true);
      else setIsEmpty(false);
    }
  }, [OnlyBookMark]);

  useEffect(() => {
    if (roomlist.length > 0) handleRender();
  }, [roomlist]);

  const handleFetch = async (page: number) => {
    setLoading(true);
    const result = await getRooms(page);
    if (result) handleRender();
    setLoading(false);
  };

  const handleRender = async () => {
    let list = roomlist.map((item: Content, idx: number) => {
      return <Card content={item} key={idx} />;
    });

    setList(list);
  };

  const handleInfiniteOnLoad = async () => {
    if (hasMore) {
      console.log('loadmore');
      const AddNum = await AddPageNum();
      await handleFetch(AddNum);
    }
  };

  return (
    <Container className="ScrollDiv" ref={scrollParentRef}>
      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        loadMore={handleInfiniteOnLoad}
        hasMore={hasMore}
        useWindow={true}
        threshold={150}
      >
        <Row>
          {OnlyBookMark ? (
            isEmpty ? (
              <Empty
                description="북마크 리스트가 없습니다. 북마크를 해보세요 :D"
                style={{
                  width: '100%',
                  height: '80vh',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              />
            ) : (
              cardList
            )
          ) : (
            cardList
          )}
        </Row>
      </InfiniteScroll>
    </Container>
  );
};

export default observer(List);
