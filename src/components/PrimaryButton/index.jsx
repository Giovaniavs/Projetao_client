import React from "react";
import { Wrapper } from "./styles";

export default function PrimaryButton({ children, ...rest }) {
  return <Wrapper {...rest}>{children}</Wrapper>;
}
