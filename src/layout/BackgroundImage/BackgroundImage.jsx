import React from 'react';
import { ImageWrapper, Overlay } from './BackgroundImage.style';
import { userSettingsSelector } from '../../store/useUserSettingsStore';

const BackgroundImage = () => {
  const settings = userSettingsSelector('settings');

  return (
    <ImageWrapper>
      <Overlay />
    </ImageWrapper>
  );
};

export default BackgroundImage;
