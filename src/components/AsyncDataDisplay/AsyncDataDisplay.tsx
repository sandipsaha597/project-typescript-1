import { AxiosError } from 'axios'
import { ReactNode } from 'react'

type AsyncDataDisplayPropsType = {
  loading: boolean
  loadingComponent?: ReactNode
  err: AxiosError | null
  errComponent?: ReactNode
  children: ReactNode
}

const AsyncDataDisplay = ({
  loading,
  loadingComponent,
  err,
  errComponent,
  children,
}: AsyncDataDisplayPropsType) => {
  return (
    <>
      {loading
        ? loadingComponent || (
            <div className="text-5xl font-bold">Loading...</div>
          )
        : err
        ? errComponent || (
            <div className="text-5xl text-red-600">{err.message}</div>
          )
        : children}
    </>
  )
}

export default AsyncDataDisplay
