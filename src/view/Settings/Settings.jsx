import React from 'react';
import {
  SettingsWrapper, OptionsArea, OptionLabel, Option,
} from './Settings.style';
import Select from '../../common/Select/Select';
import { userSettingsSelector } from '../../store/useUserSettingsStore';

const themes = [
  { value: 'default', label: 'Default' },
  { value: 'blue-origin', label: 'Blue Origin' },
  { value: 'red', label: 'Red' },
];

const Settings = () => {
  const changeSettings = userSettingsSelector('changeSettings');
  const theme = userSettingsSelector('settings', 'theme');

  const handleChangeTheme = (e) => {
    const newValue = e.value;
    changeSettings('theme', newValue);
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
      </OptionsArea>
    </SettingsWrapper>
  );
};

export default Settings;
