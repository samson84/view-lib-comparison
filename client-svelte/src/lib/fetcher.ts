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
  try {
    const responseBody = (await response.json()) as Res
    return responseBody
  } catch (error) {
    throw new Error(`Invalid JSON response`)
  }
}
