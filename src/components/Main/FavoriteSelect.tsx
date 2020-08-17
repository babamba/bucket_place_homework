import React from "react";
import CheckedIcon from "../../assets/images/bt-checkbox-checked.png";
import DefailtIcon from "../../assets/images/white.png";
import styled from "styled-components";
import { observer } from "mobx-react";
import useStores from "../../hooks/useStores";

const Container = styled.div`
  cursor: pointer;
`;
const CheckImage = styled.img`
  padding-right: 6px;
`;

const FavoriteSelect = () => {
  const { bookStore } = useStores();

  const handleClick = () => {
    bookStore.OnlyBookMarkList(!bookStore.OnlyBookMark);
  };

  return (
    <Container onClick={() => handleClick()}>
      <CheckImage src={bookStore.OnlyBookMark ? CheckedIcon : DefailtIcon} />
      스크랩한 것만 보기
    </Container>
  );
};

export default observer(FavoriteSelect);
