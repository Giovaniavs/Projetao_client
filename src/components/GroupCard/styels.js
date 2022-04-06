import styled from "styled-components";

export const Wrapper = styled.div`
  width: 350px;
  height: 200px;

  border-radius: 8px;
  overflow: hidden;

  position: relative;

  display: flex;
  align-items: flex-end;
  padding: 20px;

  cursor: pointer;
`;

export const GroupTitle = styled.h3`
  position: absolute;
  font-family: "Roboto", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  /* identical to box height */

  color: #ffffff;
  position: relative;

  max-width: 90%;

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const BoxShadowHelper = styled.img`
  width: 100%;
  height: 100%;
  box-shadow: inset 0px -67px 28px 1px rgba(0, 0, 0, 0.8);
  position: absolute;
  top: 0;
  left: 0;
  margin: auto;
`;

export const GroupImage = styled.img`
  width: 100%;
  border-radius: 8px;
  position: absolute;
  top: 0;
  left: 0;
  margin: auto;
`;
