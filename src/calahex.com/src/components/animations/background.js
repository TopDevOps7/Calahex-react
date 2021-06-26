import React, { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

const highlight = keyframes`
  25% {
    /* transform: scale(1.3); */
    background: red;
  }

  100% {
    /* transform: scale(1.0); */
    background: transparent;
  }
`;

const highlightAnimation = css`
  animation: ${highlight} 1s ease;
`;

const Circle = styled.div`
  // ...other attributes
  ${highlightAnimation}
  width: 100%;
`;

const Counter = ({ children, color, status }) => {
  return (
    <Circle color={color} status={status}>
      {children}
    </Circle>
  );
};

export default Counter;