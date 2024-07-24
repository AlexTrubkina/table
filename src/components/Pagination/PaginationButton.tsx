import { ReactElement } from "react";
import { useRootStore } from "@/models/RootStore";

export const PaginationButton = ({
    number,
}: {
    number: string;
}): ReactElement => {
    const rootStore = useRootStore();

    const onPaginationClick = (number: string) => {
        rootStore.setMeters(+number);
    };

    return (
        <button
            className={"Pagination-Button" + (+number === rootStore.pages.current ? " Pagination-Button_Active" : "")}
            onClick={() => onPaginationClick(number)}
            disabled={number === "..."}
        >
            {number}
        </button>
    );
};

export default PaginationButton;
