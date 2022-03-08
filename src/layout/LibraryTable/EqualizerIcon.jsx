/* eslint-disable react/jsx-max-props-per-line */
import React from 'react';
import tw, { styled } from 'twin.macro';
import { keyframes } from 'styled-components';

const bar1 = keyframes`
  0% {
    height: 20%;
  }
  50% {
    height: 70%;
  }
  100% {
    height: 20%;
  }
`;

const bar2 = keyframes`
  0% {
    height: 50%;
  }

  40% {
    height: 10%;
  }

  80% {
    height: 90%;
  }

  100% {
    height: 50%;
  }
`;

const bar3 = keyframes`
  0% {
    height: 70%;
  }
  50% {
    height: 0;
  }
  100% {
    height: 70%;
  }
`;

const bar4 = keyframes`
  0% {
    height: 20%;
  }
  50% {
    height: 80%;
  }
  100% {
    height: 20%;
  }
`;

const IconWrapper = styled.div`
  ${tw`
    flex
    w-[25px]
    h-full
    px-1
    h-[90%]
  `}
`;

export const Icon = styled.div`
  ${tw`
    w-full 
    h-full 
    flex
    justify-between
    items-end
  `}

  div{
    ${tw`
      w-[2px]
      bg-accent
    `}
  }

  .bar-1 {
    animation: ${bar1} 1.4s infinite linear;
  }

  .bar-2 {
    animation: ${bar2} 1.7s infinite linear;
  }

  .bar-3 {
    animation: ${bar3} 2s infinite linear;
  }

  .bar-4 {
    animation: ${bar4} 1.6s infinite linear;
  }
`;

const EqualizerIcon = () => {
  return (
    <IconWrapper className="equalizer-icon">
      <Icon>
        <div className="bar-1" />
        <div className="bar-2" />
        <div className="bar-3" />
        <div className="bar-4" />
      </Icon>
    </IconWrapper>
  );
};

export default EqualizerIcon;
