import { ReactNode } from 'react'

type AsyncDataDisplayPropsType = {
  err: Error | null
  errComponent?: ReactNode
  children: ReactNode
}

const AsyncDataDisplay = ({
  // loading,
  // loadingComponent,
  err,
  errComponent,
  children,
}: AsyncDataDisplayPropsType) => {
  return (
    <>
      {err
        ? errComponent || (
            <div className="text-5xl text-red-600">{err.message}</div>
          )
        : children}
    </>
  )
}

export default AsyncDataDisplay
