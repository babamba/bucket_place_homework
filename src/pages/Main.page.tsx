import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useStores from "../hooks/useStores";
import Header from "../components/Main/Header";
import List from "../components/Main/List";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 0px 60px;
`;

const MainPage = () => {
  useEffect(() => {}, []);

  return (
    <Container>
      <Header />
      <List />
    </Container>
  );
};

export default MainPage;
