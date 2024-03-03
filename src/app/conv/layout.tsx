'use client'

import SidebarStatus from "@/components/sidebarStatus";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div className="flex bg-[#0f1e46]  w-full ">
            <SidebarStatus />
            {children}
        </div>
    );
}
