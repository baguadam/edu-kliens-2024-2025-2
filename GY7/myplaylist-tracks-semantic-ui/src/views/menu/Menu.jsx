import logo from "../../assets/logo.png";

export function Menu() {
  return (
    <nav className="ui secondary menu">
      <img src={logo} alt="" />
      <div className="item">
        <i className="home icon"></i> Home
      </div>
      <div className="item">
        <i className="headphones icon"></i> My Playlists
      </div>
      <div className="active item">
        <i className="music icon"></i> Tracks
      </div>
      <div className="item">
        <i className="search icon"></i> Search
      </div>
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
}
