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
import { useCommunityData } from "@/app/(main)/profile/hooks/useCommunityData";
import { useUpdatePlan } from "./hooks/useUpdatePlan";
import { CreatePlanForm } from "./lib/schema/plan.schema";

const PlansManager = ({ communityId }: { communityId: string }) => {

    const { data: roles } = useGetRoles(communityId);
    const { data: plans, error, isLoading } = useGetPlans(communityId);
    const { isLoading: isCommunityDataLoading, data: communityData,
        fetchCommunityData } = useCommunityData();

    const { openModal, setOpenModal, handleSubmitPlan } = useCreatePlan(communityId, communityData);
    const { openModal: openEditModal, planToEdit, setOpenModal: setOpenEditModal, handleEditClick, handleSubmitUpdate } = useUpdatePlan(communityId, communityData, fetchCommunityData);
    const { handleDeleteClick, isDialogDeleteOpen, setIsDialogDeleteOpen, planToDelete, setPlanToDelete, handleConfirmDelete } = useDeletePlan(communityId);

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

    const handleCreatePlan = async (formData: CreatePlanForm) => {
        setOpenModal(false);
        startOverlay("create");
        await handleSubmitPlan(formData, { onComplete: handleComplete, onError: handleError });
    }

    const handleUpdatePlan = async (formData: CreatePlanForm) => {
        setOpenEditModal(false);
        startOverlay("update");
        await handleSubmitUpdate(formData, { onComplete: handleComplete, onError: handleError });
    };

    const handleDeletePlan = async () => {
        setIsDialogDeleteOpen(false);
        startOverlay("delete");
        await handleConfirmDelete({ onComplete: handleComplete, onError: handleError });
    };

    console.log({ communityData });

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
                    <PlansListManager plans={plans} roles={roles || []} setOpenModal={setOpenModal} onEditPlan={handleEditClick} onDeletePlan={handleDeleteClick} />
                </div>
            }

            {openModal && communityData && <CreatePlanModal
                open={openModal}
                onOpenChange={setOpenModal}
                onSubmit={handleCreatePlan}
                data={communityData}
                roles={roles || []}
            />
            }
            {openEditModal && communityData && (
                <CreatePlanModal
                    open={openEditModal}
                    onOpenChange={setOpenEditModal}
                    onSubmit={handleUpdatePlan}
                    data={communityData}
                    roles={roles || []}
                    planToEdit={planToEdit}
                />
            )}
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