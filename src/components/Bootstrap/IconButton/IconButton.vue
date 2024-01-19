<template>
  <button class="icon-button" @click="handleClick">
    <i :class="icon"></i>
  </button>
  <calendar title=""></calendar>
</template>

<script>
import Calendar from 'primevue/calendar';
export default {
  name: "ZekIconButton",
  components: {
    Calendar
  },
  props: {
    icon: {
      type: String,
      required: true,
    },
  },
  emits: ["onClick"],
  methods: {
    handleClick() {
      // Handle button click event
      this.$emit("onClick")
    },
  },
};

</script>
