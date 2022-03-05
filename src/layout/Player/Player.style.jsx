import tw, { styled } from 'twin.macro';

export const PlayerWrapper = styled.div`
  ${tw`
    h-[120px]
    fixed
    bottom-0
    w-full
    left-0 
    bg-primary
    px-5
  `}

  .rhap_container{
    ${tw`
      pt-5
      mx-auto
      shadow-none
      bg-transparent
      max-w-[800px]
      px-0
    `}
  }


  /* All icons */
  svg{
    ${tw`
      text-accent
    `}
  }

  /* Time indicator */
  .rhap_time{
    ${tw`
      text-light-text
    `}
  }

  /* Slider */
  /* Filled */
  .rhap_progress-filled{
    ${tw`
      bg-accent
    `}
  }

  /* Indicator circle */
  .rhap_progress-indicator{
    ${tw`
      bg-accent
    `}
  }
  
  /* Download Progress */
  .rhap_download-progress{
    ${tw`
      bg-[#f2d78d]
    `}
  }

  .rhap_progress-bar{
    ${tw`
      bg-[#928f78]
    `}
  }

  /* Volume */
  /* Container */
  .rhap_volume-container{
    flex : 0 1 100px
  }
  
  /* Circle Indicator */
  .rhap_volume-indicator{
    ${tw`
      bg-accent
      z-50
    `}
  }

  /* Filled Volume Indicator */
  .rhap_volume-filled{
    ${tw`
      bg-accent
    `}
  }

  /* Volume bar */
  .rhap_volume-bar{
    ${tw`
      bg-[#928f78]
    `}
  }

  /* Microphone icon */
  .rhap_button-clear.rhap_volume-button{
    ${tw`
      mr-3
    `}
  }
`;
