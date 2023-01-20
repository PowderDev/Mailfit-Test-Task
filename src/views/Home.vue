<template>
  <section>
    <div v-if="!isLoading">
      <h1>Mailfit</h1>
      <TaskList :tasks="tasks" />
    </div>
    <Loader v-else />
  </section>
</template>

<script setup lang="ts">
import { query, collection, orderBy } from "@firebase/firestore"
import { onMounted, ref } from "vue"
import { useCollection } from "vuefire"
import Loader from "../components/Loader.vue"
import TaskList from "../components/TaskList.vue"
import { db } from "../firebase"
import { Task } from "../types"

const isLoading = ref(true)

const tasksQuery = query(collection(db, "tasks"), orderBy("created_At", "desc"))
const { data: tasks, promise } = useCollection<Task>(tasksQuery)

// For some reason VueFire "pending" isn't the actual loading state
onMounted(() => promise.value.then(() => (isLoading.value = false)))
</script>
