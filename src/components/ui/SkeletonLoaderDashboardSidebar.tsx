import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonLoaderDashboardSidebar = () => {
    return (
        <div className=" h-screen w-auto border-r border-gray-800 bg-gray-900/90 backdrop-blur-sm">

            {/* Esqueleto del Contenido */}
            <div className="flex-1 overflow-auto py-6 px-4 space-y-8">
                {/* My Communities */}
                <div className="space-y-4">
                    <Skeleton
                        width={150}
                        baseColor="#1d1d1d30"
                        highlightColor="#ffffff55"
                    />
                    <div className="flex flex-col">
                        {[...Array(4)].map((_, index) => (
                            <div key={index} className="flex items-center gap-4 py-2">
                                <Skeleton
                                    circle
                                    height={20}
                                    width={20}
                                    baseColor="#1d1d1d30"
                                    highlightColor="#ffffff55"
                                />
                                <Skeleton
                                    width={160}
                                    baseColor="#1d1d1d30"
                                    highlightColor="#ffffff55"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Categories */}
                <div className="space-y-4">
                    <Skeleton
                        width={150}
                        baseColor="#1d1d1d30"
                        highlightColor="#ffffff55"
                    />
                    <div className="flex flex-col">
                        {[...Array(9)].map((_, index) => (
                            <div key={index} className="flex items-center gap-4 py-2">
                                <Skeleton
                                    circle
                                    height={20}
                                    width={20}
                                    baseColor="#1d1d1d30"
                                    highlightColor="#ffffff55"
                                />
                                <Skeleton
                                    width={160}
                                    baseColor="#1d1d1d30"
                                    highlightColor="#ffffff55"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/*  Footer */}
            <div className="pt-36 px-4 border-t border-gray-800">
                <div className="flex items-center gap-3">
                    <Skeleton
                        circle
                        height={40}
                        width={40}
                        baseColor="#1d1d1d30"
                        highlightColor="#ffffff55"
                    />
                    <div className="flex-1">
                        <Skeleton
                            width={100}
                            baseColor="#1d1d1d30"
                            highlightColor="#ffffff55"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonLoaderDashboardSidebar;