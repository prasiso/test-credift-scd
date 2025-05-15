"use client";
import { TabPanel, Tabs } from "@/components";
import { ListEntrie, ListHistory, ListFavorite } from "./list";
import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useWordListStore } from "@/store";
import { useEffect, useState } from "react";
export function   GetListEntries() {
  const searchParms = useSearchParams();
  const [entrie, setEntrie] = useState('');

  const setResult = useWordListStore((set) => set.setResult);
  const tabs = [
    {
      label: "Word",
      type: "word",
    },
    {
      label: "History",
      type: "history",
    },
    {
      label: "Favorite",
      type: "favorite",
    },
  ] as { label: string; type: "word" | "history" | "favorite" }[];

  const changeTab = (
    ind: number,
    tab: { label: string; type: "word" | "history" | "favorite" }
  ) => {
    setResult({
      tab: tab.type,
    });
  };
  useEffect(() => {
    setResult({
      tab: "word",
    });
  }, []);
  useEffect(() => {
    setEntrie(searchParms.get("entrie") || "");
  }, [searchParms.get("entrie")]);
  return (
    <AnimatePresence>
      <motion.div
        className={[
          " flex w-full p-4 justify-center items-center  lg:block ",
          entrie ? "hidden" : "",
        ].join(" ")}
      >
        <Tabs changeTab={changeTab}>
          {tabs.map((tab, ind) => (
            <TabPanel key={ind} label={tab.label} type={tab.type}>
              <ListEntrie className={tab.type !== "word" ? "hidden" : ""} />
              {tab.type === "history" && <ListHistory />}
              {tab.type === "favorite" && <ListFavorite />}
            </TabPanel>
          ))}
        </Tabs>
      </motion.div>
    </AnimatePresence>
  );
}
