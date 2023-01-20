<template>
  <transition name="modal">
    <div v-if="isOpen">
      <div class="overlay" @click.self="emit('close')">
        <div class="modal">
          <h1>Confirm the Action</h1>
          <div class="action-buttons">
            <button class="button success" @click.self="emit('approval')">Yes</button>
            <button class="button" @click.self="emit('close')">Close</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
defineProps({
  isOpen: { type: Boolean, required: true, default: false },
})
const emit = defineEmits<{ (e: "close"): void; (e: "approval"): void }>()
</script>

<style scoped>
.modal {
  width: 500px;
  margin: 0px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px 3px;
  transition: all 1s ease-in;
  font-family: Helvetica, Arial, sans-serif;
}
.fadeIn-enter {
  opacity: 0;
}

.fadeIn-leave-active {
  opacity: 0;
  transition: all 1s step-end;
}

.fadeIn-enter .modal,
.fadeIn-leave-active.modal {
  transform: scale(1.1);
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
  width: 100%;
  margin-top: 24px;
}

.button {
  width: 100%;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #00000094;
  z-index: 999;
  transition: opacity 0.2s ease;
}
</style>
