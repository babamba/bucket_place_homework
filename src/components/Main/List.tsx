import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import styled from "styled-components";
import useStores from "../../hooks/useStores";
import Card from "./Card";
// import InfiniteScroll from "react-infinite-scroller";

const Container = styled.div``;

const List = () => {
  const { bookStore } = useStores();

  useEffect(() => {
    const result = bookStore.getRooms(1);
    console.log("result : ", result);
  }, []);
  return (
    <Container>
      <Row>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </Row>
    </Container>
  );
};

export default List;
