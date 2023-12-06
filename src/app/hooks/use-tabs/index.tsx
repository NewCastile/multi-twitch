/* eslint-disable no-console */
"use client";

import { InstanceOptions, TabItem, Tabs } from "flowbite";
import { useEffect, useRef, useState } from "react";

import { BroadcasterBasicInfo } from "@/app/types";

const useTabs = ({
  tabsElementId,
  broadcasters,
}: {
  tabsElementId: InstanceOptions["id"];
  broadcasters: Array<BroadcasterBasicInfo>;
}) => {
  const tabsElementRef = useRef<HTMLUListElement>(null);
  const tabPanelsParentRef = useRef<HTMLDivElement>(null);
  const tabs = useRef<Tabs | null>(null);

  const [tabElements, setTabElements] = useState<Array<TabItem>>([]);

  useEffect(() => {
    if (tabsElementRef.current && tabPanelsParentRef.current) {
      try {
        const tabs = Array.from(tabsElementRef.current.children).map((item) => {
          if (item.firstElementChild) {
            return item.firstElementChild;
          } else {
            throw new Error("Missing tab element");
          }
        });

        const panels = Array.from(tabPanelsParentRef.current.children).map((item) => {
          if (typeof item === "object") {
            return item;
          } else {
            throw new Error("Missing panel element");
          }
        });

        setTabElements(() => {
          const newTabItems: Array<TabItem> = broadcasters.map((b, idx) => {
            const triggerEl = tabs[idx] as HTMLElement;
            const targetEl = panels[idx] as HTMLElement;

            return { id: b.broadcaster_login, triggerEl, targetEl };
          });

          return newTabItems;
        });
      } catch (error) {
        console.error(error);
      }
    }
  }, [broadcasters]);

  useEffect(() => {
    const [firstBroadcaster] = broadcasters;
    const options = {
      defaultTabId: firstBroadcaster.broadcaster_login,
      activeClasses: "text-monokai-red-primary",
      inactiveClasses: "text-monokai-yellow hover:text-monokai-yellow",
    };

    // instance options with default values
    const instanceOptions = {
      id: tabsElementId,
      override: true,
    };

    if (tabsElementRef.current) {
      if (tabsElementRef.current.id) {
        tabs.current = new Tabs(tabsElementRef.current, tabElements, options, instanceOptions);
      }
    }
  }, [broadcasters, tabElements, tabsElementId, tabsElementRef]);

  return { tabs: tabs.current, tabsElementRef, tabPanelsParentRef } as const;
};

export default useTabs;
