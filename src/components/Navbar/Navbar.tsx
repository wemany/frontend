"use client"

import { HelpCircle, Grip } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import LinkNavbar from "./LinkNavbar";
import ButtonWithIcon from "../Buttons/ButtonWithIcon";
import { ButtonLogOut, ButtonLogUp, ButtonLogIn } from "../Buttons/ButtonsAuth";

const Navbar = () => {
    const { data: session } = useSession();

    return (
        <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-6xl pb-32 px-4">
            <div className=" bg-transparent backdrop-blur-md border border-white rounded-4xl px-6 py-3">
                <div className="flex items-center justify-between">
                    <div className="w-32 h-14 mt-2 flex items-center">
                        <Image
                            src="/images/logo.png"
                            alt="logo"
                            width={168}
                            height={54}
                            className="mx-auto"
                        />
                    </div>

                    <nav className="hidden md:flex items-center space-x-8">
                        {session?.user ? (
                            <LinkNavbar href="/dashboard" label="Inicio" />
                        ) :
                            <LinkNavbar href="/" label="Inicio" />
                        }
                        <LinkNavbar href="/wemany" label="WeMany" />
                        <LinkNavbar href="/modules" label="Modules" />
                        <LinkNavbar href="/communities" label="Communities" />
                        <LinkNavbar href="/creators" label="Creators" />

                    </nav>
                    <div className="hidden md:flex items-center justify-center">

                        <ButtonWithIcon
                            size="icon"
                            icon={HelpCircle}
                            onClick={() => { }}
                        />
                        <ButtonWithIcon
                            size="icon"
                            icon={Grip}
                            onClick={() => { }}
                        />
                    </div>
                    <div className="flex items-center space-x-4">
                        {session?.user ? (
                            <ButtonLogOut />
                        ) : (
                            <>
                                <ButtonLogUp />
                                <ButtonLogIn />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Navbar;