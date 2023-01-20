<template>
  <div class="input-group" @keypress="handleEnter($event.code)">
    <input type="text" class="input-group-field" v-model="title" placeholder="New task" />
    <span class="input-group-button">
      <button class="button success" @click="handleAddTodo"><i class="fa fa-plus"></i> Add</button>
    </span>
  </div>

  <transition-group name="fade" tag="ul" class="list no-bullet">
    <TaskListItem
      v-for="task in tasks"
      :task="task"
      @remove="taskToDelete = $event"
      @complete="completeTask"
      :key="task.id"
    ></TaskListItem>
  </transition-group>

  <Modal :is-open="!!taskToDelete" @close="taskToDelete = ''" @approval="handleTaskDeletion" />
</template>

<script setup lang="ts">
import { PropType, ref, TransitionGroup } from "vue"
import TaskListItem from "../components/TaskListItem.vue"
import { Task } from "../types"
import { addTask, deleteTask, completeTask } from "../firebase/actions/tasks"
import Modal from "./Modal.vue"

defineProps({ tasks: { type: Array as PropType<Task[]>, required: true } })

const title = ref("")
const taskToDelete = ref("")

const handleTaskDeletion = () => {
  deleteTask(taskToDelete.value)
  taskToDelete.value = ""
}

const handleAddTodo = async () => {
  addTask(title.value)
  title.value = ""
}

const handleEnter = (code: string) => {
  if (code === "Enter") handleAddTodo()
}
</script>
