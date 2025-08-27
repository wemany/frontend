import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const SkeletonLoaderPlan = () => {
    return (
        <div className=" max-w-lg mx-auto h-full">
            <div className="flex flex-col items-center justify-center gap-5 p-4 bg-slate-900 rounded-xl border border-slate-700/50">
                <div className="flex flex-col items-center justify-center gap-3">
                    <SkeletonTheme baseColor="#1d1d1d30" highlightColor="#ffffff55">
                        <Skeleton width={50} height={50} />
                        <Skeleton width={150} height={30} />
                        <Skeleton width={300} height={20} />
                    </SkeletonTheme>
                </div>
                <div className="flex flex-col items-start gap-3 w-full">
                    <SkeletonTheme baseColor="#1d1d1d30" highlightColor="#ffffff55">
                        <Skeleton width={150} height={20} />
                        <Skeleton width={300} height={20} />
                        <Skeleton width={300} height={20} />
                    </SkeletonTheme>
                </div>
                <div className="flex items-start justify-between gap-3 w-full">
                    <SkeletonTheme baseColor="#1d1d1d30" highlightColor="#ffffff55">
                        <Skeleton width={150} height={20} />
                        <Skeleton width={100} height={20} />
                    </SkeletonTheme>
                </div>
                <div className="flex items-start justify-between gap-3 w-full">
                    <SkeletonTheme baseColor="#1d1d1d30" highlightColor="#ffffff55">
                        <Skeleton width={50} height={20} />
                        <Skeleton width={100} height={20} />
                    </SkeletonTheme>
                </div>
                {/* Controles del skeleton */}
                <div className="flex items-center gap-2 ml-4">
                    <SkeletonTheme baseColor="#1d1d1d30" highlightColor="#ffffff55">
                        <Skeleton borderRadius={20} width={250} height={40} />
                    </SkeletonTheme>
                </div>
            </div>
        </div>
    );
}

export default SkeletonLoaderPlan;