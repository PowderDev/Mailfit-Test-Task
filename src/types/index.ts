import { Timestamp } from "firebase/firestore"

export interface Task {
  id: string
  title: string
  completed: boolean
  created_At: Timestamp
  todos: Todo[]
}

export interface Todo {
  id: string
  title: string
  completed: boolean
  created_At: Timestamp
}
