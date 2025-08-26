import { Module } from "../types/module.type";
import HeroSection from "./components/HeroSection";

const ModuleDetailsManager = ({ module }: { module: Module }) => {
    return (
        <div>
            <HeroSection title={module.module_name} description={module.description} />
        </div>
    )
}

export default ModuleDetailsManager;