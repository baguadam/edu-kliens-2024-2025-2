import cover from "../../assets/cover-without-text.png";

export function TrackDetails({selectedTrack}) {
  return (
    <div className="card md:card-side align-center  bg-base-300 shadow-xl h-full">
      <figure><img src={selectedTrack.thumbnailURL} alt="Movie" className="h-64 w-64 object-cover" /></figure>

      <div className="card-body p-3 my-auto ">
        <div className="md:flex md:flex-wrap p-5 ">
          <div className="md:w-8/12 w-full mx-auto">
            <h2 className="card-title font-bold text-2xl">{selectedTrack.title}</h2>
            <h2 className="card-title text-xl font-thin">{selectedTrack.artist}</h2>
            <div className="rating mt-2 mb-5">
              {Array.from({length: selectedTrack.rating}).map(e => <input type="radio" name="rating-4" className="mask mask-star-2 bg-accent" />)}
              {Array.from({length: 5-selectedTrack.rating}).map(e => <input type="radio" name="rating-4" className="mask mask-star-2 bg-neutral" />)}
            </div>
            <div className="card-actions p-2">
              <button className="btn btn-primary w-full md:w-1/6">Spotify</button>
              <button className="btn btn-primary w-full md:w-1/6">Youtube</button>
              <button className="btn btn-secondary w-full md:w-1/6">Lyrics</button>
              <button className="btn btn-secondary w-full md:w-1/6">Chords</button>
            </div>
          </div>
          <div className="card-actions md:w-4/12 w-full mt-5 my-auto h-32 md:justify-end">
            <img src={cover} alt="" className="h-full contrast-50 drop-shadow	brightness-25 opacity-60	mt-2" />
          </div>
        </div>
      </div>
    </div>
  );
}
