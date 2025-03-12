import { exampleTracks } from "./track";

export const examplePlaylists = [
  {
    id: 1,
    title: "Heavy Metal",
    tracks: exampleTracks.slice(0, 4),
  },
  {
    id: 2,
    title: "Classics",
    tracks: exampleTracks.slice(0, 3),
  },
  {
    id: 3,
    title: "Movie Soundtracks",
    tracks: exampleTracks.slice(2, 3),
  },
];
