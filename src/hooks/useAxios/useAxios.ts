import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { useEffect, useMemo, useState } from 'react'

type UseAxiosConfig = {
  enabled?: boolean
}

type UseAxiosReturn<T> = {
  loading: boolean
  err: AxiosError | null
  data: T | null
}

export const useAxios = <T = unknown>(
  url: string,
  options: AxiosRequestConfig = {},
  config: UseAxiosConfig = { enabled: true }
): UseAxiosReturn<T> => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [err, setErr] = useState<AxiosError | null>(null)

  // Memoize options so the useEffect runs only if the options or config change
  const stringifiedOptions = JSON.stringify(options)
  const stringifiedConfig = JSON.stringify(config)
  const memoizedOptions = useMemo(
    () => JSON.parse(stringifiedOptions),
    [stringifiedOptions]
  )
  const memoizedConfig = useMemo(
    () => JSON.parse(stringifiedConfig),
    [stringifiedConfig]
  )

  useEffect(() => {
    const source = axios.CancelToken.source()

    const fetchData = async () => {
      if (memoizedConfig.enabled === false) return
      setLoading(true)
      try {
        const response: AxiosResponse<T> = await axios.get(url, {
          cancelToken: source.token,
          ...memoizedOptions,
        })
        setData(response.data)
        setErr(null)
        setLoading(false)
      } catch (error) {
        if (axios.isCancel(error)) return
        // console.log('err', error)
        console.error('Error fetching data:', error)
        setErr(error as AxiosError)
        setLoading(false)
      }
    }

    fetchData()

    return () => {
      source.cancel('Operation canceled due to new request.')
    }
  }, [url, memoizedOptions, memoizedConfig])

  return { loading, err, data }
}
