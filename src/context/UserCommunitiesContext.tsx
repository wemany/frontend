"use client"

import { Community } from "@/components/Sidebar/types/community";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

interface UserCommunitiesContextType {
    userCommunities: Community[];
    isLoadingCommunities: boolean;
    addCommunity: (community: Community) => void;
    removeCommunity: (communityId: string) => void;
}

const UserCommunitiesContext = createContext<UserCommunitiesContextType | undefined>(undefined);

export const UserCommunitiesProvider = ({ children }: { children: React.ReactNode }) => {
    const { data: session, status } = useSession();
    const [userCommunities, setUserCommunities] = useState<Community[]>([]);
    const [isLoadingCommunities, setIsLoadingCommunities] = useState(true);

    useEffect(() => {
        if (status === "authenticated" && session?.user?.communities) {
            const communitiesFromSession = Object.values(session.user.communities) as Community[];
            const storedCommunities = localStorage.getItem('userCommunities');
            if (storedCommunities) {
                try {
                    const parsedStoredCommunities: Community[] = JSON.parse(storedCommunities);
                    if (parsedStoredCommunities.length >= communitiesFromSession.length) {
                        setUserCommunities(parsedStoredCommunities);
                    } else {
                        setUserCommunities(communitiesFromSession);
                        localStorage.setItem('userCommunities', JSON.stringify(communitiesFromSession));
                    }
                } catch (e) {
                    console.error("Error parsing user communities from localStorage", e);
                    setUserCommunities(communitiesFromSession);
                    localStorage.setItem('userCommunities', JSON.stringify(communitiesFromSession));
                }
            } else {
                setUserCommunities(communitiesFromSession);
                localStorage.setItem('userCommunities', JSON.stringify(communitiesFromSession));
            }
            setIsLoadingCommunities(false);
        } else if (status === 'loading') {
            setIsLoadingCommunities(true);
        } else {
            setIsLoadingCommunities(false);
            setUserCommunities([]);
            localStorage.removeItem('userCommunities');
        }
    }, [session, status]);

    useEffect(() => {
        if (!isLoadingCommunities) {
            localStorage.setItem('userCommunities', JSON.stringify(userCommunities));
        }
    }, [userCommunities, isLoadingCommunities]);


    const addCommunity = (newCommunity: Community) => {
        setUserCommunities((prevCommunities) => {
            if (!prevCommunities.some(c => c.id === newCommunity.id)) {
                return [...prevCommunities, newCommunity];
            }
            return prevCommunities;
        });
    };

    const removeCommunity = (communityId: string) => {
        setUserCommunities((prevCommunities) =>
            prevCommunities.filter(community => community.id !== communityId)
        );
    };

    return (
        <UserCommunitiesContext.Provider value={{ userCommunities, isLoadingCommunities, addCommunity, removeCommunity }}>
            {children}
        </UserCommunitiesContext.Provider>
    );
}

export const useUserCommunities = () => {
    const context = useContext(UserCommunitiesContext);
    if (context === undefined) {
        throw new Error('useUserCommunities must be used within a UserCommunitiesProvider');
    }
    return context;
};