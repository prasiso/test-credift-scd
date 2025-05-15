'use client'
import { EntriesGetEntries } from "@/services";
import { useWordListStore } from "@/store";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { ComponentListEntrie } from "./ComponentListEntrie";
import { useUI } from "@/context";
import { catchException } from "@/helper";
import { useUpdateState } from "@/hooks";
export function ListEntrie({ className }: { className?: string }) {
  const result = useWordListStore((state) => state.result);
  const setResult = useWordListStore((state) => state.setResult);
  const resetSearch = useWordListStore((state) => state.resetSearch);
  const router = useRouter();
  const fetchRequest = useRef<boolean>(false);
  const { showAlert, setLoading } = useUI();
  const time = useRef<NodeJS.Timeout | null>(null);
  const searchParms = useSearchParams();
  const searchString = searchParms.get("search") ?? "";
  const entrie = searchParms.get("entrie");
  function UpdateQuery() {
    const query = new URLSearchParams();
    query.set("page", String(result.page));
    query.set("limit", String(result.limit));
    query.set("search", result.search ?? "");
    query.set("entrie", result.entrie ?? "");
    router.push(`?${query.toString()}`, { scroll: false });
  }

  useEffect(() => {
    setResult({
      entrie: entrie ?? "",
    });
  }, [entrie]);
  async function clickWord(entrie: string) {
    if (result.entrie === entrie) {
      result.entrie = "";
      UpdateQuery();
      return await setResult({
        entrie: "",
      });
    }

    await setResult({
      entrie,
    });
    result.entrie = entrie;
    UpdateQuery();
  }
  const fetchData = async ({
    limit,
    page,
    search,
  }: {
    limit: number;
    page: number;
    search: string;
  }) => {
    try {
      if (fetchRequest.current) return;
      fetchRequest.current = true;
      const res = await EntriesGetEntries({
        page,
        limit,
        search,
      });
      const data = [
        ...result.data,
        ...res.results.map((res: string) => ({ word: res })),
      ];
      if (!data.length)
        showAlert({ type: "info", message: "Not found list of word" });

      setResult({
        data,
        hasNext: res.hasNext,
        hasPrev: res.hasPrev,
        totalDocs: res.totalDocs,
      });
      result.data = data;
      result.hasNext = res.hasNext;
      result.hasPrev = res.hasPrev;
    } catch (error) {
      const message = catchException(error);
      showAlert({ type: "error", message });
    } finally {
      fetchRequest.current = false;
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!searchString) return;
    setResult({ search: searchString });
  }, [searchString]);
useUpdateState(
    (init:boolean) => {
      if (init && result.tab == "word") {
        setLoading(true)
        resetSearch();
      }
      const limit = Number(searchParms.get("limit") || "50");
      const page = Number(searchParms.get("page") || "1");
      const search = searchString;
      if (
        result.tab !== "word" ||
        (!init && limit !== result.limit) ||
        page !== result.page ||
        search !== result.search
      )
        return;

      setResult({
        limit,
        page,
        search,
      });
      fetchData({ limit, page, search });
    },
    [searchParms.get("page"), searchString],
    true
  );
  useEffect(() => {
    UpdateQuery();
  }, [result.page]);
  

  function actionSearch(inp: string) {
    setResult({ search: inp });
    if (time.current) {
      clearTimeout(time.current);
    }
    time.current = setTimeout(() => {
      setLoading(true);
      resetSearch();
      let queryParams = `search=${inp}`;
      searchParms.forEach((value, key) => {
        if (key === "search") return;
        queryParams += `&${key}=${value}`;
      });
      router.push(`?${queryParams}`, { scroll: false });
    }, 1500);
  }
  async function LoadMore() {
    const limit = Number(searchParms.get("limit") || "50");
    const page = Number(searchParms.get("page") || "1") + 1;
    await setResult({ page, limit });
  }
  return (
    <div className={className}>
      <ComponentListEntrie
        data={result.data}
        totalDocs={result.totalDocs}
        hasMore={result.hasNext}
        onLoadMore={LoadMore}
        search={result.search}
        wordActive={result.entrie}
        onSearchChange={actionSearch}
        clickWord={clickWord}
      />
    </div>
  );
}
