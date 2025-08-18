"use client"

import CreateRoleModal from "./components/CreateRoleModal"
import { CreateRoleForm } from "./lib/schema/role.schema"
import LoadingOverlay from "@/app/(main)/profile/components/LoadingOverlay"
import RolesList from "./sections/RolesList"
import { useGetRoles } from "./hooks/useGetRoles"
import DeleteRoleModal from "./components/DeleteRoleModal"
import { useCreateRole } from "./hooks/useCreateRole"
import { useUpdateRole } from "./hooks/useUpdateRole"
import { useDeleteRole } from "./hooks/useDeleteRole"
import { useActionsOverlay } from "@/hooks/useModuleOverlay"
import { operationProps } from "./lib/roleOperationsConfig"
import HeaderRolesManager from "./sections/HeaderRolesManager"
import InfoRolesManager from "./sections/InfoRolesManager"
import { Card, CardContent } from "@/components/ui/card"
import SkeletonLoaderRoles from "./components/ui/SkeletonLoaderRoles"
import { useState } from "react"


const RolesManager = ({ communityId }: { communityId: string }) => {
    const [openModal, setOpenModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [isDialogDeleteOpen, setIsDialogDeleteOpen] = useState(false);

    const { data: roles, error, isLoading } = useGetRoles(communityId);
    const { handleSubmitModule: originalCreateSubmit } = useCreateRole(communityId);
    const { roleToEdit, handleEditClick, handleSubmitUpdate: originalUpdateSubmit } = useUpdateRole(communityId, setOpenEditModal);
    const { roleToDelete, handleDeleteClick, handleConfirmDelete: originalDeleteConfirm, setRoleToDelete } = useDeleteRole(communityId, setIsDialogDeleteOpen);

    const {
        isOverlayOpen,
        overlayError,
        currentProps,
        handleComplete,
        handleError,
        startOverlay,
    } = useActionsOverlay(operationProps);


    const handleCreateModule = async (formData: CreateRoleForm) => {
        setOpenModal(false);
        startOverlay("create");
        await originalCreateSubmit(formData, { onComplete: handleComplete, onError: handleError });
    };

    const handleUpdateModule = async (formData: CreateRoleForm) => {
        setOpenEditModal(false);
        startOverlay("update");
        await originalUpdateSubmit(formData, { onComplete: handleComplete, onError: handleError });
    };

    const handleDeleteModule = async () => {
        setIsDialogDeleteOpen(false);
        startOverlay("delete");
        await originalDeleteConfirm({ onComplete: handleComplete, onError: handleError });
    };

    return (
        <div className="space-y-6">
            <HeaderRolesManager setOpenModal={setOpenModal} />
            {/* Available Milestones */}
            <InfoRolesManager />
            {error && (<div className="max-w-4xl mx-auto">
                <Card className="border-red-200 bg-red-50">
                    <CardContent className="p-6">
                        <p className="text-red-800">Error al cargar los roles. Por favor, intenta de nuevo.</p>
                    </CardContent>
                </Card>
            </div>
            )}
            {isLoading ? (
                <div className=" mx-auto">
                    <SkeletonLoaderRoles />
                </div>
            ) : <RolesList
                roles={roles || []}
                setOpenModal={setOpenModal}
                isRoleDataLoading={isLoading}
                onEditRole={handleEditClick}
                onDeleteRole={handleDeleteClick}
            />}

            {openModal && <CreateRoleModal open={openModal} onOpenChange={setOpenModal} onSubmit={handleCreateModule} />}

            {openEditModal && (
                <CreateRoleModal
                    open={openEditModal}
                    onOpenChange={setOpenEditModal}
                    onSubmit={handleUpdateModule}
                    roleToEdit={roleToEdit}
                />
            )}

            <DeleteRoleModal
                showDeleteRoleModal={isDialogDeleteOpen}
                setShowDeleteRoleModal={setIsDialogDeleteOpen}
                roleToDelete={roleToDelete}
                setRoleToDelete={setRoleToDelete}
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

export default RolesManager;
