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
  top: 0;

  width: 100%;

  z-index: 10000;
  background: inherit;

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

export const Disclaimer = styled.div``;
export const ModalBody = styled.div`
  width: 100%;
  margin: 0 auto;
  height: 100%;
  padding: 60px;
  background: white;
  overflow: auto;
`;

export const DisclaimerLink = styled.a`
  font-weight: bold;
  text-decoration: underline;
  &:hover {
    text-decoration: underline;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 60px;
`;

export const UploadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-dontent: center;
  align-items: center;
  width: 100%;
  .ant-upload.ant-upload-select-picture-card,
  .ant-upload-list-picture-card-container {
    margin: 8px 0;
  }
`;

export const InvisbleInput = styled.input`
  position: absolute;
  opacity: 0;
  height: 0;
`;
