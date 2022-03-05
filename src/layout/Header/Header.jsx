import React from 'react';
import { FiMusic, FiSettings } from 'react-icons/fi';
import { BsMusicNoteList } from 'react-icons/bs';
import {
  HeaderWrapper, Brand, Icons, IconItem,
} from './Header.style';
import { NavLink } from '../../common/Link';

const Header = () => {
  return (
    <HeaderWrapper>
      <Brand>
        Musica
      </Brand>
      <Icons>
        <NavLink
          exact
          to="/"
        >
          <IconItem>
            <FiMusic />
          </IconItem>
        </NavLink>
        <NavLink
          exact
          to="/library"
        >
          <IconItem>
            <BsMusicNoteList />
          </IconItem>
        </NavLink>
        <NavLink
          exact
          to="/settings"
        >
          <IconItem>
            <FiSettings />
          </IconItem>
        </NavLink>
      </Icons>
    </HeaderWrapper>

  );
};

export default Header;
