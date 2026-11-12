<script setup lang="ts">

  defineOptions({
    name: 'CounterDisplay',
  });

  import { useCounterStore } from '../stores/counter';
  const counter = useCounterStore();
</script>

<template>
  <div>
    <h1>Count: {{ counter.count }}</h1>
    <p>Double: {{ counter.doubleCount }}</p>

    <button class="btn-primary" type="button" @click="counter.increment">
      Increment
    </button>
  </div>
</template>

<style scoped>
.btn-primary {
  cursor: pointer;
  background-color: #0056b3;
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  transition: all 0.3s ease;
}
.btn-primary:hover {
  background-color: #004085;
}
.btn-primary:active {
  transform: scale(0.95); /* Shrinks the button slightly */
  background-color: #00376f; /* Darkens the color further */
}

</style>
