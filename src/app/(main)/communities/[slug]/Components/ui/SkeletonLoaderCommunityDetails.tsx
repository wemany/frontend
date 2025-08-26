import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonLoaderCommunityDetails = () => {
    return (
        <div className="container max-w-full pt-5 space-y-10">
            {/* Community Owner Skeleton */}
            <div className="flex flex-col justify-end h-[500px] bg-gray-900 border border-gray-800 rounded-2xl py-1 px-4 mb-8">
                <div className="flex justify-between items-center">
                    <div className='flex items-center'>
                        <Skeleton
                            circle
                            height={48}
                            width={48}
                            baseColor="#1d1d1d30"
                            highlightColor="#ffffff55"
                        />
                        <div className='flex flex-col gap-1'>
                            <Skeleton
                                height={20}
                                width={200}
                                borderRadius={9}
                                baseColor="#1d1d1d30"
                                highlightColor="#ffffff55"
                            />
                            <Skeleton
                                height={20}
                                width={200}
                                borderRadius={9}
                                baseColor="#1d1d1d30"
                                highlightColor="#ffffff55"
                            />
                            <Skeleton
                                height={20}
                                width={100}
                                borderRadius={9}
                                baseColor="#1d1d1d30"
                                highlightColor="#ffffff55"
                            />
                        </div>
                    </div>
                    <Skeleton
                        height={20}
                        width={200}
                        borderRadius={9}
                        baseColor="#1d1d1d30"
                        highlightColor="#ffffff55"
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <Skeleton
                        height={32}
                        width={500}
                        borderRadius={99}
                        baseColor="#1d1d1d30"
                        highlightColor="#ffffff55"
                    />
                    <Skeleton
                        height={28}
                        width={700}
                        borderRadius={99}
                        baseColor="#1d1d1d30"
                        highlightColor="#ffffff55"
                    />
                </div>
                <div className="grid w-full grid-cols-4 bg-gray-900 py-2 mb-8">
                    {Array.from({ length: 4 }, (_, index) => (
                        <div key={index} className='flex flex-col items-center justify-center space-y-2'>
                            <Skeleton
                                height={100}
                                width={370}
                                borderRadius={15}
                                baseColor="#1d1d1d30"
                                highlightColor="#ffffff55"
                            />
                        </div>
                    ))}
                </div>
                <Skeleton
                    height={50}
                    baseColor="#1d1d1d30"
                    highlightColor="#ffffff55"
                />
            </div>
            {/* Quick Skeleton */}
            <div className="grid w-full grid-cols-4 py-2 mb-8">
                {Array.from({ length: 4 }, (_, index) => (
                    <div key={index} className='flex flex-col items-center justify-center space-y-2'>
                        <Skeleton
                            height={130}
                            width={370}
                            borderRadius={15}
                            baseColor="#1d1d1d30"
                            highlightColor="#ffffff55"
                        />
                    </div>
                ))}
            </div>

            {/* Recent Activity Skeleton */}
            <div className="flex flex-col space-y-4">
                <Skeleton
                    height={32}
                    width={300}
                    borderRadius={99}
                    baseColor="#1d1d1d30"
                    highlightColor="#ffffff55"
                />
                <Skeleton
                    height={28}
                    width={220}
                    borderRadius={99}
                    baseColor="#1d1d1d30"
                    highlightColor="#ffffff55"
                />
                <div className="grid grid-rows-1 sm:grid-rows-2 lg:grid-rows-3 xl:grid-rows-4 gap-6">
                    {[...Array(3)].map((_, index) => (

                        <Skeleton
                            key={index}
                            height={100}
                            width={1500}
                            borderRadius={15}
                            baseColor="#1d1d1d30"
                            highlightColor="#ffffff55"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SkeletonLoaderCommunityDetails;