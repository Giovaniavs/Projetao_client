import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  min-height: 100%;
  padding: 120px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Description = styled.p`
  font-size: 18px;
  text-align: justify;
  color: #00000;
`;

export const Doc = styled.p`
  font-size: 18px;

  color: #000000;
`;

export const Docs = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 15px;
  flex-wrap: wrap;
`;

export const DocLink = styled.a`
  width: 88px;
  height: 99px;
  display: block;
  overflow: hidden;
`;

export const DocImg = styled.img`
  width: 100%;
  line-height: 0;
`;
