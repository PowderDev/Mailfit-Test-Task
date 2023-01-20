<template>
  <section>
    <div v-if="!isLoading">
      <Header
        @open="isOpen = true"
        @close="handleCancellation"
        @changeable="isTitleChangeable = true"
        v-model="title"
        :is-changeable="isTitleChangeable"
      />
      <TodoList v-if="task" :task-id="task.id" :todos="todos" />
      <Modal :is-open="isOpen" @close="handleCancellation" @approval="handleUpdate" />
    </div>
    <Loader v-else />
  </section>
</template>

<script setup lang="ts">
import { collection, doc, orderBy, query } from "@firebase/firestore"
import { onMounted, ref, watchEffect } from "vue"
import { useRoute } from "vue-router"
import { useCollection, useDocument } from "vuefire"
import Loader from "../../components/Loader.vue"
import Modal from "../../components/Modal.vue"
import TodoList from "../../components/TodoList.vue"
import { db } from "../../firebase"
import { updateTaskTitle } from "../../firebase/actions/tasks"
import { Task, Todo } from "../../types"
import Header from "./Header.vue"

const route = useRoute()
const id = route.params.id as string
const { data: task, promise: taskPromise } = useDocument<Task>(doc(db, "tasks", id))
const tasksQuery = query(collection(db, "tasks", id, "todos"), orderBy("created_At", "desc"))
const { data: todos, promise: todoPromise } = useCollection<Todo>(tasksQuery)

const isTitleChangeable = ref(false)
const title = ref("")
const isOpen = ref(false)
const isLoading = ref(true)

const handleUpdate = () => {
  updateTaskTitle(task.value!.id, title.value)
  isOpen.value = false
  isTitleChangeable.value = false
}

const handleCancellation = () => {
  isTitleChangeable.value = false
  isOpen.value = false
  title.value = task.value!.title
}

// For some reason VueFire "pending" isn't the actual loading state
onMounted(async () => {
  await todoPromise.value
  await taskPromise.value
  isLoading.value = false
})

watchEffect(() => {
  if (task.value) title.value = task.value?.title
})
</script>
