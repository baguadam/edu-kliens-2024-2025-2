import { useEffect, useState } from "react";
import { exampleTracks } from "../domain/track";

const useTracksService = () => {
  // States
  const [tracks, setTracks] = useState(JSON.parse(window.localStorage.getItem("tracks")) || exampleTracks);

  // Effects
  useEffect(() => {
    window.localStorage.setItem("tracks", JSON.stringify(tracks));
  }, [tracks]);

  // Operations
  const addTrack = (track) => {
    track.id = Math.random().toString();
    setTracks([...tracks, track]);
  };

  const editTrack = (track) => {
    setTracks(tracks.map((tr) => (tr.id !== track.id ? tr : track)));
  };

  const deleteTrack = (id) => {
    setTracks(tracks.filter((track) => track.id !== id));
  };

  return { tracks, addTrack, editTrack, deleteTrack };
};

export default useTracksService;
