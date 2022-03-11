import React from 'react';
import { ImageWrapper, Overlay } from './BackgroundImage.style';
import { userSettingsSelector } from '../../store/useUserSettingsStore';

const BackgroundImage = () => {
  const imageLocation = userSettingsSelector('settings', 'imageLocation');
  const overlay = userSettingsSelector('settings', 'overlay');

  return (
    <ImageWrapper>
      {
        imageLocation && (
          <>
            <img
              src={`atom://${imageLocation}`}
              alt="Background"
            />
            <Overlay
              style={{
                opacity: `${overlay}%`,
              }}
            />
          </>
        )
      }
    </ImageWrapper>
  );
};

export default BackgroundImage;
