/* eslint-disable no-restricted-globals */
import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoIosClose } from 'react-icons/io';
import {
  SettingsWrapper, OptionsArea, OptionLabel, Option, ChooseFileButton, FileIcon, LevelWrapper, Percentage,
} from './Settings.style';
import Select from '../../common/Select/Select';
import { userSettingsSelector } from '../../store/useUserSettingsStore';
import unformattedThemes from '../../themes/themes.json';
import useThemeStore from '../../store/useThemeStore';

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const formatThemes = (themes) => {
  return themes.map((item) => {
    let label = item.name.replaceAll('-', ' ');
    label = capitalizeFirstLetter(label);
    return {
      label,
      value: item.name,
    };
  }).sort((a, b) => {
    return a.label.localeCompare(b.label);
  });
};

const formattedThemes = formatThemes(unformattedThemes);

const Settings = () => {
  const { send } = window.api;
  const saveSettings = userSettingsSelector('changeSettings');
  const theme = userSettingsSelector('settings', 'theme');
  const imageLocation = userSettingsSelector('settings', 'imageLocation');
  const overlay = userSettingsSelector('settings', 'overlay');
  const changeTheme = useThemeStore((state) => state.changeTheme);

  const handleChangeTheme = (e) => {
    const newValue = e.value;
    saveSettings('theme', newValue);
    changeTheme(newValue);
  };

  const chooseBackgroundImage = async () => {
    const { imageLocation, canceled } = await send('choose-background-image');

    if(!canceled) {
      saveSettings('imageLocation', imageLocation);
    }
  };

  const handleFileIconClick = (e) => {
    imageLocation && e.stopPropagation();
    if(!imageLocation) return;
    saveSettings('imageLocation', '');
  };

  const changeOverlayLevel = (e) => {
    let strValue = e.target.value;
    strValue = Number(strValue).toString();

    const val = parseInt(strValue, 10);

    if(val > 100) {
      saveSettings('overlay', 100);
    }else {
      saveSettings('overlay', val);
    }
  };

  return (
    <SettingsWrapper>
      <OptionsArea>
        <Option>
          <OptionLabel>Select Theme</OptionLabel>
          <Select
            value={theme}
            options={formattedThemes}
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
                  value={`${overlay}`}
                  min="0"
                  max="100"
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
