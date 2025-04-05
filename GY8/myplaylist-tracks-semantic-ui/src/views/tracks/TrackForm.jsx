import { useEffect, useRef, useState } from "react";
import { Modal } from "semantic-ui-react";

/* eslint-disable react/prop-types */
const Field = ({ label, placeholder, name, value, onInput, ...attrs }) => {
  return (
    <div className="field">
      <label>{label}</label>
      <input value={value} onInput={onInput} name={name} type="text" placeholder={placeholder} {...attrs} />
    </div>
  );
};

const defaultState = {
  artist: "",
  title: "",
  length: "",
  thumbnailURL: "",
  spotifyURL: "",
  chordsURL: "",
  lyricsURL: "",
};

export function TrackForm({ open, onClose, onSubmit, editedTrack }) {
  // States
  const [formState, setFormState] = useState(defaultState);
  const inputRef = useRef();

  const isEdit = !!editedTrack;

  // Effects
  useEffect(() => {
    if (open) {
      setFormState({ ...defaultState, ...editedTrack });
      inputRef.current.focus();
    }
  }, [open, editedTrack]);

  // Handlers
  const handleInput = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <Modal open={open} onClose={onClose} as="form" className="ui modal" onSubmit={(e) => onSubmit(e, formState)}>
      <i onClick={onClose} className="close icon"></i>
      <div className="header">Add new Track</div>
      <div className="image content">
        <div className="description">
          <div className="ui form">
            <input type="text" ref={inputRef} />
            <div className="three fields">
              <Field
                value={formState.artist}
                onInput={handleInput}
                label="Author"
                placeholder="John Williams"
                name="artist"
                required
              />
              <Field
                value={formState.title}
                onInput={handleInput}
                label="Track name"
                placeholder="Imperial March"
                name="title"
              />
              <Field value={formState.length} onInput={handleInput} label="Length" placeholder="3:44" name="length" />
            </div>
            <div className="three fields">
              <Field
                value={formState.spotifyURL}
                onInput={handleInput}
                label="Spotify URL"
                placeholder="https://"
                name="spotifyURL"
              />
              <Field
                value={formState.lyricsURL}
                onInput={handleInput}
                label="Lyrics URL"
                placeholder="https://"
                name="lyricsURL"
              />
              <Field
                value={formState.chordsURL}
                onInput={handleInput}
                label="Guitar tab URL"
                placeholder="https://"
                name="chordsURL"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="actions">
        <button onClick={onClose} className="ui black deny button">
          Cancel
        </button>
        <button type="submit" className="ui positive right labeled icon button">
          {isEdit ? "Edit track" : "Add track"}
          <i className="plus icon"></i>
        </button>
      </div>
    </Modal>
  );
}
