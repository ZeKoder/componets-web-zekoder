<template>
  <button class="text-button" @click="handleClick">
    {{ buttonText }}
  </button>
</template>

<script>
export default {
  name: "TextButton",
  data() {
    return {
      buttonText: "Click me",
    };
  },
  methods: {
    handleClick() {
      console.log("Button clicked");
    },
  },
};
</script>

<style scoped>
.text-button {
  /* Add your button styles here */
}
</style>
