import { ReactElement, useEffect, useState } from 'react'
import PaginationButton from './PaginationButton'
import './Pagination.scss'
import { useRootStore } from '@/models/RootStore'
import { observer } from 'mobx-react-lite'
import { setNumberPagesArray } from '@/components/Pagination/helpers/setNumberPagesArray'

const Pagination = observer((): ReactElement => {
  const rootStore = useRootStore()
  const [numbers, setNumbers] = useState<string[]>([])

  useEffect(() => {
    setNumbers(setNumberPagesArray(rootStore.pages.current, rootStore.pages.total))
  }, [rootStore.pages.current, rootStore.deleteMeterInfo])

  return (
    <div className="Pagination">
      {numbers.map((page: string, index: number) => (
        <PaginationButton
          key={index}
          number={page}
        />
      ))}
    </div>
  )
})

export default Pagination
