import { t } from "mobx-state-tree";

const AreaModel = t.model("AreaModel", {
    id: t.string,
});

export const MeterModel = t.model("MeterModel", {
    id: t.maybeNull(t.string),
    _type: t.array(t.string),
    area: AreaModel,
    is_automatic: t.maybeNull(t.boolean),
    communication: t.maybeNull(t.string),
    description: t.maybeNull(t.string),
    serial_number: t.maybeNull(t.string),
    installation_date: t.maybeNull(t.string),
    brand_name: t.maybeNull(t.string),
    model_name: t.maybeNull(t.string),
    initial_values: t.array(t.number),
});

export const Pages = t.model("Pages", {
    current: t.number,
    total: t.number
})
