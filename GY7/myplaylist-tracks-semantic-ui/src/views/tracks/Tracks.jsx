import { exampleTracks } from "../../domain/track";
import { TrackForm } from "./TrackForm";
import { Track } from "./Track";
import { useState } from "react";

export function Tracks() {
  // States
  const [open, setOpen] = useState(false);
  const [tracks, setTracks] = useState(exampleTracks);

  // Handlers
  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e, formState) => {
    e.preventDefault();
    formState.id = Math.random().toString();
    setTracks([...tracks, formState]);
    handleModalClose();
  };

  return (
    <>
      <div className="ui container">
        <button onClick={handleModalOpen} href="#" className="ui right floated green button" id="newModal">
          <i className="plus icon"></i>
          New track
        </button>
        <h1>Tracks</h1>
        <table className="ui celled striped table">
          <thead>
            <tr>
              <th>Artist</th>
              <th>Title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tracks.map((track) => (
              <Track key={track.id} track={track} />
            ))}
          </tbody>
        </table>
      </div>

      <TrackForm open={open} onClose={handleModalClose} onSubmit={handleSubmit} />
    </>
  );
}
