import React from "react";
import styled from "styled-components";
import FavoriteSelect from "./FavoriteSelect";

const Container = styled.div`
  display: flex;
  flex: 1;
  padding: 30px 0px 0px;
`;

const Header = () => {
  return (
    <Container>
      <FavoriteSelect />
    </Container>
  );
};

export default Header;
