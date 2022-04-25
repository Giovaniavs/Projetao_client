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
  margin-top: 15px;
  margin-right: 15%;


  font-size: 2.5rem;
`;

export const InputWrapper = styled.div`
  width: 100%;
`;

export const Input = styled.input`
  width: 100%;
  height: 50px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid grey;
  border-radius: 4px;
`;

export const Label = styled.label`
  width: 100%;
  font-size: 1rem;
`;
