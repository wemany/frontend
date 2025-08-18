import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const SkeletonLoaderModules = () => {
    return (
        <div className=" w-full mx-auto space-y-4">
            {Array(5)
                .fill(0)
                .map((_, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-slate-900 rounded-xl border border-slate-700/50">
                        {/* Contenido principal del skeleton */}
                        <div className="flex-1 space-y-2">
                            <SkeletonTheme baseColor="#1d1d1d30" highlightColor="#ffffff55">
                                <Skeleton width={200} height={50} />
                                <Skeleton width={350} height={15} />
                            </SkeletonTheme>
                        </div>

                        {/* Controles del skeleton */}
                        <div className="flex items-center gap-2 ml-4">
                            <SkeletonTheme baseColor="#1d1d1d30" highlightColor="#ffffff55">
                                <Skeleton width={100} height={40} />
                            </SkeletonTheme>
                        </div>
                    </div>
                ))}
        </div>
    );
}

export default SkeletonLoaderModules;