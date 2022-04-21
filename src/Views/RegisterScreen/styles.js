import styled from "styled-components";

export const Wrapper = styled.form`
  width: 100%;
  min-height: 100%;
  padding: 60px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 30px;
`;

export const WrapperFields = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
`;

export const H1 = styled.h1`
  position: sticky;
  top: 0;

  background: white;
  z-index: 10000;
  width: 100%;
  padding: 0 20px;

  padding: 60px 20px 0 20px;

  margin-top: -60px;
  font-size: 2.5rem;
`;
