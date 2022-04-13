import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  white-space: nowrap;
  border-radius: 8px;
  margin: 0;
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const GroupList = styled.div`
  max-width: 100%;
  display: flex;
  position: relative;
  gap: 20px;
  overflow: auto;
`;

export const GroupCarouselTitle = styled.h2`
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;
  /* identical to box height */

  color: #000000;
`;
