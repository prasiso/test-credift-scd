"use client";
import {
  Children,
  isValidElement,
  ReactElement,
  ReactNode,
  useState,
} from "react";
import { TabProps } from "./TabsType";

export const TabPanel = ({ children }: TabProps) => <>{children}</>;
TabPanel.displayName = "TabPanel";

export function Tabs({
  children,
  changeTab,
}: {
  children: ReactNode;
  changeTab?: (
    indActive: number,
    tab: { label: string; type: "word" | "history" | "favorite" }
  ) => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabs = Children.toArray(children).filter(
    (child): child is ReactElement<TabProps> => {
      if (!isValidElement(child)) return false;

      const type = child.type;

      const isNamedComponent =
        typeof type === "function" &&
        "displayName" in type &&
        (type as { displayName?: string }).displayName === "TabPanel";

      return isNamedComponent;
    }
  );
  const activeTab = (
    ind: number,
    tab: { label: string; type: "word" | "history" | "favorite" }
  ) => {
    setActiveIndex(ind);
    if (changeTab) changeTab(ind, tab);
  };
  return (
    <div className="w-full">
      <div className="text-sm font-medium text-center text-gray-500  ">
        <ul className="flex flex-wrap -mb-px">
          {tabs.map((tab, index) => (
            <li
              className={[
                "inline-block p-4  rounded-t-lg cursor-pointer hover:text-blue-600 border-b-2 hover:border-blue-600",
                activeIndex == index
                  ? "text-blue-600 border-blue-600 active"
                  : "border-transparent",
              ].join(" ")}
              key={index}
              onClick={() => {
                activeTab(index, tab.props);
              }}
            >
              <span>{tab.props.label}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4">{tabs[activeIndex]}</div>
    </div>
  );
}
