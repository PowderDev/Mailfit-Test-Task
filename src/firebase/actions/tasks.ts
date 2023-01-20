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

export const addTask = async (title: string) => {
  const tasksRef = collection(db, "tasks")

  await addDoc(tasksRef, {
    title,
    completed: false,
    created_At: Timestamp.now(),
    todos: [],
  })
}

export const deleteTask = async (id: string) => {
  const taskRef = doc(db, "tasks", id)
  await deleteDoc(taskRef)
}

export const completeTask = async (id: string) => {
  const taskRef = doc(db, "tasks", id)
  const task = await getDoc(taskRef)
  await updateDoc(taskRef, { completed: !task.data()!.completed })
}

export const updateTaskTitle = async (id: string, title: string) => {
  const taskRef = doc(db, "tasks", id)
  await updateDoc(taskRef, { title })
}
