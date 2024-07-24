import { useRootStore } from "@/models/RootStore";
import { ReactElement } from "react"

const Button = ({icon, meterId}: { icon: ReactElement, meterId: string | null }): ReactElement => {

    const rootStore = useRootStore();
    
    const onButtonClick = (id: string | null) => {
        if (id === null) return
        rootStore.deleteMeterInfo(id);
    }

    return (
        <button className="Button" onClick={() => onButtonClick(meterId)}>
            {icon}
        </button>
    )
}

export default Button