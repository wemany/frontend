"use client"

import { Fingerprint, LogIn, LogOut, Settings, User2 } from "lucide-react";
import ButtonWithIcon from "./ButtonWithIcon";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";

const ButtonLogIn = () => {
    const router = useRouter();
    return <ButtonWithIcon
        size="lg"
        className="border-y-[1px] bg-purple-400 hover:bg-purple-600  border-purple-300 hover:border-purple-500"
        label="LogIn"
        icon={LogIn}
        onClick={() => { router.push("/auth/login"); }}
    />
}

const ButtonLogUp = () => {
    const router = useRouter();
    return <ButtonWithIcon
        size="lg"
        className="bg-gray-600 hover:bg-gray-700"
        label="LogUp"
        icon={Fingerprint}
        onClick={() => { router.push("/auth/register"); }}
    />
}

const ButtonLogOut = () => {
    return <ButtonWithIcon
        size="lg"
        variant="default"
        className="p-0 hover:scale-105 hover:text-red-500 transition-all"
        label="LogOut"
        icon={LogOut}
        onClick={() =>
            signOut({
                callbackUrl: "/",
            })
        }
    />
}

const ButtonProfile = () => {
    const router = useRouter();
    return <ButtonWithIcon
        size="lg"
        variant="default"
        className="p-0 hover:scale-105 hover:text-purple-500 transition-all"
        label="Profile"
        icon={User2}
        onClick={() => { router.push("/profile"); }}
    />
}

const ButtonDetails = ({ param }: { param: string }) => {
    const [isDisabled, setIsDisabled] = useState(false);
    const router = useRouter();

    const handleClick = () => {
        // Deshabilitar el botón inmediatamente al hacer clic
        setIsDisabled(true);
        // Redirigir a la nueva página
        router.push(`/${param}`);
    };
    return <ButtonWithIcon
        label="Administrar"
        size="sm"
        icon={Settings}
        position="left"
        className="bg-purple-700/50 p-2 rounded-full hover:bg-purple-900 hover:scale-105 transition-all duration-300 cursor-pointer"
        onClick={handleClick}
        disabled={isDisabled}
    />
}


export { ButtonLogIn, ButtonLogUp, ButtonLogOut, ButtonProfile, ButtonDetails };