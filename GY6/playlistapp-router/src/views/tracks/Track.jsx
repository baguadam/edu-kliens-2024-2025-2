import { BsMusicNoteBeamed as TrackIcon } from "react-icons/bs";
import { FaPlus as PlusIcon } from "react-icons/fa";
import { FaTrash as TrashIcon } from "react-icons/fa";
import { FaEdit as EditIcon } from "react-icons/fa";

export function Track({ track }) {
  return (
    <div className="join-item items-start  my-auto bg-base-300 border-0">
    <div className="flex p-3 w-[100%] hover:bg-base-100 rounded-lg items-center">
      <div className="w-4/12 font-bold text-left">
        <TrackIcon className="inline mr-2" />{track.artist}
      </div>
      <div className="w-9/12 text-left">
        {track.title}
      </div>
      <div className="actions w-2/12 text-right justify-end flex">
      <div className="btn bg-neutral px-1 rounded-lg mr-2 w-12 h-12 hover:bg-base-100">
          <EditIcon />
        </div>
        <div className="btn bg-red-400 px-1 rounded-lg mr-2 w-12 h-12  hover:bg-red-600">
          <TrashIcon />
        </div>
      </div>
    </div>
  </div>
  );
}
