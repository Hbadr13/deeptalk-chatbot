'use client'
import Main from "@/components/main";
import Sidebar from "@/components/sidebar";
import SidebarStatus from "@/components/sidebarStatus";
import { useState } from "react";
export default function Home() {
  const [idOfSelectedConv, setIdOfSelectedConv] = useState(0)
  const [option, setOption] = useState('chat')
  return (
    <div className="flex bg-[#0f1e46]  ">
      <Sidebar option={option} setOption={setOption} />
      <SidebarStatus option={option} idOfSelectedConv={idOfSelectedConv} setIdOfSelectedConv={setIdOfSelectedConv} />
      <Main idOfSelectedConv={idOfSelectedConv} />
    </div >
  );
}
