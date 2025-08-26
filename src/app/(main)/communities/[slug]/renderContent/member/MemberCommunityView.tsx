"use client";

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { Community } from '../../types/community';
import { useGetModulesByCommunity } from '../../hooks/useGetModulesByCommunity';
import ModulesSection from './modules/components/ModulesSection';
import CommunityDetailsContent from '../../Components/CommunityDetailsContent';
import { useGetRoles } from '../admin/roles/hooks/useGetRoles';

interface MemberCommunityViewProps {
    community: Community;
    slug: string;
}

const MemberCommunityView: React.FC<MemberCommunityViewProps> = ({ community, slug }) => {
    const searchParams = useSearchParams();
    const statsType = searchParams.get('stats');

    const {
        data: modulesData,
        isLoading: isModulesLoading,
        error: modulesError
    } = useGetModulesByCommunity({ communityId: community?.communityId, shouldFetch: statsType === 'modules' });
    const { data: roles } = useGetRoles(community.communityId);

    switch (statsType) {
        case 'modules':
            if (isModulesLoading) return <div className="px-10 py-5">Cargando módulos...</div>;
            if (modulesError) return <div className="text-red-500">Error cargando los módulos.</div>;
            return <ModulesSection data={modulesData || []} slug={slug} roles={roles} />;
        default:
            return <CommunityDetailsContent community={community} slug={slug} />;
    }
};

export default MemberCommunityView;