import { MdLibraryMusic as PlIcon } from "react-icons/md";
import { Link } from "react-router-dom";

export function PlaylistList({ playlists, setSelectedPlaylistId, selectedPlaylistId }) {
  return (
    <div className="join join-vertical w-full bg-base-300 shadow-xl h-full">
      <h2 className="join-item text-2xl font-bold p-3">Playlists</h2>
      <div className="overflow-y-scroll join join-vertical w-full pl-[0.6rem] overflow-hidden">
        {playlists.map((playlist) => (
          <Link
            className={`btn border-0 rounded-lg items-start p-3 hover:bg-base-200 ${
              selectedPlaylistId === playlist.id ? "bg-base-200" : "bg-base-300"
            }`}
            onClick={() => setSelectedPlaylistId(playlist.id)}
            to={`/playlists/${playlist.id}`}
          >
            <div className="flex px-5 w-[100%]">
              <div className="w-8/12 font-bold text-left">
                <PlIcon className="inline mr-2" />
                {playlist.title}
              </div>
              <div className="w-4/12 text-right">{playlist.tracks.length} songs</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
