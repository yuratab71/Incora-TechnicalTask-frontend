import React from "react";
import { connect } from "react-redux";
import "./header.css";

const Header = ({ logout }) => {
  const handleLogOut = () => {
    logout();
  };

  return (
    <header className="header">
      <div className="header_logo">TechnicalTask</div>
      <div>
        <button className="header_button" onClick={handleLogOut}>
          log out
        </button>
      </div>
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    logout: state.auth.logout,
  };
};

export default connect(mapStateToProps)(Header);
