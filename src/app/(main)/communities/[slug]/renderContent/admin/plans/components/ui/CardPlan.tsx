import { motion } from "framer-motion";
import { Plan } from "../../types/plan.type";
import { Check, DollarSign, Edit, MoreHorizontal, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface CardPlanProps {
    plan: Plan;
    onEdit: (plan: Plan) => void;
    onDelete: (plan: Plan) => void;
}


const CardPlan = ({ plan, onEdit, onDelete }: CardPlanProps) => {
    console.log({ plan });
    return (
        <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={cn(`relative overflow-hidden rounded-xl bg-${plan.color}-500/20`)}
        >
            <Card className={`px-4 py-6 border-${plan.color}-500/30 h-full w-full flex flex-col justify-between`}>
                <CardHeader className="text-center gap-0 ml-10">
                    <CardTitle className="text-2xl font-bold mb-2">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-${plan.color}-600`} >
                            <DollarSign className={`h-8 w-8 text-${plan.color}-200`} />
                        </div>
                        <h3>{plan.name}</h3>
                    </CardTitle>
                    <CardDescription className="text-slate-400 text-sm">{plan.description}</CardDescription>
                    <CardAction>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                                    <MoreHorizontal className="h-6 w-6" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-gray-800" align="end">
                                <DropdownMenuItem
                                    onClick={() => {
                                        onDelete(plan)
                                    }}
                                    className="hover:cursor-pointer hover:text-red-300 hover:bg-red-500/10"
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Eliminar Plan
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </CardAction>
                </CardHeader>
                <CardContent className="flex-1">
                    {/* Price */}
                    <div className="text-center mb-6">
                        <div className="flex items-baseline justify-center gap-1">
                            <span className="text-3xl font-bold text-white">${plan.price}</span>
                            {plan.is_recurring && (
                                <span className="text-slate-400 text-sm">
                                    {plan.currency_code}/{plan.duration_unit === "month" ? "mes" : plan.duration_unit === "year" ? "año" : ""}
                                </span>
                            )}
                        </div>

                    </div>

                    {/* Benefits */}
                    {plan.benefits && <div className="mb-6">
                        <h4 className="text-white font-medium mb-3">Beneficios incluidos:</h4>
                        <ul className="space-y-2">
                            {plan.benefits.map((benefit, benefitIndex) => (
                                <li key={benefitIndex} className="flex items-start gap-2 text-sm text-slate-300">
                                    <Check className={`h-4 w-4 text-${plan.color}-400 mt-0.5 flex-shrink-0`} />
                                    <span>{benefit}</span>
                                </li>
                            ))}
                        </ul>
                    </div>}

                    {/* Plan Info */}
                    <div className="mb-6 space-y-2">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-400">Rol asignado:</span>
                            {plan.roles && plan.roles.length > 0 ? (
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {plan.roles.map((role) => (
                                        <Badge
                                            key={role.id}
                                            className={`bg-${role.color}-500 text-white font-medium`}
                                        >
                                            {role.name}
                                        </Badge>
                                    ))}
                                </div>
                            ) : <div>No Roles</div>}
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-400">Tipo:</span>
                            <span className="text-white">{!plan.is_recurring && Number(plan.price) === 0 ? "Gratis" : plan.is_recurring ? "Recurrente" : "Pago único"}</span>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <div className="flex gap-2 w-full">
                        <Button
                            onClick={() => onEdit(plan)}
                            className={`flex-1 bg-${plan.color}-600 hover:bg-${plan.color}-700 text-white rounded-2xl`}
                        >
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </motion.div>
    )
}

export default CardPlan;