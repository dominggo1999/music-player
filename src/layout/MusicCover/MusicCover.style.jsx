import tw, { styled } from 'twin.macro';

export const Cover = styled.div`
  ${tw`
    rounded-full 
    overflow-hidden
    w-[40%]
    mx-auto 
    relative
  `}

  aspect-ratio : 1/1;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;

  img{
    ${tw`
      w-full
      h-full
      object-cover
      object-center
    `}
  }
`;
