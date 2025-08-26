import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar"
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { ButtonLogOut, ButtonProfile } from "../Buttons/ButtonsAuth";
import { User } from "next-auth";

const ProfileSection = ({ user }: { user: User }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild
                className="hover:bg-gray-800/30 transition-colors rounded-full"
            >
                <Button className="flex flex-row items-center justify-between w-full">
                    <DropdownMenuLabel className="flex flex-row gap-2 p-0 items-center justify-center">
                        <div className="w-7 h-7 bg-gray-600 rounded-full p-1">
                            <Avatar>
                                <AvatarImage src="/icons/icon-profile.png" />
                                <AvatarFallback className="bg-purple-500 font-bold text-lg" />
                            </Avatar>
                        </div>
                        <h3 className="font-bold">
                            {user.name}
                        </h3>
                    </DropdownMenuLabel>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-950 w-56" align="center">
                <DropdownMenuGroup className="flex flex-col items-end">
                    <DropdownMenuItem>
                        <ButtonProfile />
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <ButtonLogOut />
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ProfileSection;