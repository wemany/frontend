import { Plus, Users } from "lucide-react";
import ButtonWithIcon from "../Buttons/ButtonWithIcon";

const QuickActions = () => {
    return (
        <div
            className="mt-6 bg-gradient-to-br from-purple-500/10 to-purple-400/5 rounded-xl border border-purple-500/20 mx-2 p-3"
        >
            <h4 className="font-semibold text-sm mb-3">Quick Actions</h4>
            <div className="space-y-2">
                <ButtonWithIcon
                    onClick={() => { }}
                    icon={Plus}
                    position="left"
                    label="Create Post"
                    className="w-full bg-purple-500 hover:bg-purple-400 text-sm justify-start hover:scale-105"
                />
                <ButtonWithIcon
                    onClick={() => { }}
                    icon={Users}
                    position="left"
                    label="Find Communities"
                    className="w-full border-gray-700 text-gray-300 hover:border-purple-500 text-sm justify-start bg-transparent hover:scale-105"
                    variant="outline"
                />
            </div>
        </div>
    )
}

export default QuickActions;