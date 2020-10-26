import { Button } from "antd";
import React, { HTMLAttributes } from "react";
import styled from "styled-components";

const NumberInputContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  width: 80px;
  font-size: 18px;
`;

interface NumberInputProps extends HTMLAttributes<HTMLDivElement> {
  min?: number;
  max?: number;
  value: number;
  onValueChange: (value: number) => void;
}

const NumberInput = ({
  value,
  onValueChange,
  min = 0,
  max = 10,
  ...rest
}: NumberInputProps) => {
  return (
    <NumberInputContainer {...rest}>
      <Button
        shape="circle"
        size="small"
        onClick={() => (value > min ? onValueChange(value - 1) : null)}
      >
        -
      </Button>
      <span>{value}</span>
      <Button
        shape="circle"
        size="small"
        onClick={() => (value < max ? onValueChange(value + 1) : null)}
      >
        +
      </Button>
    </NumberInputContainer>
  );
};

export default NumberInput;
