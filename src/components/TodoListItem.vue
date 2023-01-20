<template>
  <li>
    <div
      class="list-item"
      :class="{ 'list-item--completed': todo?.completed }"
      @click="handleItemClick"
    >
      <input
        class="title"
        :class="{ changeable: isTodoChangeable }"
        :style="{ background: isTodoChangeable ? 'white' : '' }"
        :readonly="!isTodoChangeable"
        v-model="title"
        @click.stop=""
        @keypress="handleEnter($event.code)"
      />

      <div class="list-item__actions">
        <button
          v-if="!isTodoChangeable"
          class="action button info"
          @click.stop="handleCancellation"
        >
          <i class="fa fa-pencil"></i>
        </button>

        <button v-else class="action button success" @click.stop="handleUpdateTodo">
          <i class="fa fa-check"></i>
        </button>

        <button
          v-if="!isTodoChangeable"
          class="action button alert"
          @click.stop="emit('remove', todo!.id)"
        >
          <i class="fa fa-trash"></i>
        </button>

        <button v-else class="action button alert" @click.stop="handleCancellation">
          <i class="fa fa-times"></i>
        </button>
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
import { PropType, ref, watchEffect } from "vue"
import { Todo } from "../types"

const props = defineProps({ todo: { type: Object as PropType<Todo> } })
const emit = defineEmits<{
  (e: "remove", id: string): void
  (e: "complete", id: string): void
  (e: "update", data: { id: string; title: string }): void
}>()

const isTodoChangeable = ref(false)
const title = ref("")

const handleCancellation = () => {
  isTodoChangeable.value = !isTodoChangeable.value
  title.value = props.todo!.title
}

const handleItemClick = () => {
  emit("complete", props.todo!.id)
  isTodoChangeable.value = false
}

const handleUpdateTodo = () => {
  emit("update", { id: props.todo!.id, title: title.value })
  isTodoChangeable.value = false
  title.value = props.todo!.title
}

const handleEnter = (code: string) => {
  if (code === "Enter") handleUpdateTodo()
}

watchEffect(() => {
  if (props.todo) title.value = props.todo.title
})
</script>

<style lang="scss" scoped>
.title {
  font-size: 20px;
  border: none;
  outline: none;

  &:read-only {
    cursor: default;
  }

  &.changeable {
    border: 1px solid black;
  }
}
</style>
