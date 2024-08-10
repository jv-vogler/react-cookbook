import { HttpResponse, http } from 'msw'

export const handlers = [
  http.get('https://jsonplaceholder.typicode.com/todos', () => {
    return HttpResponse.json([
      {
        userId: 1,
        id: 1,
        title: 'Todo 1',
        completed: false,
      },
      {
        userId: 1,
        id: 2,
        title: 'Todo 2',
        completed: true,
      },
    ])
  }),
]
