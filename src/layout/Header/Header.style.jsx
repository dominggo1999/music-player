import tw, { styled } from 'twin.macro';

export const HeaderWrapper = styled.nav`
  ${tw`
    py-2
    mb-2
    flex
    justify-between
    items-center
  `}
`;

export const Brand = styled.div`
  ${tw`
    font-semibold
    text-3xl
    text-accent
    w-1/3
  `}
`;

export const Icons = styled.div`
  ${tw`
    flex
    items-center
    h-full
    gap-x-10
    w-1/3
    justify-end
  `}

  .link-active{
    ${tw`
      text-accent
    `}
  }
`;

export const IconItem = styled.div`
  ${tw`
    text-2xl
    h-full
  `}
`;

export const CoolMarquee = styled.div`
  ${tw`
    w-1/2
    text-accent 
    text-lg 
    h-full 
  `}
`;

export const MarqueeContent = styled.div`
  ${tw`
    mr-8
  `}
`;
