import { useState } from "react";
import { examplePlaylists } from "../../sitebuild/domain/playlist";
import PlaylistItem from "./PlaylistItem";

const PlaylistsList = () => {
  const [activeIndex, setActivIndex] = useState(1);

  return (
    <div className="ui six wide column">
      <h3>Playlists</h3>
      <div className="ui very relaxed selection list">
        {examplePlaylists.map((playlist) => (
          <PlaylistItem key={playlist.id} playlist={playlist} activeIndex={activeIndex} setActivIndex={setActivIndex} />
        ))}
        <div className="item" id="newPlaylist">
          <i className="large green plus middle aligned icon"></i>
          <div className="content">
            <a className="header">New</a>
            <div className="description">Create a new playlist</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistsList;
