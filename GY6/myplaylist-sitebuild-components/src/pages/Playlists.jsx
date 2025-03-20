import PlaylistsList from "../components/PlaylistsList";
import TrackDetails from "../components/TrackDetails";

const Playlists = () => {
  return (
    <div className="ui container">
      <h1>My Playlists</h1>
      <div className="ui stackable two column grid">
        <PlaylistsList />
        <div className="ui ten wide column">
          <h3>Classics</h3>
          <div className="ui very relaxed selection list">
            <div className="item">
              <i className="large music middle aligned icon"></i>
              <div className="content">
                <a className="header">Highway to hell</a>
                <div className="description">AC/DC</div>
              </div>
            </div>
            <div className="item">
              <i className="large music middle aligned icon"></i>
              <div className="content">
                <a className="header">Thunderstruck</a>
                <div className="description">AC/DC</div>
              </div>
            </div>
            <div className="item">
              <i className="large music middle aligned icon"></i>
              <div className="content">
                <a className="header">Take me home country roads</a>
                <div className="description">John Denver</div>
              </div>
            </div>
            <div className="active item">
              <i className="large music middle aligned icon"></i>
              <div className="content">
                <a className="header">It&apos;s my life</a>
                <div className="description">Bon Jovi</div>
              </div>
            </div>
            <div className="item">
              <i className="large music middle aligned icon"></i>
              <div className="content">
                <a className="header">Livin&apos; on a prayer</a>
                <div className="description">Bon Jovi</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ui divider"></div>
      <TrackDetails />
    </div>
  );
};

export default Playlists;
