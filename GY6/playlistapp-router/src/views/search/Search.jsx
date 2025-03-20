import { Track } from "./Track";
import { exampleTracks } from "../../domain/track";

export function Search() {
  const tracks = exampleTracks.slice(0,5);
  return (
    <div className="join join-vertical w-full bg-base-300 shadow-xl overflow-x-hidden h-full pb-3 mt-5">
      <div className="join-item h-32 px-4 pt-1 ">
        <h2 className="join-item flex-1 text-2xl font-bold my-3">Search</h2>
        <label className="input input-bordered flex items-center w-full mx-auto p-5">
          <input type="text" className="grow" placeholder="Search" />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
        </label>
      </div>
      <div className="relative">
        <span className="absolute opacity-70 bg-base-300 w-full h-full z-10">
            <div className="h-[65%] left-1/2 top-1/2 transform  translate-x-1/2  translate-y-1/2 z-10">
              <div className="loading loading-spinner loading-lg"></div>
            </div>
        </span>
        <div className="overflow-y-scroll w-full join join-vertical pl-[0.6rem] overflow-hidden z-0">
          {tracks.map((track) => (
            <Track track={track} key={track.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
