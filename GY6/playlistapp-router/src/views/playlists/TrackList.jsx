import cn from "classnames";
import { BsMusicNoteBeamed as TrackIcon} from "react-icons/bs";
import { examplePlaylists } from "../../domain/playlist";


export function TrackList({selectedPlaylist, selectedTrackId, setSelectedTrackId}) {
  return (
    <>
    <div className="join join-vertical w-full bg-base-300 shadow-xl overflow-x-hidden h-full">
      <h2 className="join-item text-2xl font-bold p-3">Tracks of {selectedPlaylist.title}</h2>
      <div className="overflow-y-scroll w-full join join-vertical pl-[0.6rem]  overflow-hidden">
        {selectedPlaylist.tracks.map((track) => (
            <div className={`btn rounded-lg items-start p-3 border-0 hover:bg-base-200 ${selectedTrackId === track.id ? "bg-base-200" : "bg-base-300"}`} onClick={()=> setSelectedTrackId(track.id)}>
              <div className="flex px-5 w-[100%]">
                <div className="w-8/12 font-bold text-left">
                  <TrackIcon className="inline mr-2" />{track.title}
                </div>
                <div className="w-4/12 text-right">{track.artist}</div>
              </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
