import { Button, Modal } from "react-daisyui";

const Field = ({ size, label, placeholder, name }) => {
  return (
    <div className={`md:${size} w-full p-2`}>
    <label className="form-control">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input type="text" placeholder={placeholder} name={name} className="input input-bordered w-full max-w-xs" />
    </label>
  </div>
  );
};

// const defaultState = {
//   artist: "",
//   title: "",
//   length: "",
//   thumbnailURL: "",
//   spotifyURL: "",
//   chordsURL: "",
//   lyricsURL: "",
// };

export function TrackForm({ Dialog, handleShow }) {
  return (
    <div className="font-sans">
      <Dialog>
        <Modal.Header className="font-bold text-lg">Add new track</Modal.Header>
        <Modal.Body className="py-4">Press ESC key or click outside to close</Modal.Body>
        
        <div className="flex flex-wrap">
          <Field size="w-1/2" label="Artist" placeholder="Bon Jovi" name="artist"/>
          <Field size="w-1/2" label="Title" placeholder="It's my life" name="title" />
          <Field size="w-4/12" label="Length" placeholder="03:14" name="length" />
          <Field size="w-8/12" label="ThumbnailURL" placeholder="It's my life" name="thumbnailURL" />
          <Field size="w-6/12" label="ChordsURL" placeholder="It's my life" name="chordsURL" />
          <Field size="w-6/12" label="LyricsURL" placeholder="It's my life" name="lyricsURL" />
          <Field size="w-5/12" label="SpotifyURL" placeholder="It's my life" name="spotifyURL" />

          <div className="w-5/12 p-2">
            <label className="form-control">
              <div className="label">
                <span className="label-text">Rating</span>
              </div>
              <div className="rating mt-2 mb-5">
                <input type="radio" name="rating-4" className="mask mask-star-2 bg-accent"  value="1" />
                <input type="radio" name="rating-4" className="mask mask-star-2 bg-accent"  value="2" />
                <input type="radio" name="rating-4" className="mask mask-star-2 bg-base-300"  value="3"/>
                <input type="radio" name="rating-4" className="mask mask-star-2 bg-base-300"  value="4"/>
                <input type="radio" name="rating-4" className="mask mask-star-2 bg-base-300"  value="5"/>
              </div>
            </label>
          </div>
          <div className="w-2/12 text-center align-bottom">
            <Modal.Actions>
              <form method="dialog" className="">
                <Button className="btn btn-primary mt-5 p-2 mr-2 flex flex-center w-20  font-bold">
                  Save
                </Button>
              </form>
            </Modal.Actions>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
