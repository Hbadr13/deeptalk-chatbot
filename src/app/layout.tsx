'use client'

import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "@/components/provider";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ['greek'] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navigations = [
    { label: 'chat', link: '/' },
    { label: 'saved_Q', link: '/savedquestion/' },
    { label: 'saved_R', link: '/savedresponses/' },
    { label: 'favorite', link: '/favorite/' }
  ]
  const pathname = usePathname()

  useEffect(() => {
    navigations.map((itm: any) => {
      if (itm.link == pathname) {
        console.log('pathname', itm.label)
        setOption(itm.label)
        return
      }
    })
  }, [pathname])

  const [option, setOption] = useState('chat')
  return (
    <html lang="en" >
      <body className={inter.className}>
        <Provider >
          <div className={`flex ${(pathname == '/auth/signin/' || pathname == '/auth/signup/') ? '' : 'bg-[#0f1e46]'} `}>
            <Navbar />
            <Sidebar option={option} setOption={setOption} />
            {children}
          </div>
        </Provider>
      </body>
    </html >
  );
}
