import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const SkeletonLoaderDetailsCommunity = () => {
    return (
        <div className="container max-w-full pt-5 space-y-10">
            {/* Header section */}
            <div className="flex flex-col space-y-10 h-fit bg-gray-900 border border-gray-800 rounded-2xl py-1 px-4 mb-8">
                <div className='flex flex-col items-end gap-2'>
                    <SkeletonTheme baseColor="#1d1d1d30" highlightColor="#ffffff55">
                        <Skeleton width={150} height={30} />
                    </SkeletonTheme>
                </div>
                <div className="flex justify-between items-center gap-2">
                    <div className="flex justify-center items-center gap-2">
                        <SkeletonTheme baseColor="#1d1d1d30" highlightColor="#ffffff55">
                            <Skeleton circle height={50} width={50} />
                            <div className="flex-1 space-y-2">
                                <Skeleton height={20} width={100} />
                                <Skeleton height={10} width={170} />
                                <Skeleton height={20} width={100} />
                                <Skeleton height={20} width={70} />
                            </div>
                        </SkeletonTheme>
                    </div>
                    <div >
                        <SkeletonTheme baseColor="#1d1d1d30" highlightColor="#ffffff55">
                            <Skeleton width={150} height={30} />
                        </SkeletonTheme>
                    </div>
                </div>
                <div >
                    <SkeletonTheme baseColor="#1d1d1d30" highlightColor="#ffffff55">
                        <Skeleton width={350} height={30} />
                        <Skeleton width={550} height={20} />
                    </SkeletonTheme>
                </div>
                <div className="grid w-full grid-cols-4 gap-2 bg-gray-900 py-1 px-4 mb-8">
                    {Array.from({ length: 4 }, (_, index) => (
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
            {/* Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 3 }, (_, i) => (
                    <div key={i} className="bg-gray-900 rounded-2xl p-6 flex items-center space-x-4">
                        <div className="flex flex-col">
                            <SkeletonTheme baseColor="#1d1d1d30" highlightColor="#ffffff55">
                                <div className="flex">
                                    <Skeleton height={50} width={50} />
                                    <div className="flex-1 space-y-2">
                                        <Skeleton height={20} width={150} />
                                        <Skeleton height={10} width={350} />
                                    </div>
                                </div>
                            </SkeletonTheme>
                            <div>
                                <SkeletonTheme baseColor="#1d1d1d30" highlightColor="#ffffff55">
                                    <Skeleton height={10} width={350} />
                                </SkeletonTheme>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SkeletonLoaderDetailsCommunity;