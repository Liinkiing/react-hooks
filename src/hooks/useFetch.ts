import { Reducer, useEffect, useMemo, useReducer, useState } from 'react'

type State<R extends any = any> = {
  error: string | null
  loading: boolean
  status: 'pending' | 'error' | 'success' | 'canceled'
  data: R | null
}

type Action<R extends any = any> =
  | { readonly type: 'FETCH_INIT' }
  | { readonly type: 'FETCH_FAILED'; payload: string }
  | { readonly type: 'FETCH_CANCELED' }
  | { readonly type: 'FETCH_SUCCESS'; payload: R }

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        data: null,
        loading: true,
        error: null,
        status: 'pending',
      }
    case 'FETCH_FAILED':
      return {
        data: null,
        loading: false,
        error: action.payload,
        status: 'error',
      }
    case 'FETCH_CANCELED':
      return {
        data: null,
        error: null,
        loading: false,
        status: 'canceled',
      }
    case 'FETCH_SUCCESS':
      return {
        error: null,
        status: 'success',
        loading: false,
        data: action.payload,
      }
    default:
      throw new Error('Unknown action')
  }
}

type Options = {
  readonly fetchOptions?: RequestInit
  readonly lazy?: boolean
}

function useApi<R extends any = any>(endpoint: string, options: Options = { lazy: false }) {
  const memoizedOptions = useMemo(() => options, [])
  const [url, setUrl] = useState(() => (options && options.lazy ? null : endpoint))
  const [state, dispatch] = useReducer<Reducer<State<R>, Action<R>>>(reducer, { status: 'pending', data: null, loading: false, error: null })
  useEffect(() => {
    let didCancel = false
    if (url) {
      const doFetch = async () => {
        try {
          dispatch({ type: 'FETCH_INIT' })
          const response = await fetch(url, memoizedOptions.fetchOptions)
          if (response.ok) {
            const json = (await response.json()) as R
            if (!didCancel) {
              dispatch({ type: 'FETCH_SUCCESS', payload: json })
            }
          } else {
            const body = await response.text()
            dispatch({ type: 'FETCH_FAILED', payload: body })
          }
        } catch (e) {
          dispatch({ type: 'FETCH_FAILED', payload: e })
        }
      }
      doFetch()
    }
    return () => {
      didCancel = true
      dispatch({ type: 'FETCH_CANCELED' })
    }
  }, [memoizedOptions, url])

  return [state, setUrl] as const
}

export default useApi
