import React from "react";
import styled from "styled-components";
import { Col } from "antd";

const Container = styled.div`
  text-align: center;
`;

const Card = () => {
  return (
    <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6}>
      <Container>Card</Container>
    </Col>
  );
};

export default Card;
