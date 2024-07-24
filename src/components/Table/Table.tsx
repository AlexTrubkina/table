import { ReactElement, useEffect } from "react";
import "./Table.scss";
import { HotWaterIcon, WaterIcon } from "@/assets/icons";
import Pagination from "../Pagination/Pagination";
import { useRootStore } from "@/models/RootStore";
import {observer} from "mobx-react-lite";


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
                    </tr>
                </thead>
                <tbody className="Table-Body">
                    {rootStore.meters?.map((meter, index) => (
                        <tr key={index}>
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
                            <td>{meter.communication}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination/>
        </div>
    );
});

export default Table;
