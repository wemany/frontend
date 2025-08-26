import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonLoaderSeccionCommunities = () => {
    return (
        <div className="container max-w-full pt-5 space-y-10">
            {/* Tabs Trigger Skeleton */}
            <div className="grid w-full grid-cols-4 gap-2 bg-gray-900 border border-gray-800 rounded-2xl py-1 px-4 mb-8">
                {Array.from({ length: 4 }, (_, index) => (
                    <Skeleton
                        key={index}
                        height={20}
                        borderRadius={9}
                        baseColor="#1d1d1d30"
                        highlightColor="#ffffff55"
                    />
                ))}
            </div>

            {/* Title Skeleton */}
            <div className="pb-6">
                <Skeleton
                    height={32}
                    width={500}
                    borderRadius={99}
                    baseColor="#1d1d1d30"
                    highlightColor="#ffffff55"
                />
            </div>


            {/* Community List Section Skeleton */}
            <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, index) => (
                        // Card Skeleton
                        <div key={index} className="bg-gray-900 rounded-2xl pb-5">
                            {/* Banner Skeleton */}
                            <Skeleton
                                height={100}
                                className='p-4'
                                width={353}
                                borderRadius={12}
                                baseColor="#1d1d1d30"
                                highlightColor="#ffffff55"
                            />
                            {/* Avatar Skeleton */}
                            <div key={index} className="flex items-center p-4 space-x-4">
                                <Skeleton
                                    circle
                                    height={48}
                                    width={48}
                                    baseColor="#1d1d1d30"
                                    highlightColor="#ffffff55"
                                />
                                <div className="space-y-2">
                                    <Skeleton
                                        width={150}
                                        baseColor="#1d1d1d30"
                                        highlightColor="#ffffff55"
                                    />
                                    <Skeleton
                                        width={100}
                                        baseColor="#1d1d1d30"
                                        highlightColor="#ffffff55"
                                    />
                                </div>
                            </div>
                            {/* Description Community Skeleton */}
                            <div className="p-4">
                                <Skeleton
                                    height={32}
                                    width={330}
                                    borderRadius={99}
                                    baseColor="#1d1d1d30"
                                    highlightColor="#ffffff55"
                                />
                            </div>
                            {/* Info Community Skeleton */}
                            <div className="grid w-full grid-cols-3 gap-2 bg-gray-900 py-1 px-4 mb-8">
                                {Array.from({ length: 3 }, (_, index) => (
                                    <div key={index} className='flex flex-col items-center justify-center space-y-2'>
                                        <Skeleton
                                            height={20}
                                            width={40}
                                            baseColor="#1d1d1d30"
                                            highlightColor="#ffffff55"
                                        />
                                        <Skeleton
                                            height={20}
                                            width={50}
                                            baseColor="#1d1d1d30"
                                            highlightColor="#ffffff55"
                                        />
                                    </div>
                                ))}
                            </div>
                            {/* Interests Community Skeleton */}
                            <div className="grid w-full grid-cols-4 gap-2 bg-gray-900 py-1 px-4 mb-8">
                                {Array.from({ length: 4 }, (_, index) => (
                                    <Skeleton
                                        key={index}
                                        height={20}
                                        borderRadius={9}
                                        baseColor="#1d1d1d30"
                                        highlightColor="#ffffff55"
                                    />
                                ))}
                            </div>
                            {/* Button Skeleton */}
                            <div className="p-4">
                                <Skeleton
                                    height={32}
                                    width={330}
                                    borderRadius={99}
                                    baseColor="#1d1d1d30"
                                    highlightColor="#ffffff55"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination Skeleton */}
                <div className="flex justify-center mt-10">
                    <Skeleton
                        width={300}
                        height={40}
                        baseColor="#1d1d1d30"
                        highlightColor="#ffffff55"
                    />
                </div>
            </div>
        </div>
    );
};

export default SkeletonLoaderSeccionCommunities;