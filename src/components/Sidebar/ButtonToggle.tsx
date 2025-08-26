import { PanelLeftClose, PanelLeftOpen } from "lucide-react"
import ButtonWithIcon from "../Buttons/ButtonWithIcon"

const ButtonToggle = ({ toggleSidebar, state }: { toggleSidebar: () => void, state: string }) => {
    return <ButtonWithIcon
        onClick={toggleSidebar}
        icon={state === "expanded" ? PanelLeftClose : PanelLeftOpen}
        size="icon"
        className=" hover:bg-gray-900 transition-all duration-200 ml-auto"
    />
}

export default ButtonToggle;
