import tw, { styled } from 'twin.macro';

export const Cover = styled.div`
  ${tw`
    rounded-full 
    w-[270px]
    mx-auto 
    relative
    mt-6 
    cursor-pointer
    select-none
  `}

  aspect-ratio : 1/1;

  &:active{
    transform : scale(1.01);
  }

  img{
    ${tw`
      w-[270px]
      h-[270px]
      object-cover
      object-center
      rounded-full
      relative 
      z-50
    `}
  }

  &:hover {
    p:nth-of-type(1){
      ${tw`
        hidden
      `}
    }

    p:nth-of-type(2){
      ${tw`
        block
      `}
    }
  }
`;

export const PlaceholderContent = styled.div`
  ${tw`
    absolute 
    bg-red-500
    left-1/2 
    top-1/2
    -translate-x-1/2
    -translate-y-1/2
    z-[50]
    rounded-full
    bg-accent
    w-1/2 
    h-1/2
    font-yellowtail 
    flex 
    justify-center 
    items-center 
    text-3xl 
    text-primary
    font-medium 
    select-none
  `}

  p{
    transform : rotate(-3deg);
  }
  
  p:nth-of-type(2){
    ${tw`
      hidden
    `}
  }

  img{
    ${tw`
      w-full
      h-full
      object-cover
      object-center
      rounded-full
      relative 
      z-50
      absolute
    `}
  }
`;
