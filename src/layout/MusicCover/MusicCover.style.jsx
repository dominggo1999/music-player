import tw, { styled } from 'twin.macro';

export const Cover = styled.div`
  ${tw`
    rounded-full 
    w-[250px]
    mx-auto 
    relative
  `}

  aspect-ratio : 1/1;
  box-shadow: rgba(0, 0, 0, 0.349) 0px 20px 25px -5px, rgba(0, 0, 0, 0.301) 0px 10px 10px -5px;

  img{
    ${tw`
      w-full
      h-full
      object-cover
      object-center
      rounded-full
      relative 
      z-50
    `}
  }
`;
