<template>
  <li>
    <button :class="className" @click="emit('complete', task!.id)">
      <h6>{{ task?.title }}</h6>

      <div class="list-item__actions">
        <RouterLink :to="'/' + props.task?.id">
          <button class="action button info">
            <i class="fa fa-eye"></i>
          </button>
        </RouterLink>

        <button class="action button alert" @click.stop="emit('remove', task!.id)">
          <i class="fa fa-trash"></i>
        </button>
      </div>
    </button>
  </li>
</template>

<script setup lang="ts">
import { computed, PropType } from "vue"
import { Task } from "../types"

const props = defineProps({ task: { type: Object as PropType<Task> } })
const emit = defineEmits<{ (e: "remove", id: string): void; (e: "complete", id: string): void }>()

const completed = computed(() => props.task?.completed ?? false)

const className = computed(() => {
  let classes = ["list-item"]
  if (completed.value) classes.push("list-item--completed")
  return classes.join(" ")
})
</script>
