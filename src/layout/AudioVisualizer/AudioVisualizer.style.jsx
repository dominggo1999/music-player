import tw, { styled } from 'twin.macro';

export const VisualizerWrapper = styled.div`
  ${tw`
    absolute 
    w-full 
    h-full 
    z-[999]
    top-0 
    left-0
  `}

  canvas{
    ${tw`
      absolute
    `}
    top : 50%;
    left: 50%;
    transform : translate(-50%,-50%);
  }
`;
