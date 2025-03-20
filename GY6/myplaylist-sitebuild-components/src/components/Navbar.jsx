import Logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <nav className="ui secondary menu">
      <img src={Logo} />
      <a className="item" href="index.html">
        <i className="home icon"></i> Home
      </a>
      <a className="active item" href="playlists.html">
        <i className="headphones icon"></i> My Playlists
      </a>
      <a className="item" href="tracks.html">
        <i className="music icon"></i> Tracks
      </a>
      <a className="item" href="search.html">
        <i className="search icon"></i> Search
      </a>
      <div className="ui right dropdown item">
        John Doe
        <i className="dropdown icon"></i>
        <div className="menu">
          <div className="item">
            <i className="user icon"></i> Profile
          </div>
          <div className="item">
            <i className="settings icon"></i> Settings
          </div>
          <div className="item">
            <i className="sign out icon"></i>Log out
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
