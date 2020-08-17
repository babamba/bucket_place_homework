import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Routes from "./route/Route";
import "./App.css";

const Container = styled.div`
  display: flex;
  flex: 1;
  margin: 0 auto;
`;

function App() {
  return (
    <Container>
      <Routes />
    </Container>
  );
}

export default App;
