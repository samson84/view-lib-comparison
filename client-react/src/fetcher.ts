import { useEffect, useState } from "react"

type FetcherOptions<Req> = {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  body?: Req
}
export const fetcher = async <Req extends {} | undefined, Res>(
  { url, method = 'GET', body = undefined }: FetcherOptions<Req>
) => {
  const response = await fetch(url, {
    method,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    headers: {
      ...(body !== undefined ? { 'content-type': 'application/json' } : undefined)
    }
  })
  if (!response.ok) {
    throw new Error(`Unsuccessful request (${response.status} ${response.statusText}).`)
  }
  const contentType = response.headers.get('content-type')
  if (!contentType?.includes('application/json')) {
    throw new Error(`Invalid data type in server response`)
  }
  const responseBody = (await response.json()) as Res
  return responseBody
}

type UseFetchOptions = {
  url: string,
}
export const useFetch = <Res>({ url }: UseFetchOptions) => {
  const [data, setData] = useState<Res | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const task = async () => {
      try {
        setLoading(true)
        setError(null)
        const responseBody = await fetcher<never, Res>({ url })
        setData(responseBody)
      } catch (fetchError) {
        if (fetchError instanceof Error) {
          setError(fetchError)
        } else {
          throw Error
        }
      } finally {
        setLoading(false)
      }
    }
    task()
  }, [])

  const mutate = async <MutateReq extends {} | undefined, MutateRes>(
    options: FetcherOptions<MutateReq>,
    changer: (updated: MutateRes, original: Res | null) => Res | null
  ) => {
    try {
      setLoading(true)
      setError(null)
      const responseBody = await fetcher<MutateReq, MutateRes>(options)
      const changed = changer(responseBody, data)
      setData(changed)
    } catch (mutateError) {
      if (mutateError instanceof Error) {
        setError(mutateError)
      } else {
        throw mutateError
      }
    } finally {
      setLoading(false)
    }
  }

  return { error, data, loading, mutate }
}
