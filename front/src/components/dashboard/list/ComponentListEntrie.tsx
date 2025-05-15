import { Input } from "@/components";
import { useUI } from "@/context";
import { useEffect, useRef, useCallback } from "react";
import { _IComponentListEntrie, _IDataComponent } from "./interface";

export function ComponentListEntrie({
  data,
  wordActive,
  hasMore,
  onLoadMore,
  search,
  onSearchChange,
  totalDocs = 0,
  clickWord,
}:_IComponentListEntrie) {
  const observer = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const isRequest = useRef<boolean>(false);
  const { loading } = useUI();

  const lastElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting || loading || !hasMore || isRequest.current)
          return;
        isRequest.current = true;
        onLoadMore();
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, onLoadMore]
  );

  const itemActive = (word: string) => {
    return `${
      word === wordActive
        ? "border-blue-500 text-black"
        : "border-gray-300 text-gray-700"
    } flex border rounded px-3 py-1 bg-white text-center justify-center items-center cursor-pointer`;
  };

  useEffect(() => {
    isRequest.current = false;
  }, [data]);

  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-0  bg-white z-10 border-b items-center justify-between border-gray-300 p-2 flex flex-wrap ">
        <div className="md:w-1/2 sm:max-w-sm md:max-w-full">
          <Input
            label="Search"
            name="search"
            value={search}
            onChange={(e:React.ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
          />
        </div>
        <span className="text-blue-500 font-bold">Total Found: {Number(totalDocs).toLocaleString('pt-br')}</span>
      </div>

      <div className="flex-1 overflow-auto">
        <ul className="grid sm:grid-cols-3 md:grid-cols-5 gap-4 grid-flow-row auto-rows-[100px] h-[500px] font-sans text-base p-2">
          {data?.map((word: _IDataComponent, i: number) => (
            <li
              ref={data.length === i + 1 ? lastElementRef : null}
              key={i}
              className={itemActive(word.word)}
              onClick={() => clickWord(word.word)}
            >
              <div className="flex flex-col items-center">
                <span>{word.word}</span>
                {word.added && <span className="text-xs text-blue-500 mt-1">{word.added}</span>}
              </div>
            </li>
          ))}
        </ul>

        <div ref={sentinelRef} className="h-1" />
      </div>
    </div>
  );
}
