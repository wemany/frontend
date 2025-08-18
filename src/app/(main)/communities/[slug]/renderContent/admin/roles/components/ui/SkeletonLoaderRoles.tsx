import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const SkeletonLoaderRoles = () => {
    return (
        <div className=" w-full mx-auto space-y-4">
            {Array(3)
                .fill(0)
                .map((_, index) => (
                    <div key={index} className="flex flex-col justify-between p-4 bg-slate-900 rounded-xl border border-slate-700/50">
                        {/* Contenido principal del skeleton */}
                        <div className="w-full flex flex-row items-center justify-between">
                            <div className="flex-1 space-y-2">
                                <SkeletonTheme baseColor="#1d1d1d30" highlightColor="#ffffff55">
                                    <div className="flex flex-row items-center gap-2">
                                        <Skeleton circle width={40} height={40} />
                                        <Skeleton width={100} height={25} />
                                    </div>
                                    <Skeleton width={350} height={15} />
                                </SkeletonTheme>
                            </div>
                            <div className="flex items-center gap-2 ml-4">
                                <SkeletonTheme baseColor="#1d1d1d30" highlightColor="#ffffff55">
                                    <Skeleton width={100} height={40} />
                                </SkeletonTheme>
                            </div>
                        </div>
                        <div className="my-3">
                            <SkeletonTheme baseColor="#1d1d1d30" highlightColor="#ffffff55">
                                <Skeleton width={120} height={20} />
                            </SkeletonTheme>
                            <div className="flex items-center gap-2">
                                <SkeletonTheme baseColor="#1d1d1d30" highlightColor="#ffffff55">
                                    <Skeleton width={800} height={40} />
                                </SkeletonTheme>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
}

export default SkeletonLoaderRoles;