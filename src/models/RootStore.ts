import { Instance, flow, t } from 'mobx-state-tree'
import { MeterModel, Pages } from './MeterModel'
import { AddressModel } from './AddressModel'
import { deleteMeter, getAddress, getMeters } from '@/api/requests'
import { Meter, Address } from '@/helpers/types'

export const RootStore = t
  .model('RootStore', {
    meters: t.array(MeterModel),
    addresses: t.array(AddressModel),
    pages: Pages,
    isLoading: t.boolean,
  })
  .actions((store) => {
    const setMeters = flow(function* (page: number) {
      try {
        store.isLoading = true
        const offset = String(20 * page)
        const meters = yield getMeters(offset)
        store.meters.splice(0, store.meters.length)
        meters.results.forEach((meter: Meter) => store.meters.push(MeterModel.create(meter)))
        store.pages.current = page
        store.pages.total = Math.floor(meters.count / 20)
      } catch (e) {
        console.log(e)
      } finally {
        store.isLoading = false
      }
    })
    const setAddresses = flow(function* () {
      try {
        store.isLoading = true
        const addresses = yield getAddress()
        addresses.results.forEach((address: Address) => store.addresses.push(AddressModel.create(address)))
      } catch (error) {
        console.log(error)
      } finally {
        store.isLoading = false
      }
    })

    const deleteMeterInfo = flow(function* (id: string) {
      try {
        store.isLoading = true
        yield deleteMeter(id)
      } catch (e) {
        console.log(e)
      } finally {
        store.isLoading = false
      }
    })
    return {
      setMeters,
      setAddresses,
      deleteMeterInfo,
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
        total: 0,
      },
      isLoading: false,
    })
  }
  return rootStore
}
