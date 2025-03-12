/* eslint-disable react/prop-types */
const PlaylistItem = ({ playlist }) => {
  return (
    <div className="item">
      <i className="large compact disc middle aligned icon"></i>
      <div className="content">
        <a className="header">{playlist.title}</a>
        <div className="description">{playlist.tracks.length} songs</div>
      </div>
    </div>
  );
};

export default PlaylistItem;
