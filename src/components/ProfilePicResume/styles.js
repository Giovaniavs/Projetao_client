import styled from "styled-components";

export const Wrapper = styled.div`
  width: 200px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 200px;
  margin: 0 auto;
  gap: 10px;
`;
export const ProfilePic = styled.img`
  height: 100%;
  line-height: 0;
  flex-shrink: 0;
`;

export const PicWrapper = styled.div`
  height: 225px;
  width: 200px;
  border-radius: 8px;
  overflow: hidden;
`;
export const ProfileName = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  text-align: center;
  width: 100%;
  color: #000000;

  overflow: hidden;
  text-overflow: clip;
  white-space: pre-wrap;
`;
export const ProfilelStars = styled.p`
  width: 100%;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;

  color: #000000;

  text-align: center;
`;
