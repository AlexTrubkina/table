import {Instance, t} from 'mobx-state-tree'
import { MeterModel } from './MeterModel'
import { AddressModel } from './AddressModel'

interface Meter {
    id: string
    _type: string[]
    area: {
        id: string
    }
    is_automatic: boolean
    communication: string
    description: string
    serial_number: string
    installation_date: string
    brand_name: string
    model_name: string
    initial_values: number[]
}

interface Address {
    id: string
    number: number
    str_number: string
    str_number_full: string
    house: {
        address: string
        id: string
        fias_addrobjs: string[]
    }
}

export const RootStore = t.model('RootStore', {
    meters: t.array(MeterModel),
    addresses: t.array(AddressModel),
}).actions((store) => ({
    setMeters(meters: Meter[]) {
        meters.forEach(meter => store.meters.push(
            MeterModel.create(meter)
        ));
    },
    setAddresses(addresses: Address[]) {
        addresses.forEach(address => store.addresses.push(
            AddressModel.create(address)
        ))
    }
}))

export type RootStoreType = Instance<typeof RootStore>

let rootStore: RootStoreType | null = null

export const useRootStore = () => {
    if (!rootStore) {
        rootStore = RootStore.create({
            meters: [],
            addresses: [],
        })
    }
    return rootStore
}