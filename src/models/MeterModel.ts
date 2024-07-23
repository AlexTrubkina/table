import {t} from 'mobx-state-tree'

const AreaModel = t.model('AreaModel', {
    id: t.string,
})

export const MeterModel = t.model('MeterModel', {
    id: t.string,
    _type: t.array(t.string),
    area: AreaModel,
    is_automatic: t.boolean,
    communication: t.string,
    description: t.string,
    serial_number: t.string,
    installation_date: t.string,
    brand_name: t.string,
    model_name: t.string,
    initial_values: t.array(t.number),
})


