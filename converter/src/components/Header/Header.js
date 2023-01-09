import React from 'react';
import './header.scss'
import bankLogo from "./logoNB.png";

const Header = (props) => {

  return (
    <div className="header">
      <img src={bankLogo} alt="logo" className="header__logo"/>
      {props.currencies.map(cur => {
          return <p key={cur.txt}>{cur.txt} = {cur.rate}</p>
        }
      )}
    </div>
  );
};

export default Header;