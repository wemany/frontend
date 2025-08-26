"use client"

import React, { Suspense } from "react";
import { useGetModuleDetails } from "./hooks/useGetModuleDetails";
import { useParams } from "next/navigation";
import { useLocalStorage } from "@/hooks/useLocalStorage";
const ModuleDetailsManager = React.lazy(() => import("../../renderContent/admin/modules/[moduleId]/ModuleDetailsManager"))

const ModuleDetailsMember = React.lazy(() => import("../../renderContent/member/modules/[moduleId]/ModuleDetailsMember"));

const ModuleDetailsPage = () => {
    const params = useParams();
    const moduleId = params.moduleId as string;

    const [isOwnerString] = useLocalStorage<string>('isCommunityOwner', 'false');
    const isOwner = isOwnerString === 'true';

    const { module, error, isLoading } = useGetModuleDetails(moduleId);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <main className="py-5">
            <Suspense>
                {isOwner ? (
                    <ModuleDetailsManager module={module} />
                ) : (
                    <ModuleDetailsMember />
                )}
            </Suspense>
        </main>
    );
}

export default ModuleDetailsPage;