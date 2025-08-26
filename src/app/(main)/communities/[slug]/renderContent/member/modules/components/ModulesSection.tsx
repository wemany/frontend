import { Badge } from '@/components/ui/badge';
import React from 'react';
import { Button } from '@/components/ui/button';
import ModulesList from './ModulesList';
import { Module } from '../../../admin/modules/types/module.type';
import MembershipPlansSection from './MembershipPlansSection';
import { Role } from '../../../admin/roles/types/role.type';

const ModulesSection = ({ data, slug, roles }: { data: Module[], slug: string, roles: Role[] }) => {

    return (
        <div className='flex flex-col space-y-7'>
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Módulos de Aprendizaje</h2>
                    <p className="text-slate-400">Domina el e-commerce con nuestros cursos especializados</p>
                </div>
                <Badge className="bg-purple-600/20 text-purple-400 border-purple-500/30">
                    {data.length} módulos disponibles
                </Badge>
            </div>

            {data.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 border border-gray-700 rounded-lg text-center bg-gray-900">
                    <svg className="w-16 h-16 text-purple-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                    <h3 className="text-2xl font-bold text-white mb-2">¡Sé el primero en aprender!</h3>
                    <p className="text-gray-400 mb-6 max-w-md">
                        Todavía no hemos publicado los módulos de aprendizaje en esta comunidad.
                        Únete a la lista de espera para recibir una notificación tan pronto como estén disponibles.
                    </p>
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg">
                        Notificarme
                    </Button>
                </div>
            ) : (
                <>
                    <MembershipPlansSection />
                    <ModulesList modules={data} slug={slug} roles={roles} />
                </>
            )}
        </div>
    );
};

export default ModulesSection;