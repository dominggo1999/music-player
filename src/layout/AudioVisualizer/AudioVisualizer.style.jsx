import tw, { styled } from 'twin.macro';

export const VisualizerWrapper = styled.div`
  ${tw`
    absolute 
    w-full 
    h-full 
    top-0 
    left-0
    select-none 
    pointer-events-none
  `}

  canvas{
    ${tw`
      absolute
      z-[999]
    `}
    top : 50%;
    left: 50%;
    transform : translate(-50%,-50%);
  }
`;
