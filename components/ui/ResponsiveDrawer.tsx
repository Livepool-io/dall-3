"use client"

import { FC, useState, useEffect, ReactNode } from 'react'
import { Button } from "@/components/ui/button"
import { Drawer } from "vaul"
import { X } from 'lucide-react'

interface DrawerProps {
    children: ReactNode
    trigger: ReactNode
}

export const ResponsiveDrawer: FC<DrawerProps> = ({ trigger, children }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <Drawer.Root direction={isMobile ? "bottom" : "right"}>
            <Drawer.Trigger asChild>
                {trigger}
            </Drawer.Trigger>
            <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                <Drawer.Content className={`bg-gray-800 text-white overflow-hidden flex flex-col
                    ${isMobile
                        ? 'rounded-t-[10px] h-[90vh] w-full fixed bottom-0'
                        : 'rounded-l-[10px] w-[400px] max-w-[90vw] fixed bottom-0 right-0 top-0'
                    }`}>
                    <div className={`flex-1 h-full overflow-y-auto
                        ${isMobile ? 'p-4 pt-2' : 'p-6'}`}>
                        <div className="flex justify-end mb-4">
                            <Drawer.Close asChild>
                                <Button variant="ghost" size="icon">
                                    <X className="h-4 w-4" />
                                </Button>
                            </Drawer.Close>
                        </div>
                        {children}
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    );
}

export default ResponsiveDrawer;