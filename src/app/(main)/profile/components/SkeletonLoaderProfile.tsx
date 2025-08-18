import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonLoaderProfile = () => {
    return (
        <div className="container max-w-full pt-5 space-y-10">
            {/* Tabs Trigger Skeleton */}

            <div className="flex flex-col space-y-10 h-64 bg-gray-900 border border-gray-800 rounded-2xl py-1 px-4 mb-8">
                <div className='flex justify-between gap-2'>
                    <div className='flex flex-col gap-2'>
                        <SkeletonTheme baseColor="#1d1d1d30" highlightColor="#ffffff55">
                            <Skeleton width={500} height={30} />
                            <Skeleton width={350} height={15} />
                        </SkeletonTheme>
                    </div>
                    <div className='flex flex-col items-end gap-2'>
                        <SkeletonTheme baseColor="#1d1d1d30" highlightColor="#ffffff55">
                            <Skeleton width={150} height={30} />
                            <Skeleton width={150} height={15} />
                        </SkeletonTheme>
                    </div>
                </div>
                <div className="grid w-full grid-cols-3 gap-2 bg-gray-900 py-1 px-4 mb-8">
                    {Array.from({ length: 3 }, (_, index) => (
                        <Skeleton
                            key={index}
                            height={100}
                            borderRadius={9}
                            baseColor="#1d1d1d30"
                            highlightColor="#ffffff55"
                        />
                    ))}
                </div>
            </div>
            <div className="grid w-full grid-cols-4 space-x-6 py-4 mb-8">
                {Array.from({ length: 4 }, (_, index) => (
                    <Skeleton
                        key={index}
                        height={150}
                        borderRadius={9}
                        baseColor="#1d1d1d30"
                        highlightColor="#ffffff55"
                    />
                ))}
            </div>
            <div className="grid w-full grid-cols-2 space-x-6 py-4 mb-8">
                {Array.from({ length: 2 }, (_, index) => (
                    <Skeleton
                        key={index}
                        height={350}
                        borderRadius={9}
                        baseColor="#1d1d1d30"
                        highlightColor="#ffffff55"
                    />
                ))}
            </div>
        </div>
    );
};

export default SkeletonLoaderProfile;