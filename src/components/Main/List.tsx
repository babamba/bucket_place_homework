import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Spin, Skeleton } from "antd";
import styled from "styled-components";
import { observer } from "mobx-react";
import useStores from "../../hooks/useStores";
import Card from "./Card";
import { Content } from "../../interface/content";
import InfiniteScroll from "react-infinite-scroller";
// import { LoadingOutlined } from "@ant-design/icons";

const Container = styled.div``;
const SpinBox = styled.div`
  height: 200px;
  text-align: center;
`;

const List = () => {
  const scrollParentRef = useRef<HTMLDivElement>(null);
  const [cardList, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    bookStore: { getRooms, roomlist, AddPageNum, hasMore },
  } = useStores();

  useEffect(() => {
    handleFetch(1);
  }, []);

  useEffect(() => {
    if (roomlist.length > 0) handleRender();
  }, [roomlist]);

  const handleFetch = async (page: number) => {
    const result = await getRooms(page);
    if (result) {
      handleRender();
    }
  };

  const handleRender = async () => {
    let list = roomlist.map((item: Content, idx: number) => {
      return <Card content={item} key={idx} />;
    });

    setList(list);
  };

  // const SkeletonShape = () => (
  //   <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6}>
  //     <Row>
  //       <Col>
  //         <Skeleton.Avatar active size={36} shape="circle" />
  //         <Skeleton.Input style={{ width: 120, marginLeft: 8 }} active />
  //       </Col>
  //     </Row>
  //   </Col>
  // );

  const handleInfiniteOnLoad = async () => {
    if (hasMore) {
      console.log("loadmore");
      const AddNum = await AddPageNum();
      await handleFetch(AddNum);
      // setLoading(true);

      // setTimeout(async () => {
      //   const AddNum = await AddPageNum();
      //   await handleFetch(AddNum);
      //   setLoading(false);
      // }, 1000);
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
        // loader={
        //   <SpinBox key={0}>
        //     <Spin
        //       indicator={<LoadingOutlined style={{ fontSize: 24 }} />}
        //       spinning={loading}
        //     />
        //     <Row>
        //       <SkeletonShape />
        //       <SkeletonShape />
        //       <SkeletonShape />
        //       <SkeletonShape />
        //     </Row>
        //   </SpinBox>
        // }
      >
        <Row>{cardList}</Row>
      </InfiniteScroll>
    </Container>
  );
};

export default observer(List);
