import { t } from 'mobx-state-tree'

const HouseModel = t.model('HouseModel', {
  address: t.string,
  id: t.string,
  fias_addrobjs: t.array(t.string),
})

export const AddressModel = t.model('AddressModel', {
  id: t.string,
  number: t.number,
  str_number: t.string,
  str_number_full: t.string,
  house: HouseModel,
})
