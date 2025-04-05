import { TrackForm } from "./TrackForm";
import { Track } from "./Track";
import { useContext, useState } from "react";
import { TrackServiceContext } from "../../contexts/TrackServiceProvider";

export function Tracks() {
  // States
  const [open, setOpen] = useState(false);
  const [editedTrack, setEditedTrack] = useState();
  const { tracks, addTrack, editTrack, deleteTrack } = useContext(TrackServiceContext);

  // Handlers
  const handleAddNewTrack = () => {
    setEditedTrack(null);
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e, formState) => {
    e.preventDefault();

    if (formState.id) {
      editTrack(formState);
    } else {
      addTrack(formState);
    }

    handleModalClose();
  };

  const handleDeleteClick = (id) => {
    deleteTrack(id);
  };

  const handleEditClick = (track) => {
    console.log(track);
    setOpen(true);
    setEditedTrack(track);
  };

  return (
    <>
      <div className="ui container">
        <button onClick={handleAddNewTrack} href="#" className="ui right floated green button" id="newModal">
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
              <Track key={track.id} track={track} onDelete={handleDeleteClick} onEdit={handleEditClick} />
            ))}
          </tbody>
        </table>
      </div>

      <TrackForm open={open} onClose={handleModalClose} onSubmit={handleSubmit} editedTrack={editedTrack} />
    </>
  );
}
