
import { _IGetRowAudio } from "@/types";

export function GetRowAudio({ country, text, audio, playAudio }: _IGetRowAudio) {
  function Submit() {
    playAudio({ country, text, audio });
  }
  return (
    <div className="flex items-center justify-between bg-white rounded-md p-3 shadow-sm">
      <div>
        <p className="text-lg font-medium text-black">{text}</p>
        {country && <p className="text-sm text-gray-700 mt-1">{country}</p>}
      </div>
      {audio &&  <button
        onClick={Submit}
        aria-label="Play UK pronunciation"
        className="p-2 hover:bg-purple-200 rounded-md"
      >
        <svg
          className="w-5 h-5 fill-purple-700"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8 5v14l11-7z"></path>
        </svg>
      </button>}
      
    </div>
  );
}
