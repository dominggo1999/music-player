import tw, { styled } from 'twin.macro';

export const MainWrapper = styled.div`
  ${tw`
    flex 
    flex-col
    mx-auto
    w-full
    text-main-text
    relative 
    z-[100]
  `}

  height : calc(100% - 120px);
`;
