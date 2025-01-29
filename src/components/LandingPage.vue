<script setup lang="ts">
import '@/assets/main.css';
import { onMounted } from 'vue';
import type { Schema } from '../../amplify/data/resource';
import { generateClient } from 'aws-amplify/data';

const client = generateClient<Schema>();

function getUrlParams() {
  console.log("getUrlParams");
  let urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('product_id') && urlParams.has('base_number') && urlParams.has('offer_id')){
    let product_id = urlParams.get('product_id');
    let base_number = urlParams.get('base_number');
    let offer_id = urlParams.get('offer_id');
    
    console.log(product_id);
    console.log(base_number);
    console.log(offer_id);

    // if(client.models.LinkTracking.get())
    client.models.LinkTracking.create({
      productId: product_id,
      baseNumber: base_number,
      offerId: offer_id
    });   
  }
}
    
// fetch url params when the component is mounted
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
