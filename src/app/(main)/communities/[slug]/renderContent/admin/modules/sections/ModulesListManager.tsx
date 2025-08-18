import { Module } from "../types/module.type";
import CardModule from "../components/ui/CardModule";
import { Role } from "../../roles/types/role.type";
import CreateNew from "@/components/CreateNew";

import {
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    closestCenter,
    useSensor,
    useSensors
} from "@dnd-kit/core"
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { useEffect, useState } from "react";

interface ModulesListManagerProps {
    slug: string;
    modules: Module[];
    roles: Role[];
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    onEditModule: (module: Module) => void;
    onDeleteModule: (module: Module) => void;
    onReorderModules: (newOrder: string[]) => void;
}

const ModulesListManager = ({ slug, modules, roles, setOpenModal, onDeleteModule, onEditModule, onReorderModules }: ModulesListManagerProps) => {

    const [localModules, setLocalModules] = useState<Module[]>(modules);

    useEffect(() => {
        setLocalModules(modules);
    }, [modules]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );
    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            setLocalModules((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);

                const newItems = arrayMove(items, oldIndex, newIndex);

                const newOrder = newItems.map(module => module.id);

                onReorderModules(newOrder);

                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }

    return (
        <>
            {localModules.length === 0 ? (
                <CreateNew handleCreate={() => setOpenModal(true)} title="Crear Nuevo Módulo" description="Crea un nuevo módulo para tu comunidad" />
            ) : (

                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={localModules.map((module) => module.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        <div className="space-y-4">
                            {localModules.map((module) => (
                                <CardModule key={module.id} slug={slug} module={module} roles={roles} onDelete={onDeleteModule} onEdit={onEditModule} />
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>
            )}
        </>
    )
}

export default ModulesListManager;