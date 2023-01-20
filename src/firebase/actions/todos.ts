import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore"
import { db } from ".."

export const addTodo = async (taskId: string, title: string) => {
  const todosRef = collection(db, "tasks", taskId, "todos")

  await addDoc(todosRef, {
    title,
    completed: false,
    created_At: Timestamp.now(),
    todos: [],
  })
}

export const deleteTodo = async (taskId: string, id: string) => {
  const todoRef = doc(db, "tasks", taskId, "todos", id)
  await deleteDoc(todoRef)
}

export const completeTodo = async (taskId: string, id: string) => {
  const todoRef = doc(db, "tasks", taskId, "todos", id)
  const todo = await getDoc(todoRef)
  await updateDoc(todoRef, { completed: !todo.data()!.completed })
}

export const updateTodoTitle = async (taskId: string, id: string, title: string) => {
  const todoRef = doc(db, "tasks", taskId, "todos", id)
  await updateDoc(todoRef, { title })
}
