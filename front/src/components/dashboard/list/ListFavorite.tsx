"use client";
import { GetUserFavorite } from "@/services";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ComponentListEntrie } from "./ComponentListEntrie";
import { useUI } from "@/context";
import { catchException, format_date } from "@/helper";
import { useUpdateState } from "@/hooks";
import { useFavoriteListStore, useWordListStore } from "@/store";
import { _IDataComponent } from "./interface";

export function ListFavorite({ className }: { className?: string }) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalDocs, setTotalDocs] = useState(0);
  const data = useFavoriteListStore((set) => set.data);
  const setData = useFavoriteListStore((set) => set.setData);
  const [hasMore, setHasMore] = useState(false);
  const [refresh, setRefreshTrigger] = useState(0);
  const entrie = useWordListStore((state) => state.result.entrie);
  const setEntrie = useWordListStore((state) => state.setResult);
  const time = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();
  const query = useSearchParams();
  const didSearch = useRef(false);
  const fetchRequest = useRef<boolean>(false);
  const { showAlert, setLoading } = useUI();

  function UpdateQuery() {
    const current = query.get("entrie") ?? "";
    if (current === entrie || !entrie) return;
    const params = new URLSearchParams(query.toString());

    params.set("entrie", entrie);
    router.push(`?${params.toString()}`);
  }

  async function clickWord(entrie: string) {
    setEntrie({ entrie });
  }
  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      if (fetchRequest.current) return;
      fetchRequest.current = true;
      const res = await GetUserFavorite({
        page,
        limit: 50,
        search,
      });
      const words = res.results.map((item: _IDataComponent) => ({
        word: item.word,
        added: format_date(item?.added),
      }));
      const body = page === 1 ? [] : data;
      const updatedData = body.concat(words);

      if (!updatedData.length) {
        showAlert({ type: "info", message: "Not found list of word" });
      }
      setTotalDocs(res.totalDocs);
      setData(updatedData);
      setHasMore(res.hasNext);
    } catch (error) {
      const message = catchException(error);
      showAlert({ type: "error", message });
    } finally {
      fetchRequest.current = false;
      setLoading(false);
    }
  };
  useUpdateState(() => {
    setEntrie({ entrie: query.get("entrie") ?? "" });
  }, [query.get("entrie")]);

  useUpdateState(() => {
    fetchData();
  }, [page, refresh, query.get("entrie")]);

  useUpdateState(() => {
    if (!didSearch.current) return;
    if (time.current) clearTimeout(time.current);
    time.current = setTimeout(() => {
      didSearch.current = false;
      setLoading(true);
      setPage(1);
      setData([]);
      setRefreshTrigger((prev) => prev + 1);
      didSearch.current = true;
    }, 1500);
  }, [search]);

  useEffect(() => {
    UpdateQuery();
  }, [entrie]);

  function actionSearch(inp: string) {
    didSearch.current = true;
    setSearch(inp);
  }

  function LoadMore() {
    setPage((page) => page + 1);
  }
  useUpdateState(() => {
    setEntrie({ entrie: query.get("entrie") ?? "" });
  }, [query.get("entrie")]);
  return (
    <div className={className}>
      <ComponentListEntrie
        data={data}
        totalDocs={totalDocs}
        hasMore={hasMore}
        onLoadMore={LoadMore}
        search={search}
        wordActive={entrie}
        onSearchChange={actionSearch}
        clickWord={clickWord}
      />
    </div>
  );
}
