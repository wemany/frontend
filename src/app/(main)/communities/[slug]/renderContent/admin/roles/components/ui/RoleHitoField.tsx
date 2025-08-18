import { FormField } from "@/components/ui/form";
import { FormFieldWrapper } from "@/app/(main)/profile/components/ui/FormFieldWrapper";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Target, Plus } from "lucide-react";
import { availableMilestones } from "@/lib/data";
import { HitoFieldProps } from "../../types/role.type";
import { HITOS_LENGTH } from "../../lib/constants/role.constants";

const RoleHitoField = ({ control, onAddHito, updateHito, onRemoveHito, getHitosValues }: HitoFieldProps) => {

    const uniquePlugins = Array.from(new Set(availableMilestones.map(m => m.plugin)))
        .map(pluginId => {
            const milestone = availableMilestones.find(m => m.plugin === pluginId);
            return { id: pluginId, name: milestone?.pluginName || pluginId };
        });

    const maxHitos = HITOS_LENGTH.MAX;
    const currentHitos = getHitosValues();
    const canAddHito = currentHitos.length < maxHitos;

    return (
        <FormField
            control={control}
            name="hitos"
            render={({ field }) => (
                <FormFieldWrapper label="Hitos Requeridos" required>
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-slate-400 text-sm">
                                Combina diferentes hitos para crear requisitos personalizados
                            </p>
                            <Button
                                onClick={onAddHito}
                                className="bg-purple-600 hover:bg-purple-700 text-white rounded-2xl"
                                disabled={!canAddHito}
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Agregar Hito
                            </Button>
                        </div>
                        {!canAddHito && (
                            <p className="text-red-400 text-sm text-right mb-4">
                                Has alcanzado el límite de {maxHitos} hitos.
                            </p>
                        )}
                        <div className="space-y-4">
                            {(field.value || []).map((milestone, index) => {
                                const selectedPluginMilestones = availableMilestones.filter(m => m.plugin === milestone.plugin);
                                const currentMilestoneDefinition = availableMilestones.find(m => m.id === milestone.name);
                                return (
                                    <div key={index} className="p-4 rounded-xl bg-gray-800/30 border border-gray-700/50">
                                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                                            <div>
                                                <label className="block text-white text-sm font-medium mb-2">Plugin</label>
                                                <Select
                                                    value={milestone.plugin}
                                                    onValueChange={(value) => {
                                                        updateHito(index, "plugin", value);
                                                        updateHito(index, "name", "");
                                                        updateHito(index, "value", 0);
                                                    }}
                                                    required
                                                >
                                                    <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white rounded-xl">
                                                        <SelectValue placeholder="Seleccionar plugin" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-gray-800 border-gray-700">
                                                        {uniquePlugins.map((plugin) => (
                                                            <SelectItem key={plugin.id} value={plugin.id}>
                                                                <div className="flex items-center gap-2">
                                                                    <span className="text-white">{plugin.name}</span>
                                                                </div>
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div>
                                                <label className="block text-white text-sm font-medium mb-2">Hito</label>
                                                <Select
                                                    value={milestone.name}
                                                    onValueChange={(value) => updateHito(index, "name", value)}
                                                    required
                                                    disabled={!milestone.plugin}
                                                >
                                                    <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white rounded-xl">
                                                        <SelectValue placeholder="Seleccionar hito" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-gray-800 border-gray-700">
                                                        {selectedPluginMilestones.map((m) => (
                                                            <SelectItem key={m.id} value={m.id}>
                                                                <div className="flex items-center gap-2">
                                                                    <span className="text-white">{m.name}</span>
                                                                </div>
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div>
                                                <label className="block text-white text-sm font-medium mb-2">Operador</label>
                                                <Select
                                                    value={milestone.operator}
                                                    onValueChange={(value) => updateHito(index, "operator", value)}
                                                    required
                                                >
                                                    <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white rounded-xl">
                                                        <SelectValue placeholder="Seleccionar un operador" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-gray-800 border-gray-700">
                                                        <SelectItem value=">=" className="text-white">
                                                            &gt;= (Mayor o igual)
                                                        </SelectItem>
                                                        <SelectItem value=">" className="text-white">
                                                            &gt; (Mayor que)
                                                        </SelectItem>
                                                        <SelectItem value="=" className="text-white">
                                                            === (Igual a)
                                                        </SelectItem>
                                                        <SelectItem value="<=" className="text-white">
                                                            &lt;= (Menor o igual)
                                                        </SelectItem>
                                                        <SelectItem value="<" className="text-white">
                                                            &lt; (Menor que)
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div>
                                                <label className="block text-white text-sm font-medium mb-2">Valor</label>
                                                <Input
                                                    type="number"
                                                    min="0"
                                                    value={milestone.value}
                                                    onChange={(e) =>
                                                        updateHito(index, "value", Number(e.target.value))}
                                                    className="bg-gray-800/50 border-gray-700 text-white rounded-xl"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <Button
                                                    type="button"
                                                    onClick={() => onRemoveHito(index)}
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-red-400 hover:text-red-300 rounded-xl"
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                        {milestone.name && (
                                            <div className="mt-3 p-3 rounded-lg bg-purple-600/10 border border-purple-500/20">
                                                <p className="text-purple-300 text-sm">
                                                    <strong>Ejemplo:</strong>{" "}
                                                    {currentMilestoneDefinition?.pluginName}:{" "}
                                                    {currentMilestoneDefinition?.name}{" "}
                                                    {milestone.operator} {milestone.value}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                            {(!field.value || field.value.length === 0) && (
                                <div className="p-8 text-center border-2 border-dashed border-gray-600 rounded-xl">
                                    <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                    <p className="text-white mb-2">Sin hitos configurados</p>
                                    <p className="text-slate-400 text-sm">
                                        Este rol se asignará automáticamente a todos los usuarios
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </FormFieldWrapper>
            )}
        />
    )
}

export default RoleHitoField;