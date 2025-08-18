import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AvatarImage } from "@radix-ui/react-avatar";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Star, X } from "lucide-react";
import React from "react";
import { PricingModalProps } from "../types/pricingModal";

const formatNumber = (num: number) => {
    return new Intl.NumberFormat("es-ES").format(num);
};

const PricingModal = ({
    isOpen,
    title,
    description,
    avatar,
    avatarFallback,
    stats,
    plans,
    onClose,
    onPlanSelect,
}: PricingModalProps) => {

    const handlePlanSelect = (price: number) => {
        onPlanSelect?.(price);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ type: "spring", duration: 0.3 }}
                        className="bg-slate-900 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Botón de cierre */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                            onClick={onClose}
                        >
                            <X className="h-5 w-5" />
                        </Button>

                        {/* Encabezado y estadísticas */}
                        <div className="text-center mb-8">
                            <div className="w-20 h-20 mx-auto mb-6 rounded-full border-4 border-purple-500 bg-white flex items-center justify-center">
                                <Avatar className="flex items-center justify-center h-full w-full">
                                    <AvatarImage src={avatar} alt="Avatar community" />
                                    <AvatarFallback className="text-black text-lg font-semibold">{avatarFallback}</AvatarFallback>
                                </Avatar>
                            </div>

                            <h2 className="text-3xl font-bold text-white mb-4">{title}</h2>
                            <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-6">{description}</p>

                            <div className="flex items-center justify-center gap-8 text-gray-300">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-white">{formatNumber(stats.members)}</div>
                                    <div className="text-sm">Miembros</div>
                                </div>
                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-1 mb-1">
                                        <Star height={20} width={20} className="fill-yellow-400 text-yellow-400" />
                                        <span className="text-2xl font-bold text-white">{stats.rating.toFixed(2)}</span>
                                    </div>
                                    <div className="text-sm">{formatNumber(stats.reviews)} reseñas</div>
                                </div>
                            </div>
                        </div>

                        {/* Seccion de planes de precios */}
                        <div className={cn(
                            "flex pb-6",
                            plans.length === 1 && "justify-center",
                            plans.length > 1 && "flex-row gap-6"
                        )}>
                            {plans.map((plan, index) => (
                                <motion.div
                                    key={plan.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className={cn(
                                        "relative flex flex-col rounded-xl p-6 border-2 transition-all duration-300 hover:scale-[1.02]",
                                        plans.length === 1 ? "w-full sm:w-1/2 md:w-1/3" : "w-full",
                                        !plan.is_recurring && "bg-green-600/30 border-green-500/30",
                                        plan.price > 0 && "bg-yellow-600/30 border-yellow-500/30",
                                        plan.is_recurring && "bg-purple-600/30 border-purple-500/30"
                                    )}
                                >
                                    {plan.is_recurring && (
                                        <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black font-semibold">
                                            ⭐ Más Popular
                                        </Badge>
                                    )}

                                    {/* Contenido del plan */}
                                    <div className="text-center mb-6">
                                        <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                                        <div className="mb-2">
                                            <span
                                                className={cn(
                                                    "text-4xl font-bold",
                                                    !plan.is_recurring && "text-green-400",
                                                    plan.price > 0 && "text-yellow-400",
                                                    plan.is_recurring && "text-purple-400",
                                                )}
                                            >
                                                ${formatNumber(plan.price)}
                                            </span>
                                            {plan.currency && <span className="text-gray-400 text-sm ml-1">{plan.currency}</span>}
                                        </div>
                                        <p className="text-gray-400 text-sm">{plan.description}</p>
                                    </div>

                                    {/* Lista de características */}
                                    <ul className="flex-1 space-y-3 mb-6">
                                        {plan.benefits && plan.benefits.map((benefit, benefitIndex) => (
                                            <li key={benefitIndex} className="flex items-center gap-3">
                                                <Check
                                                    height={20}
                                                    width={20}
                                                    className={cn(
                                                        "flex-shrink-0",
                                                        !plan.is_recurring && "text-green-400",
                                                        plan.price > 0 && "text-yellow-400",
                                                        plan.is_recurring && "text-purple-400",
                                                    )}
                                                />
                                                <span className="text-gray-300 text-sm">{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Botón de acción */}
                                    <Button
                                        className={cn(
                                            "mt-auto w-full font-semibold transition-all duration-300",
                                            !plan.is_recurring && "bg-green-600 hover:bg-green-700",
                                            plan.price > 0 && "bg-yellow-600 hover:bg-yellow-700",
                                            plan.is_recurring && "bg-purple-600 hover:bg-purple-700",
                                        )}
                                        variant="default"
                                        onClick={() => handlePlanSelect(plan.price)}
                                    >
                                        <span>{plan.name}</span>
                                    </Button>
                                </motion.div>
                            ))}
                        </div>

                        {/* Texto de garantía */}
                        <div className="text-center">
                            <p className="text-gray-400 text-sm">Garantía de devolución de 30 días • Cancela cuando quieras</p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PricingModal;