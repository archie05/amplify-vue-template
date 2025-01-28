<script setup lang="ts">
import '@/assets/main.css';
import { onMounted, ref } from 'vue';
import type { Schema } from '../../amplify/data/resource';
import { generateClient } from 'aws-amplify/data';

const client = generateClient<Schema>();

// create a reactive reference to the array of todos
const todos = ref<Array<Schema['Todo']["type"]>>([]);

function listTodos() {
  client.models.Todo.observeQuery().subscribe({
    next: ({ items, isSynced }) => {
      todos.value = items
     },
  }); 
}

function createTodo() {
  client.models.Todo.create({
    content: window.prompt("Todo content")
  }).then(() => {
    // After creating a new todo, update the list of todos
    listTodos();
  });
}

function getUrlParams() {
  console.log("Test getUrlParams");
  let urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('product_id') && urlParams.has('base_number') && urlParams.has('offer_id')){
    console.log(urlParams.get('product_id'));
    console.log(urlParams.get('base_number'));
    console.log(urlParams.get('offer_id'));

    
  }
}
    
// fetch todos when the component is mounted
 onMounted(() => {
  getUrlParams()
});

</script>

<style scoped>
.image-container {
  width: 800px;
  height: 800px;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensures the image fills the div without distortion */
}
</style>

<template>
  <main>   
    <div id="nbo_img" class="image-container">
      <h1>Thank you for your interest!</h1>
      <img alt="NBO Image" src="../assets/YNBO 2025 white.png" >
    </div>
  </main>
</template>
