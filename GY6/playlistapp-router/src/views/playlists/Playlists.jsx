import { PlaylistForm } from "./PlaylistForm";
import { PlaylistList } from "./PlaylistList";
import { TrackList } from "./TrackList";
import { TrackDetails } from "./TrackDetails";
import { examplePlaylists } from "../../domain/playlist";
import { exampleTracks } from "../../domain/track";
import { useState } from "react";
import { useParams } from "react-router-dom";

export const Playlists = () => {
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(1);
  const [selectedTrackId, setSelectedTrackId] = useState(1);
  const { id } = useParams();

  const playlists = examplePlaylists;

  const selectedPlaylist = playlists.find((pl) => pl.id.toString() === id);
  const selectedTrack = exampleTracks.find((t) => t.id === selectedTrackId);

  return (
    <div>
      <div className="md:flex pb-3 pr-3 mt-5">
        <div className="md:w-4/12 w-full p-2 overflow-hidden h-80">
          <PlaylistList playlists={playlists} setSelectedPlaylistId={setSelectedPlaylistId} selectedPlaylistId={id} />
        </div>
        <div className="md:w-8/12 w-full p-2 h-80">
          <TrackList
            selectedPlaylist={selectedPlaylist}
            setSelectedTrackId={setSelectedTrackId}
            selectedTrackId={selectedTrackId}
          />
        </div>
      </div>
      <div className="px-3">
        <TrackDetails selectedTrack={selectedTrack} />
      </div>
    </div>
  );
};
