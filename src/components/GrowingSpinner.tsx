
const GrowingSpinner = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="p-3 animate-spin drop-shadow-2xl bg-gradient-to-bl from-pink-400 via-purple-400 to-indigo-600 md:w-32 md:h-32 h-32 w-32 aspect-square rounded-full">
                <div className="rounded-full h-full w-full bg-slate-100 dark:bg-zinc-900 background-blur-md"></div>
            </div>
            <p className="text-xl font-bold text-center mt-4">Loading...</p>
        </div>
    );
}

export default GrowingSpinner;