"use client"

import HeaderModulesManager from "./sections/HeaderModulesManager";
import InfoModulesManager from "./sections/InfoModulesManager";
import ModulesListManager from "./sections/ModulesListManager";
import CreateModuleModal from "./components/CreateModuleModal";
import { useGetRoles } from "../roles/hooks/useGetRoles";
import { useReorderModules } from "./hooks/useReorderModules";
import DeleteModuleModal from "./components/DeleteModuleModal";
import { useCreateModule } from "./hooks/useCreateModule";
import { useDeleteModule } from "./hooks/useDeleteModule";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useUpdateModule } from "./hooks/useUpdateModule";
import LoadingOverlay from "@/app/(main)/profile/components/LoadingOverlay";
import { CreateModuleForm } from "./lib/schema/module.schema";
import SkeletonLoaderModules from "./components/ui/SkeletonLoaderModules";
import { useActionsOverlay } from "@/hooks/useModuleOverlay";
import { operationProps } from "./lib/moduleOperationsConfig";

const ModulesManager = ({ communityId, slug }: { communityId: string, slug: string }) => {

    const { data: roles } = useGetRoles(communityId);
    const { modules, isLoading, error, isReordering, handleReorder } = useReorderModules(communityId);
    const { openModal, setOpenModal, handleSubmitModule } = useCreateModule(communityId);
    const { openModal: openEditModal, setOpenModal: setOpenEditModal, moduleToEdit, handleEditClick, handleSubmitUpdate: originalUpdateSubmit } = useUpdateModule(communityId);
    const { isDialogDeleteOpen, moduleToDelete, setIsDialogDeleteOpen, handleDeleteClick, handleConfirmDelete: originalDeleteConfirm, setModuleToDelete } = useDeleteModule(communityId);

    const {
        isOverlayOpen,
        overlayError,
        currentProps,
        handleComplete,
        handleError,
        startOverlay,
    } = useActionsOverlay(operationProps);

    const handleCreateModule = async (formData: CreateModuleForm) => {
        setOpenModal(false);
        startOverlay("create");
        await handleSubmitModule(formData, { onComplete: handleComplete, onError: handleError });
    };

    const handleUpdateModule = async (formData: CreateModuleForm) => {
        setOpenEditModal(false);
        startOverlay("update");
        await originalUpdateSubmit(formData, { onComplete: handleComplete, onError: handleError });
    };

    const handleDeleteModule = async () => {
        setIsDialogDeleteOpen(false);
        startOverlay("delete");
        await originalDeleteConfirm({ onComplete: handleComplete, onError: handleError });
    };

    const onReorderModules = async (newOrder: string[]) => {
        await handleReorder(newOrder);
    };

    return (
        <div className="space-y-6">
            <HeaderModulesManager setOpenModal={setOpenModal} />
            <InfoModulesManager />
            {error ? <div className="mx-auto">
                <Card className="border-red-200 bg-red-50">
                    <CardContent className="p-6">
                        <p className="text-red-800">Error al cargar los módulos. Por favor, intenta de nuevo.</p>
                    </CardContent>
                </Card>
            </div> : isReordering && (
                <div className="flex items-center mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <Loader2 className="h-4 w-4 animate-spin text-blue-600 mr-2" />
                    <span className="text-blue-800 text-sm">Guardando nuevo orden...</span>
                </div>
            )}
            {isLoading ?
                <div className="mx-auto">
                    <SkeletonLoaderModules />
                </div>
                : <ModulesListManager
                    slug={slug}
                    modules={modules}
                    roles={roles || []}
                    setOpenModal={setOpenModal}
                    onDeleteModule={handleDeleteClick}
                    onEditModule={handleEditClick}
                    onReorderModules={onReorderModules}
                />}

            {openModal && <CreateModuleModal open={openModal} roles={roles} onOpenChange={setOpenModal} onSubmit={handleCreateModule} />}
            {openEditModal && (
                <CreateModuleModal
                    open={openEditModal}
                    roles={roles}
                    onOpenChange={setOpenEditModal}
                    onSubmit={handleUpdateModule}
                    moduleToEdit={moduleToEdit}
                />
            )}
            <DeleteModuleModal
                showDeleteModuleModal={isDialogDeleteOpen}
                setShowDeleteModuleModal={setIsDialogDeleteOpen}
                moduleToDelete={moduleToDelete}
                setModuleToDelete={setModuleToDelete}
                onConfirmDelete={handleDeleteModule}
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
    )
}

export default ModulesManager; 