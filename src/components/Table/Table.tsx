import { ReactElement, useEffect } from "react";
import "./Table.scss";
import { HotWaterIcon, WaterIcon, TrashIcon } from "@/assets/icons";
import Pagination from "../Pagination/Pagination";
import { useRootStore } from "@/models/RootStore";
import {observer} from "mobx-react-lite";
import Button from "../Button/Button";


const Table = observer((): ReactElement => {

    const rootStore = useRootStore();
    const getData = async () => {
        rootStore.setAddresses();
        rootStore.setMeters(1);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="Table">
            <table>
                <thead className="Table-Head">
                    <tr>
                        <th>№</th>
                        <th>Тип</th>
                        <th>Дата установки</th>
                        <th>Автоматический</th>
                        <th>Текущие показания</th>
                        <th>Адрес</th>
                        <th>Примечние</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className="Table-Body">
                    {rootStore.isLoading && <tr><td colSpan={8}>Загрузка...</td></tr>}
                    {rootStore.meters?.map((meter, index) => (
                        <tr key={index} className="Table-Row">
                            <td>{index}</td>
                            <td>
                                {meter._type[0] === "ColdWaterAreaMeter"
                                    ? <><WaterIcon /> ХВС</>
                                    : <><HotWaterIcon /> ГВС</>}
                            </td>
                            <td>{meter.installation_date}</td>
                            <td>{meter.is_automatic ? "да" : "нет"}</td>
                            <td>{meter.initial_values}</td>
                            <td>
                                {rootStore.addresses?.map((address) =>
                                    address.id === meter.area.id
                                        ? address.house.address
                                        : null
                                )}
                            </td>
                            <td>{meter.description}</td>
                            <td><Button meterId={meter.id} icon={<TrashIcon />} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {
                rootStore.pages.total > 1 && <Pagination />
            }
            
        </div>
    );
});

export default Table;
