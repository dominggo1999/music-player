import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoIosClose } from 'react-icons/io';
import {
  SettingsWrapper, OptionsArea, OptionLabel, Option, ChooseFileButton, FileIcon, LevelWrapper, Percentage,
} from './Settings.style';
import Select from '../../common/Select/Select';
import { userSettingsSelector } from '../../store/useUserSettingsStore';

const themes = [
  { value: 'default', label: 'Default' },
  { value: 'blue-origin', label: 'Blue Origin' },
  { value: 'red', label: 'Red' },
];

const Settings = () => {
  const { send } = window.api;
  const changeSettings = userSettingsSelector('changeSettings');
  const theme = userSettingsSelector('settings', 'theme');
  const imageLocation = userSettingsSelector('settings', 'imageLocation');
  const overlay = userSettingsSelector('settings', 'overlay');

  const handleChangeTheme = (e) => {
    const newValue = e.value;
    changeSettings('theme', newValue);
  };

  const chooseBackgroundImage = async () => {
    const { imageLocation, canceled } = await send('choose-background-image');

    if(!canceled) {
      changeSettings('imageLocation', imageLocation);
    }
  };

  const handleFileIconClick = (e) => {
    imageLocation && e.stopPropagation();
    if(!imageLocation) return;
    changeSettings('imageLocation', '');
  };

  const changeOverlayLevel = (e) => {
    const newValue = parseInt(e.target.value, 10);
    changeSettings('overlay', newValue);
  };

  return (
    <SettingsWrapper>
      <OptionsArea>
        <Option>
          <OptionLabel>Select Theme</OptionLabel>
          <Select
            value={theme}
            options={themes}
            labelKey="label"
            valueKey="value"
            name="select-theme"
            handleChange={handleChangeTheme}
            isSearchable
          />
        </Option>
        <Option>
          <OptionLabel>Choose Background</OptionLabel>
          <ChooseFileButton onClick={chooseBackgroundImage}>
            <span>{imageLocation || 'Find Image'}</span>
            <FileIcon
              onClick={handleFileIconClick}
              bg={imageLocation}
            >
              {
                imageLocation
                  ? <IoIosClose />
                  : <AiOutlineSearch />
              }
            </FileIcon>
          </ChooseFileButton>
        </Option>
        {
          imageLocation && (
            <Option>
              <OptionLabel>
                Overlay
              </OptionLabel>
              <LevelWrapper>
                <input
                  onChange={changeOverlayLevel}
                  type="number"
                  value={overlay}
                  min={0}
                  max={100}
                />
                <Percentage>%</Percentage>
              </LevelWrapper>
            </Option>
          )
        }
      </OptionsArea>
    </SettingsWrapper>
  );
};

export default Settings;
