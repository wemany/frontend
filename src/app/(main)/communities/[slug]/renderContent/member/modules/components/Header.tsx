"use client"

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { ArrowLeft, Dot, Wand2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Header = ({ moduleName }: { moduleName: string | null }) => {
    const router = useRouter();

    return (
        <header className="flex justify-between z-20 h-20 items-center gap-2 border-b border-gray-500 px-4">
            <div className="flex items-center gap-4">
                <Button onClick={() => { router.back() }}>
                    <ArrowLeft />
                </Button>
                <div className="flex items-center gap-3">
                    <div className="flex aspect-square size-8 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 text-white">
                        <Wand2 className="size-4" />
                    </div>
                    <div>
                        <h1 className="text-lg font-semibold text-white">{moduleName}</h1>
                        <p className="text-sm text-slate-400">Clase 1 de 7</p>
                    </div>
                </div>            </div>
            <div className='flex justify-center items-center gap-2'>
                <Badge className='bg-green-600/20 text-green-400 border-green-500/30 animate-pulse rounded-full '>
                    <Dot />
                    47 Viendo ahora
                </Badge>
                <SidebarTrigger />
            </div>
        </header>
    );
};

export default Header;