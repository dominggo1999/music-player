import tw, { styled } from 'twin.macro';

export const ImageWrapper = styled.div`
  ${tw`
    fixed 
    top-0 
    left-0
    w-full 
    h-screen
    bg-no-repeat
    bg-cover 
    bg-center
    bg-primary
    transition 
    transition-bg
    ease-out-sine
    duration-400
  `}


  img {
    ${tw`
      fixed  
      top-0 
      left-0
      z-20 
      w-full 
      h-full 
      object-cover 
      object-center
    `}
  }
`;

export const Overlay = styled.div`
  ${tw`
    bg-black
    fixed  
    top-0 
    left-0
    z-[21] 
    w-full 
    h-full 
    fixed
  `}
`;
