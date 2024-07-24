import {Instance, flow, t} from 'mobx-state-tree'
import { MeterModel, Pages } from './MeterModel'
import { AddressModel } from './AddressModel'
import { getAddress, getMeters } from '@/api/requests'

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
    pages: Pages
}).actions((store) => {
    const setMeters = flow(function*(page: number) {
        try {
            const offset = String(20 * page)
            const meters = yield getMeters(offset);
            store.meters.splice(0, store.meters.length);
            meters.results.forEach((meter: Meter) => store.meters.push(
                MeterModel.create(meter)
            ));
            store.pages.current = page;
            store.pages.total = Math.floor(meters.count / 20);
            console.log(store.pages.total);
            
        } catch (e) {
            console.log(e)
        }
        
    })
    const setAddresses =  flow(function*() {
        try {
            const addresses = yield getAddress();
            addresses.results.forEach((address: Address) => store.addresses.push(
                AddressModel.create(address)
            ))
        } catch (error) {
            console.log(error)
        }
    })
    return {
        setMeters,
        setAddresses
    }
})

export type RootStoreType = Instance<typeof RootStore>

let rootStore: RootStoreType | null = null

export const useRootStore = () => {
    if (!rootStore) {
        rootStore = RootStore.create({
            meters: [],
            addresses: [],
            pages: {
                current: 0,
                total: 0
            }
        })
    }
    return rootStore
}