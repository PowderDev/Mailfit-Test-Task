<template>
  <div class="input-group" @keypress="handleEnter($event.code)">
    <input type="text" class="input-group-field" placeholder="New todo" v-model="title" />
    <span class="input-group-button">
      <button class="button success"><i class="fa fa-plus"></i> Add</button>
    </span>
  </div>

  <transition-group name="fade" tag="ul" class="list no-bullet">
    <TodoListItem
      v-for="todo in todos"
      :todo="todo"
      @remove="todoToDelete = $event"
      @complete="completeTodo(props.taskId, $event)"
      @update="todoToUpdate = $event"
      :key="todo.id"
    ></TodoListItem>
  </transition-group>

  <Modal :is-open="!!todoToUpdate" @close="todoToUpdate = null" @approval="handleTaskUpdate" />
  <Modal :is-open="!!todoToDelete" @close="todoToDelete = ''" @approval="handleTaskDeletion" />
</template>

<script setup lang="ts">
import { PropType, ref, TransitionGroup } from "vue"
import { addTodo, deleteTodo, completeTodo, updateTodoTitle } from "../firebase/actions/todos"
import { Todo } from "../types"
import Modal from "./Modal.vue"
import TodoListItem from "./TodoListItem.vue"

const props = defineProps({
  taskId: { type: String, required: true },
  todos: { type: Array as PropType<Todo[]>, required: true },
})

const title = ref("")
const todoToUpdate = ref(null as any)
const todoToDelete = ref("")

const handleTaskUpdate = () => {
  updateTodoTitle(props.taskId, todoToUpdate.value.id, todoToUpdate.value.title)
  todoToUpdate.value = null
}

const handleTaskDeletion = () => {
  deleteTodo(props.taskId, todoToDelete.value)
  todoToDelete.value = ""
}

const handleAddTask = async () => {
  addTodo(props.taskId, title.value)
  title.value = ""
}

const handleEnter = (code: string) => {
  if (code === "Enter") handleAddTask()
}
</script>
