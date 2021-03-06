import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { animateScroll } from 'react-scroll';
import { Link } from 'gatsby';

import AnchorLink from './AnchorLink';

const nsBase = 'component';
const ns = `${nsBase}-nav`;

const Nav = () => {
  const [navState, setNavState] = useState({
    scrollPosition: false,
    menuActive: null
  });

  const rootClassnames = classNames({
    [`${ns}`]: true,
    [`open`]: navState.menuActive,
    [`scrolled`]: navState.scrollPosition > 50
  });

  const listenScrollEvent = () => {
    const scroll = window.pageYOffset;
    setNavState((prevState) => {
      return { ...prevState, scrollPosition: scroll };
    });
  };

  const scrollTo = (anchor) => {
    if (document.getElementById(anchor) != null) {
      const anchorPosition = document.getElementById(anchor).getBoundingClientRect();
      animateScroll.scrollTo(anchorPosition.top + window.scrollY);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', () => { listenScrollEvent(); });

    return () => {
      window.removeEventListener('scroll', () => { listenScrollEvent(); });
    };
  }, []);

  const handleClick = () => {
    setNavState((prevState) => {
      return { ...prevState, menuActive: !navState.menuActive };
    });
  };

  return (
    <div
      id={'site-menu'}
      className={rootClassnames}
    >
      <div className={`${ns}__wrapper`}>
        <nav className={`${ns}__navigation`}>
          <ul>
            <li>
              <AnchorLink to={'/'} direction={'left'}>Home</AnchorLink>
            </li>
            <li>
              <Link to={'/#featured-work'} onClick={() => { scrollTo('featured-work'); }}>Work</Link>
            </li>
            <li>
              <a href={'#contact'} onClick={() => { scrollTo('contact'); }}>Contact</a>
            </li>
          </ul>
        </nav>
      </div>
      <button
        className={`${ns}__control`}
        type={`button`}
        onClick={(e) => { handleClick(e); }}
        aria-label={`Menu Toggle`}
      >
        <div className={`${ns}__menu-button`}>
          <div className={`${ns}__menu-top`}>
            <div className={`${ns}__menu-top-left`} />
            <div className={`${ns}__menu-top-middle`} />
            <div className={`${ns}__menu-top-right`} />
          </div>
          <div className={`${ns}__menu-middle`}>
            <div className={`${ns}__menu-middle-left`} />
            <div className={`${ns}__menu-middle-right`} />
          </div>
          <div className={`${ns}__menu-bottom`}>
            <div className={`${ns}__menu-bottom-left`} />
            <div className={`${ns}__menu-bottom-right`} />
          </div>
        </div>
      </button>
    </div>
  );
};

export default Nav;
