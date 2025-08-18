"use client"

import { Plus, Rocket, Sparkles, Users } from "lucide-react"
import CreateCommunityModal from "../components/CreateCommunityModal";
import { useCommunityData } from "../hooks/useCommunityData";
import { useCommunityActions } from "../hooks/useCommunityAction";
import { CreateCommunityForm } from "../lib/schema/community.schema";
import CardCommunity from "../components/ui/CardCommunity"
import { MyCommunities } from "../types/profile.type";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import LoadingOverlay from "../components/LoadingOverlay";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const communityCreationSteps = [
    { id: 1, text: "Configurando tu comunidad", icon: Users, duration: 1000 },
    { id: 2, text: "Preparando el espacio", icon: Sparkles, duration: 1200 },
    { id: 3, text: "Finalizando detalles", icon: Rocket, duration: 800 },
];

const MyCommunitiesSection = ({ communities }: { communities: MyCommunities[] }) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const { isLoading: isCommunityDataLoading, isDialogOpen, data, setIsDialogOpen, handleCloseDialog, fetchCommunityData } = useCommunityData()
    const { isCreating, communityName, hasCreationError, handleCreationError, handleCreationComplete, handleCreateCommunity } = useCommunityActions(setIsDialogOpen);

    useEffect(() => {
        const shouldOpenModal = searchParams.get('openCreateModal');
        if (shouldOpenModal === 'true' && !isDialogOpen) {
            fetchCommunityData();
            const newSearchParams = new URLSearchParams(searchParams.toString());
            newSearchParams.delete('openCreateModal');
            router.replace(`?${newSearchParams.toString()}`, { scroll: false });
        }
    }, [searchParams, isDialogOpen, fetchCommunityData, router]);

    const handleSubmitCommunity = async (formData: CreateCommunityForm) => {
        if (!data) {
            console.error("Community data (categories, languages, currencies) is not loaded yet. Cannot create community.");
            // Optionally, show a user-friendly message to the user
            return;
        }
        await handleCreateCommunity(formData, data);
        setIsDialogOpen(false);
    };

    return (
        <>
            <div className="flex flex-col gap-5 p-3 border rounded-2xl border-gray-800">
                <div className="flex justify-between items-center">
                    <h2 className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Mis Comunidades
                    </h2>
                    {communities.length !== 0 &&
                        <Button
                            className={`bg-purple-700/50 rounded-full hover:bg-purple-900 hover:scale-105 transition-all duration-300 cursor-pointer ${isCommunityDataLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={fetchCommunityData}
                            disabled={isCommunityDataLoading}
                        >
                            {isCommunityDataLoading ? 'Cargando...' : <div className="flex items-center gap-2">
                                <Plus className="h-4 w-4" />
                                <span>Crear Comunidad</span>
                            </div>}
                        </Button>}
                </div>
                <ScrollArea className="h-[350px]">
                    <div className="space-y-4 px-5">
                        {communities.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center py-10">
                                <p className="text-gray-400 text-lg mb-4">
                                    Parece que aún no has creado ninguna comunidad.
                                </p>
                                <p className="text-gray-500 text-sm">
                                    ¡Es el momento perfecto para empezar una nueva!
                                </p>
                                <Button
                                    className="bg-purple-700/50 p-2 rounded-full hover:bg-purple-900 hover:scale-105 transition-all duration-300 cursor-pointer mt-6"
                                    onClick={fetchCommunityData}
                                    disabled={isCommunityDataLoading}
                                >
                                    {isCommunityDataLoading ? 'Cargando...' : 'Crea tu primera comunidad'}
                                </Button>
                            </div>
                        ) : (
                            communities.map((community) => (
                                <CardCommunity key={community.id} community={community} />
                            ))
                        )}
                    </div>
                </ScrollArea>
            </div>
            {data && <CreateCommunityModal communityData={data} open={isDialogOpen} onOpenChange={handleCloseDialog} onSubmit={handleSubmitCommunity} />
            }

            <LoadingOverlay
                isOpen={isCreating}
                title="Creando tu comunidad"
                description={
                    <>
                        Estamos preparando{" "}
                        <span className="text-purple-400 font-medium">{communityName}</span>
                    </>
                }
                completionTitle="¡Comunidad creada!"
                completionDescription={
                    <>
                        <span className="text-green-400 font-medium">{communityName}</span> está lista.
                        Redirigiendo a los detalles...
                    </>
                }
                errorTitle="Error al crear la comunidad"
                errorDescription={
                    <>
                        No pudimos crear <span className="text-red-400 font-medium">{communityName}</span>. Por favor, intenta de nuevo.
                    </>
                }
                steps={communityCreationSteps}
                hasError={hasCreationError}
                onError={handleCreationError}
                onComplete={handleCreationComplete}
            />
        </>
    )
}

export default MyCommunitiesSection