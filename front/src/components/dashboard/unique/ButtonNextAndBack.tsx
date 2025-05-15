"use client";
import {
  useWordListStore,
  useHistoryListStore,
  useFavoriteListStore,
} from "@/store";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { _IDataComponent } from "../list/interface";
export function ButtonNextAndBack() {
  const query = useSearchParams();
  const result = useWordListStore((state) => state.result);
  const dataHistory = useHistoryListStore((state) => state.data);
  const dataFavorite = useFavoriteListStore((state) => state.data);
  const entrie = query.get("entrie");
  const [hasPrev, setHasPrev] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const router = useRouter();

  function updateEntrie(entries: string) {
    const params = new URLSearchParams(query.toString());
    params.set("entrie", entries);
    router.push(`?${params.toString()}`);
  }

  useEffect(() => {
    validNextOrBack();
  }, [entrie, result.tab]);
  function validNextOrBack() {
    const { ind, data } = foundEntrie();
    setHasNext(false);
    setHasPrev(false);
    if (!data.length) {
      setHasNext(true);
      setHasPrev(true);
    }
    if (!data[ind + 1]) {
      setHasNext(true);
    }
    if (!data[ind - 1]) {
      setHasPrev(true);
    }
  }
  

  function foundEntrie() {
    const data = whichStoreToUse();
    const ind = data.findIndex((ind: _IDataComponent) => ind.word === entrie);
    return { ind, data };
  }

  function whichStoreToUse() {
    const notRepat = (data: _IDataComponent[]) => {
      return data.filter((value, ind, array) => {
        const index = array.findIndex((i) => i.word === value.word);
        return index == ind;
      });
    };
    if (result.tab === "history") {
      return notRepat(dataHistory);
    }

    if (result.tab === "favorite") {
      return notRepat(dataFavorite);
    }

    return result.data;
  }

  function nextOrBack(isPlus = true) {
    const { ind, data } = foundEntrie();
    if (ind === -1) {
      if (!data.length) return;
      const { word } = data[0];
     return updateEntrie(word);
    }

    const newEntrie = data[isPlus ? ind + 1 : ind - 1];
    if (!newEntrie) {
      return;
    }
    updateEntrie(newEntrie?.word);
  }

  function onBack() {
    nextOrBack(false);
  }

  function onNext() {
    nextOrBack(true);
  }

  return (
    <div className="mt-6 flex justify-start space-x-3">
      <button
        onClick={onBack}
        disabled={hasPrev}
        className="disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500
 bg-gray-300 text-black px-4 py-2 rounded-md text-sm hover:bg-gray-400 transition"
      >
        Back
      </button>
      <button
        onClick={onNext}
        disabled={hasNext}
        className="bg-purple-700 text-white px-5 py-2 rounded-md text-sm hover:bg-purple-800 transition
         disabled:bg-purple-300 disabled:text-white disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
}
