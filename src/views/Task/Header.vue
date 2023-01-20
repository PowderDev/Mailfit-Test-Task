<template>
  <div class="header" @keypress="toggleTitleOnKey($event.code)">
    <div class="header__title-block">
      <button v-if="!isChangeable" @click="emit('changeable')" class="action button tiny info">
        <i class="fa fa-pencil"></i>
      </button>

      <button v-if="isChangeable" class="action button tiny alert" @click.stop="emit('close')">
        <i class="fa fa-times"></i>
      </button>

      <button v-if="isChangeable" class="action button tiny success" @click.stop="emit('open')">
        <i class="fa fa-check"></i>
      </button>

      <input
        class="title"
        :class="{ changeable: isChangeable }"
        :readonly="!isChangeable"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as any)!.value)"
      />
    </div>
    <RouterLink to="/">
      <a>Go Back</a>
    </RouterLink>
  </div>
</template>

<script lang="ts" setup>
const { isChangeable } = defineProps({
  isChangeable: { type: Boolean, required: true, default: false },
  modelValue: { type: String },
})
const emit = defineEmits<{ (e: "open"): void; (e: "close"): void; (e: "changeable"): void }>()

const toggleTitleOnKey = (code: string) => {
  if (code === "Enter") emit("open")
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.header__title-block {
  display: flex;
  align-items: center;
  gap: 10px;
}

.title {
  font-size: 36px;
  border: none;
  outline: none;

  &:read-only {
    background: white;
    cursor: default;
  }

  &.changeable {
    border: 1px solid black;
  }
}

@media screen and (max-width: 692px) {
  .header {
    margin-bottom: 40px;
    margin-top: 20px;
  }

  .title {
    font-size: 20px;
  }

  .header__title-block {
    gap: 5px;
  }

  button {
    padding: 0.5em 0.7em;
  }
}
</style>
