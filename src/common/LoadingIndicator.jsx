import tw, { styled } from 'twin.macro';
import { keyframes } from 'styled-components';

const animloader = keyframes`
  0% {
    transform: translate(-10px, -10px);
  }
  25% {
    transform: translate(-10px, 10px);
  }
  50% {
    transform: translate(10px, 10px);
  }
  75% {
    transform: translate(10px, -10px);
  }
  100% {
    transform: translate(-10px, -10px);
  }
`;

export const SearchIndicator = styled.div`
  width: 48px;
  height: 48px;
  display: block;
  margin: 20px auto;
  position: relative;
  border-radius: 50%;
  box-sizing: border-box;
  animation: ${animloader} 2s linear infinite;
${tw`
  border-4 
  border-accent
`}  

  &::after {
    content: '';  
    box-sizing: border-box;
    width: 6px;
    height: 24px;
    transform: rotate(-45deg);
    position: absolute;
    bottom: -20px;
    left: 46px;
    ${tw`
      bg-accent
    `}
  }
`;

export const LoadingIndicatorWrapper = styled.div`
  ${tw`
    flex 
    flex-col 
    flex-1
    justify-center 
    items-center
  `}
`;

export const LoadingText = styled.span`
  ${tw`
    mt-4 
    text-light-text
  `}
`;
