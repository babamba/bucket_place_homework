import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Routes from "./route/Route";
import useStores from "./hooks/useStores";
import "./App.css";

const Container = styled.div`
  display: flex;
  flex: 1;
  margin: 0 auto;
`;

function App() {
  const {
    bookStore: { LocalCheck },
  } = useStores();

  // 최초 어플리케이션 진입시 로컬스토리지가 null 상태인지 체크
  useEffect(() => {
    LocalCheck();
  }, []);

  return (
    <Container>
      <Routes />
    </Container>
  );
}

export default App;
