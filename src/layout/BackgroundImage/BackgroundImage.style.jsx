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
  `}

  background-image: url("https://images.pexels.com/photos/5845255/pexels-photo-5845255.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
`;

export const Overlay = styled.div`
  ${tw`
    bg-black
    h-full 
    w-full 
    opacity-60
  `}
`;
