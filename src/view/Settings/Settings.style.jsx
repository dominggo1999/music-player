import tw, { styled } from 'twin.macro';

export const SettingsWrapper = styled.div`
  ${tw`
    w-full
    h-full 
    flex 
  `}
`;

export const OptionsArea = styled.div`
  ${tw`
    flex 
    flex-col 
    w-2/3
    gap-y-6
  `}
`;

export const Option = styled.div`
  ${tw`
    flex 
    justify-between 
    items-center
  `}
`;

export const OptionLabel = styled.span`
  ${tw`
    
  `}
`;

export const ChooseFileButton = styled.button`
  ${tw`
    relative 
    py-2
    bg-accent 
    rounded-sm
    text-primary 
    font-semibold   
    w-48
    text-left
    px-3  
    flex 
    justify-between 
    items-center
  `}

  span{
    ${tw`
      pr-5 
      inline-block 
      truncate
    `}
  }
`;

export const FileIcon = styled.div`
  ${tw`
    absolute     
    right-0 
    top-0
    text-2xl 
    h-full 
    flex 
    items-center
    pr-2
    w-[40px]
    justify-end
  `}

  ${({ bg }) => bg && tw`hover:bg-red-500`}
`;

export const LevelWrapper = styled.div`
  ${tw`
    w-20
    relative
  `}

  input {
    ${tw`
      flex
      w-full
      bg-transparent 
      text-light-text
      outline-none
      border-2 
      border-accent 
      rounded-sm 
      py-1
      pl-2
      pr-8
    `}
  }

  input[type=number]::-webkit-inner-spin-button, 
  input[type=number]::-webkit-outer-spin-button { 
        -webkit-appearance: none; 
        margin: 0; 
  }
`;

export const Percentage = styled.div`
  ${tw`
    absolute 
    right-0 
    h-full 
    top-0 
    flex 
    items-center 
    pr-3 
    text-accent 
    font-semibold
  `}
`;
