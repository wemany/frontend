"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

interface LinkNavbarProps { href: string, label: string }

const LinkNavbar = ({ href, label }: LinkNavbarProps) => {

    const pathname = usePathname()
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            className={`${isActive ? "text-purple-300 font-bold" : "text-gray-300 hover:text-white"
                } "transition-colors"`}
        >
            {label}
        </Link>
    )
}

export default LinkNavbar