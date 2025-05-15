'use client';
import { useUI } from "@/context/UIContext";
import { catchException } from "@/helper";
import {
  EntriesGetEntrie,
  EntriesPostFav,
  EntriesPostUnFav,
  WordEntry,
} from "@/services";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IPropsRowAudio } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { useWordListStore } from "@/store";
import { FaStar } from "react-icons/fa";
import { ButtonNextAndBack, GetRowAudio } from "./unique";

export function GetUniqueEntrie() {
  const { showAlert, showLoading, setLoading } = useUI();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const router = useRouter();
  const [body, setBody] = useState<WordEntry | undefined>(undefined);
  const query = useSearchParams();
  const entrie = query.get("entrie");
  const setResult = useWordListStore((state) => state.setResult);
  const result = useWordListStore((state) => state.result);
  async function HandleSearchEntrie() {
    try {
      await showLoading(async () => {
        if (!entrie) {
          setBody(undefined);
          setResult({ entrie: "" });
          result.entrie = "";

          return;
        }
        const resp = await EntriesGetEntrie(String(entrie));
        resp.audio = resp.audio.sort((a, b) => (!a.audio && b.audio ? 1 : -1));
        setBody(resp);
      });
    } catch (error) {
      setLoading(false);
      await closeGetUnique();
      const message = catchException(error);
      await showAlert({ type: "error", message });
    } finally {
    }
  }
  function closeGetUnique() {
    setBody(undefined);
    setResult({
      entrie: "",
    });
    const params = new URLSearchParams(query.toString());
    params.set("entrie", "");
    router.push(`?${params.toString()}`)
  }

  async function setFav() {
    if (!body) return;
    const fav = !!!body?.fav;
    try {
      await showLoading(() =>
        fav ? EntriesPostFav(String(body.word)) : EntriesPostUnFav(body.word)
      );
      const message = fav
        ? "Favorite Word Successfully!"
        : "Word successfully unfavorite!";
      showAlert({ type: "success", message });
      body.fav = fav;
      setBody(body);
    } catch (error) {
      const message = catchException(error);
      showAlert({ type: "error", message });
    } finally {
      setLoading(false);
    }
  }

  async function playAudio(row: IPropsRowAudio) {
    if (!audioRef.current) audioRef.current = new Audio(row.audio);
    audioRef.current.currentTime = 0;
    await audioRef.current.play();
    audioRef.current = null;
  }
  useEffect(() => {
    HandleSearchEntrie();
  }, [query.get("entrie")]);

  return (
    <>
      <AnimatePresence>
        {body && (
          <motion.div
            layout
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className=" w-full lg:max-w-sm  bg-purple-50 rounded-lg p-5 shadow-sm relative z-10"
          >
            <div className="flex flex-nowrap justify-around items-center mb-4">
              <button
                aria-label="Close"
                onClick={closeGetUnique}
                className=" top-4 left-4 text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              <h1 className="text-center text-2xl font-semibold text-black ">
                {body.word} {body.phonetic && <span> - {body.phonetic} </span>}
              </h1>
              <button
                aria-label="Favorite"
                onClick={() => setFav()}
                className={`focus:outline-none ${
                  body.fav
                    ? "text-yellow-400"
                    : "text-gray-400 hover:text-yellow-400"
                }`}
              >
                <FaStar className="text-lg" />
              </button>
            </div>
            <ul className="list-disc list-inside overflow-y-auto space-y-4 mb-6 max-h-65">
              {body.audio.map((aud, ind) => (
                <GetRowAudio
                  key={ind}
                  audio={aud.audio}
                  country={aud.country}
                  text={aud.text}
                  playAudio={playAudio}
                />
              ))}
            </ul>

            <div>
              <p className="font-semibold text-black mb-3">Meanings</p>
              <ul className="list-disc list-inside text-gray-800 space-y-2 text-sm max-h-64 overflow-y-auto pr-2">
                {body?.meanings.map((row, ind) => (
                  <li key={ind}>
                    {row.speach} - {row.definition}
                  </li>
                ))}
              </ul>
            </div>
            <ButtonNextAndBack />
            {body.history?.created_at && (
              <div className="mt-4 pt-4 border-t border-gray-300 text-xs text-gray-600">
                Last visit:{" "}
                {new Date(body.history.created_at).toLocaleDateString("pt-br", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
