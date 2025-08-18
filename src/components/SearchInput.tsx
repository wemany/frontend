import { Search, SendHorizontal } from "lucide-react";
import { Input } from "./ui/input";

const SearchInput = () => {
    return (
        <div className="px-3 py-2">
            <div className="relative">
                <Search size={24} className="absolute left-3 top-3 h-4 w-4 z-10 text-white" />
                <Input
                    type="text"
                    id="search"
                    placeholder="Find your community..."
                    className="w-full rounded-2xl bg-gray-800/50 backdrop-blur-sm border-gray-700 pl-9 pr-4 py-2 text-white placeholder:text-gray-400"
                />
                <button
                    onClick={() => { }}
                    className="absolute right-3 top-2 h-4 w-4 z-10 text-white"
                >
                    <SendHorizontal size={20} />
                </button>
            </div>
        </div>
    )
}

export default SearchInput;