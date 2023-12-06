"use client";

import { Drawer, DrawerOptions, InstanceOptions } from "flowbite";
import { useRef } from "react";

const defaultDrawerOptions: DrawerOptions = {
  placement: "right",
  backdrop: true,
  bodyScrolling: false,
  edge: false,
  edgeOffset: "",
  backdropClasses: "bg-stone-900/80 fixed inset-0 z-30",
};

const useDrawer = ({
  drawerId,
  override = true,
  options = defaultDrawerOptions,
}: {
  drawerId: InstanceOptions["id"];
  override?: InstanceOptions["override"];
  options?: DrawerOptions;
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  // instance options object
  const instanceOptions: InstanceOptions = {
    id: drawerId,
    override,
  };

  const drawer = new Drawer(drawerRef.current, options, instanceOptions);

  return { drawerRef, drawer } as const;
};

export default useDrawer;
