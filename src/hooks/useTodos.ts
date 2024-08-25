import { queryOptions, useQuery } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { z } from 'zod'

const BASE_URL = 'https://jsonplaceholder.typicode.com/posts'
const ERROR_404_URL = 'https://jsonplaceholder.typicode.com/postss'
const ERROR_NETWORK_URL = 'https://jsonplaceholderrrr.typicode.com/posts'

const todosSchema = z.array(
  z
    .object({
      id: z.number(),
      userId: z.number(),
      title: z.string(),
      body: z.string(),
    })
    .strict() // Without using .strict(), Zod just ignores unrecognized keys by default
)

type Todo = z.infer<typeof todosSchema>

const fetchQueryFn = () => fetch(BASE_URL).then((res) => res.json() as Promise<Todo[]>)
const axiosQueryFn = async (id?: number) => {
  const response = await axios.get<Todo[]>(`${BASE_URL}/${id ?? ''}`)

  return todosSchema.parse(response.data)
}

export const todoQueries = {
  allKeys: () => ['todos'] as const,
  listKeys: () => [...todoQueries.allKeys(), 'list'] as const,
  listQuery: (filters?: string) =>
    queryOptions({
      queryKey: [...todoQueries.listKeys(), filters],
      queryFn: () => axiosQueryFn(),
      throwOnError: (error) => {
        if (error instanceof AxiosError) {
          if (!error.response) return true // Network Error

          return error.response?.status >= 500 // Server Error
        }

        return false // Do not propagate to the error boundary and let React Query handle
      },
    }),
  detailsKey: () => [...todoQueries.allKeys(), 'details'] as const,
  detailsQuery: (id: number) =>
    queryOptions({
      queryKey: [...todoQueries.detailsKey(), id],
      queryFn: () => axiosQueryFn(id),
    }),
}

export const useTodos = () => {
  return useQuery(todoQueries.listQuery())
}

export const useTodo = (id: number) => {
  return useQuery(todoQueries.detailsQuery(id))
}
