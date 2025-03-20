import { exampleTracks } from "./track";

export const examplePlaylists = [
  {
    id: 1,
    title: "Rock Classics",
    tracks: exampleTracks.slice(0, 4),
  },
  {
    id: 2,
    title: "Pop Songs",
    tracks: [...exampleTracks.slice(5, 10), ...exampleTracks.slice(15, 20)],
  },
  {
    id: 3,
    title: "Movie Soundtracks",
    tracks: exampleTracks.slice(11,15),
  },
  {
    id: 4,
    title: "Top Songs",
    tracks: exampleTracks.slice(15, 20),
  },
  {
    id: 5,
    title: "Magyar Alter",
    tracks: exampleTracks.slice(20, 24),
  },
];
