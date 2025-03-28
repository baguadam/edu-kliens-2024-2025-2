import { exampleTracks } from "./track";

export const examplePlaylists = [
  {
    id: "1",
    title: "Soft Metal",
    tracks: exampleTracks.slice(0, 4).map(track => track.id),
  },
  {
    id: "2",
    title: "Classics",
    tracks: exampleTracks.slice(0, 3).map(track => track.id),
  },
  {
    id: "3",
    title: "Movie Soundtracks",
    tracks: exampleTracks.slice(2, 3).map(track => track.id),
  },
];
