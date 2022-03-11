import React from 'react';
import { FiMusic, FiSettings } from 'react-icons/fi';
import { BsMusicNoteList } from 'react-icons/bs';
import ReactMarquee from 'react-fast-marquee';
import { useLocation } from 'react-router-dom';
import {
  HeaderWrapper, Brand, Icons, IconItem, CoolMarquee, MarqueeContent,
} from './Header.style';
import { NavLink } from '../../common/Link';
import useActiveSongStore from '../../store/useActiveSongStore';

const Header = () => {
  const { pathname } = useLocation();
  const activeSong = useActiveSongStore((state) => state.activeSong.path);
  const isPlay = useActiveSongStore((state) => state.activeSong.isPlay);
  const title = activeSong.split('\\').pop().replace(/\.[^/.]+$/, '');

  const showMarquee = pathname !== '/';

  return (
    <HeaderWrapper>
      <Brand>
        Musica
      </Brand>
      {
         activeSong && (
         <CoolMarquee>
           <ReactMarquee
             style={{
               height: '100%',
               display: 'flex',
               alignItems: 'center',
               opacity: showMarquee ? 1 : 0,
             }}
             gradient={false}
             speed={10}
             play={isPlay}
           >
             <MarqueeContent>
               {title}
             </MarqueeContent>
           </ReactMarquee>
         </CoolMarquee>
         )
      }
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
