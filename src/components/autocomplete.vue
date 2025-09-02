<script setup lang="ts">
import { ref, computed } from "vue";

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  placeholder: {
    type: String,
    default: "Cerca...",
  }
});

const emit = defineEmits(["select"]);

const query = ref("");
const isOpen = ref(false);
const highlightedIndex = ref(-1);

const filteredOptions = computed(() => {
  if (!query.value) return [];
  return props.options.filter(opt =>
    opt.toLowerCase().includes(query.value.toLowerCase())  /*la lettera è inclusa nella lista della stringa */
    /*opt.toLowerCase().startsWith(query.value.toLowerCase())*/
  );
});

function onInput(e: { target: { value: string; }; }) {
  query.value = e.target.value;
  isOpen.value = true;
  highlightedIndex.value = -1;
}

function selectOption(option) {
  query.value = option;
  isOpen.value = false;
  emit("select", option);
}

function onKeyDown(e) {
  if (!isOpen.value || filteredOptions.value.length === 0) return;

  if (e.key === "ArrowDown") {
    highlightedIndex.value = (highlightedIndex.value + 1) % filteredOptions.value.length;
    e.preventDefault();
  } else if (e.key === "ArrowUp") {
    highlightedIndex.value =
      (highlightedIndex.value - 1 + filteredOptions.value.length) % filteredOptions.value.length;
    e.preventDefault();
  } else if (e.key === "Enter" && highlightedIndex.value >= 0) {
    selectOption(filteredOptions.value[highlightedIndex.value]);
  } else if (e.key === "Escape") {
    isOpen.value = false;
  }
}
</script>

<template>
  <div class="autocomplete">
    <input
      type="text"
      :placeholder="placeholder"
      v-model="query"
      @input="onInput"
      @keydown="onKeyDown"
      @focus="isOpen = true"
    />

    <ul v-if="isOpen && filteredOptions.length" class="dropdown">
      <li
        v-for="(option, index) in filteredOptions"
        :key="index"
        :class="{ highlighted: index === highlightedIndex }"
        @mousedown.prevent="selectOption(option)"
      >
        {{ option }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.autocomplete {
  position: relative;
  width: 250px;
}

input {
  width: 100%;
  padding: 6px;
  border: 1px solid black;
  box-sizing: border-box;
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ccc;
  max-height: 150px;
  overflow-y: auto;
  margin: 0;
  padding: 0;
  list-style: none;
  z-index: 10;
}

.dropdown li {
  padding: 6px;
  cursor: pointer;
}

.dropdown li.highlighted,
.dropdown li:hover {
  background: lightgreen;
}
</style>
