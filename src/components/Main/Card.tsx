import React, { FC } from "react";
import styled from "styled-components";
import { Col, message } from "antd";
import { Content } from "../../interface/content";
import OFFBookMarkImg from "../../assets/images/on-img.png";
import ONBookMarkImg from "../../assets/images/blue.png";
import { observer } from "mobx-react";
import useStores from "../../hooks/useStores";

const Container = styled.div`
  text-align: center;
  padding: 30px 10px 30px 0px;
`;

const ContentHead = styled.div`
  text-align: left;
  padding-bottom: 10px;
`;
const ProfileImg = styled.img`
  width: 36px;
  height: 36px;
  margin-right: 10px;
`;
const UserNameText = styled.span`
  font-size: 15px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.27;
  letter-spacing: normal;
  color: rgba(0, 0, 0, 0.74);
`;
const ContentImg = styled.img`
  object-fit: cover;
  height: 268px;
  width: 100%;
  border-radius: 10px;
`;
const BookMarkBox = styled.div`
  position: absolute;
  bottom: 44px;
  right: 20px;
  cursor: pointer;
`;

const BookMarkImg = styled.img`
  width: 32px;
  height: 32px;
`;

interface Props {
  content: Content;
}

const Card: FC<Props> = (props: Props) => {
  const {
    bookStore: { BookMarkAction, OnlyBookMark },
  } = useStores();

  const { content } = props;

  const handleAddBookMark = async (id: number) => {
    const result = await BookMarkAction(id);
    if (result) message.success(`${id}번 컨텐츠 북마크를 추가 했어요 :D`);
    else message.success(`${id}번 컨텐츠 북마크를 삭제 했어요 :D`);
  };

  const isViewCheck = (isBookMark: boolean) => {
    //북마크만 보기상태이고
    if (OnlyBookMark) {
      // 콘텐츠의 북마크 여부가 true이면
      if (isBookMark) return "block";
      else return "none";
    } else {
      // 전체보기상태이면
      return "block";
    }
  };

  return (
    <Col
      xs={24}
      sm={12}
      md={8}
      lg={6}
      xl={6}
      xxl={6}
      style={{
        display: isViewCheck(content.isBookMark),
      }}
    >
      <Container>
        <ContentHead>
          <ProfileImg src={content.profile_image_url} />
          <UserNameText>{content.nickname}</UserNameText>
        </ContentHead>
        <ContentImg src={content.image_url} />
        <BookMarkBox onClick={() => handleAddBookMark(content.id)}>
          <BookMarkImg
            src={content.isBookMark ? ONBookMarkImg : OFFBookMarkImg}
          />
        </BookMarkBox>
      </Container>
    </Col>
  );
};

export default observer(Card);
