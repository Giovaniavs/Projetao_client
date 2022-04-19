import styled from "styled-components";

export const Wrapper = styled.button`
  width: 211px;
  height: 45px;
  background: #0a639e;
  border-radius: 8px;

  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  text-transform: uppercase;

  color: #ffffff;

  border: none;
  transition: 0.5s;
  &:hover {
    color: #0a639e;

    background: transparent;
    border: 3px solid #a9c7dc;
    box-sizing: border-box;
    border-radius: 8px;
  }

  &:active {
    background: #02436f;
    color: white;
  }
`;
