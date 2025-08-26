"use client";

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { Community } from '../../types/community';
import RolesManager from './roles/RolesManager';
import CommunityDetailsContent from '../../Components/CommunityDetailsContent';
import ModulesManager from './modules/ModulesManager';
import PlansManager from './plans/PlansManager';

interface AdminCommunityViewProps {
    community: Community;
    slug: string;
}

const AdminCommunityView: React.FC<AdminCommunityViewProps> = ({ community, slug }) => {
    const searchParams = useSearchParams();
    const statsType = searchParams.get('stats');
    switch (statsType) {
        case 'modules':
            return <ModulesManager communityId={community.communityId} slug={slug} />;
        case 'plans':
            return <PlansManager communityId={community.communityId} />;
        case 'roles':
            return <RolesManager communityId={community.communityId} />;
        default:
            return <CommunityDetailsContent community={community} slug={slug} />
    }
};

export default AdminCommunityView;