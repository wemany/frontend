"use client"

import { useCommunityMembership } from "./hooks/useCommunityMembership";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import React, { Suspense, useEffect } from "react";
import SkeletonLoaderDetailsCommunity from "./renderContent/admin/modules/components/ui/SkeletonLoaderDetailsCommunity";
const AdminCommunityView = React.lazy(() => import("./renderContent/admin/AdminCommunityView"));
const MemberCommunityView = React.lazy(() => import("./renderContent/member/MemberCommunityView"));


const CommunityDetailsPage = () => {
    const { data: session } = useSession()
    const params = useParams();
    const slug = params.slug as string;

    const { isLoading, data, error } = useCommunityMembership({ slug });

    const community = data?.community;
    const isOwner = community?.ownerId === session?.user.id;

    useEffect(() => {
        if (community && session?.user?.id) {

            if (isOwner) {
                localStorage.setItem("isCommunityOwner", 'true');
                localStorage.setItem("communityId", community.communityId);
            } else {
                localStorage.removeItem('isCommunityOwner');
                localStorage.removeItem('communityId');
            }
        }
    }, [community, isOwner, session]);

    // TODO: Agregar el Card Para Modificar los planes
    if (isLoading) {
        return (
            <div className="px-10 py-5">
                <SkeletonLoaderDetailsCommunity />
            </div>
        );
    }

    if (error || !community) {
        return (
            <div className="min-h-screen w-full max-w-7xl mx-auto bg-gray-900 flex flex-col justify-center items-center text-red-500 text-xl">
                No se pudo cargar la información de la comunidad.
            </div>
        );
    }

    return (
        <main className="py-5">
            <Suspense>
                {isOwner ? (
                    <AdminCommunityView community={community} slug={slug} />
                ) : (
                    <MemberCommunityView community={community} slug={slug} />
                )}
            </Suspense>
        </main>
    );
}

export default CommunityDetailsPage;