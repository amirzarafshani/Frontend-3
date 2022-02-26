import * as React from 'react';
import style from './App.scss';
const navIcon1 = require('@assets/nav-icon-1.svg').default as string;
const navIcon2 = require('@assets/nav-icon-2.svg').default as string;
const navIcon3 = require('@assets/nav-icon-3.svg').default as string;
const navIcon4 = require('@assets/nav-icon-4.svg').default as string;
const navIcon5 = require('@assets/nav-icon-5.svg').default as string;
const logo = require('@assets/logo.svg').default as string;
const menuBars = require('@assets/menu-bars.svg').default as string;
// import BrandIcon from "../../assets/nav-icon-1.svg";

interface ILayoutProps {
  children: JSX.Element;
}

export const Layout = (props: ILayoutProps): JSX.Element => (
  <div className={style.layout}>
    <div className={style.header}>
      <div className={style.leftIcons}>
        <img src={logo} />
        <img src={menuBars} />
      </div>
      <div className={style.rightIcons}>
        <div className={style.jdIcon}>JD</div>
        <div className={style.jdText}>John Doe</div>
      </div>
    </div>
    <div className={style.main}>
      <div className={style.sidebar}>
        <ul className={style.nav}>
          <li>
            <img src={navIcon1} />
          </li>
          <li>
            <img src={navIcon2} />
          </li>
          <li>
            <img src={navIcon3} />
          </li>
          <li>
            <img src={navIcon4} />
          </li>
          <li>
            <img src={navIcon5} />
          </li>
        </ul>
      </div>
      <div className={style.body}>
        {props.children}
        <div className={style.footer}>Terms&Conditions | Privacy policy</div>
      </div>
    </div>
  </div>
);
