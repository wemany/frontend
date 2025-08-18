import { Card, CardContent } from "@/components/ui/card";
import { useGetPlans } from "./hooks/useGetPlans";
import HeaderPlansManager from "./sections/HeaderPlansManager";
import InfoPlansManager from "./sections/InfoPlansManager";
import PlansListManager from "./sections/PlansListManager";
import { useGetRoles } from "../roles/hooks/useGetRoles";
import { useDeletePlan } from "./hooks/useDeletePlan";
import DeletePlanModal from "./components/DeletePlanModal";
import { useActionsOverlay } from "@/hooks/useModuleOverlay";
import { operationProps } from "./lib/planOperationsConfig";
import LoadingOverlay from "@/app/(main)/profile/components/LoadingOverlay";
import CreatePlanModal from "./components/CreatePlanModal";
import { useCreatePlan } from "./hooks/useCreatePlan";
import { useState } from "react";
import { useCommunityData } from "@/app/(main)/profile/hooks/useCommunityData";

const PlansManager = ({ communityId }: { communityId: string }) => {
    const [openModal, setOpenModal] = useState(false);
    // const [openEditModal, setOpenEditModal] = useState(false);

    const { data: roles } = useGetRoles(communityId);
    const { data: plans, error, isLoading } = useGetPlans(communityId);
    const { handleCreatePlan } = useCreatePlan(communityId);
    const { handleDeleteClick, isDialogDeleteOpen, setIsDialogDeleteOpen, planToDelete, setPlanToDelete, handleConfirmDelete: originalDeleteConfirm } = useDeletePlan(communityId);

    const { isLoading: isCommunityDataLoading, data: communityData,
        fetchCommunityData, } = useCommunityData()

    const handleOpenModal = async () => {
        await fetchCommunityData();
        setOpenModal(true);
    };

    const {
        isOverlayOpen,
        overlayError,
        currentProps,
        handleComplete,
        handleError,
        startOverlay,
    } = useActionsOverlay(operationProps);


    const handleDeletePlan = async () => {
        setIsDialogDeleteOpen(false);
        startOverlay("delete");
        await originalDeleteConfirm({ onComplete: handleComplete, onError: handleError });
    };

    return (
        <div className="space-y-6">
            <HeaderPlansManager setOpenModal={handleOpenModal} plansCount={plans?.length} isLoading={isCommunityDataLoading} />
            <InfoPlansManager />
            {error && <div className="mx-auto">
                <Card className="border-red-200 bg-red-50">
                    <CardContent className="p-6">
                        <p className="text-red-800">Error al cargar los planes. Por favor, intenta de nuevo.</p>
                    </CardContent>
                </Card>
            </div>}
            {isLoading ?
                <div className="mx-auto">
                    <p className="text-blue-800">Cargando planes...</p>
                </div> :
                <div>
                    <PlansListManager plans={plans} roles={roles || []} setOpenModal={() => { }} onEditPlan={() => { }} onDeletePlan={handleDeleteClick} />
                </div>
            }

            {communityData && <CreatePlanModal
                open={openModal}
                onOpenChange={setOpenModal}
                onSubmit={handleCreatePlan}
                data={communityData}
            />
            }
            <DeletePlanModal
                showDeletePlanModal={isDialogDeleteOpen}
                setShowDeletePlanModal={setIsDialogDeleteOpen}
                planToDelete={planToDelete}
                setPlanToDelete={setPlanToDelete}
                onConfirmDelete={handleDeletePlan}
            />

            <LoadingOverlay
                isOpen={isOverlayOpen}
                hasError={overlayError}
                title={currentProps?.title}
                description={currentProps?.description}
                completionTitle={currentProps?.completionTitle}
                completionDescription={currentProps?.completionDescription}
                errorTitle={currentProps?.errorTitle}
                errorDescription={currentProps?.errorDescription}
                steps={currentProps?.steps}
                onComplete={handleComplete}
                onError={handleError}
            />
        </div>
    );
}
export default PlansManager;