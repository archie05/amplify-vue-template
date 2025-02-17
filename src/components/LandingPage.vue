<script setup lang="ts">
import '@/assets/main.css';
import { onMounted } from 'vue';
import type { Schema } from '../../amplify/data/resource';
import { generateClient } from 'aws-amplify/data';
import { off } from 'node:process';

const client = generateClient<Schema>();

async function isUniqueLink(product_id: string, base_number: string, offer_id: string) {
  const {data: links, errors} = await client.models.LinkTracking.list({
    filter: {
      productId: {
        eq: product_id
      },
      baseNumber: {
        eq: base_number
      },
      offerId: {
        eq: offer_id
      }
    }
  });
  
  if(errors){
    console.log(errors);
  }
  
  // Return true if no existing record was found (unique), false otherwise
  return links.length === 0;
}

async function getUrlParams() {
  let urlParams = new URLSearchParams(window.location.search);

  const product_id = urlParams.get('product_id');
  const base_number = urlParams.get('base_number');
  const offer_id = urlParams.get('offer_id');

  if (product_id && base_number && offer_id){
    const isUnique = await isUniqueLink(product_id, base_number, offer_id);

    if(isUnique){
      await client.models.LinkTracking.create({
        productId: product_id,
        baseNumber: base_number,
        offerId: offer_id
      });
    } else {
      console.log("Duplicate LinkTracking record found. Not creating a new one.");
    }
  } else {
    console.error("Missing URL parameters: product_id, base_number, or offer_id.");
  }
}
    
// fetch url params when the component is mounted
 onMounted(() => {
  getUrlParams()
});

</script>

<style scoped>
.image-container {
  max-width: 90vw; /* Ensures it scales down on smaller screens */
  max-height: 90vh; /* Prevents it from exceeding viewport height */
  width: 800px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: 0 auto;
}

.image-container img {
  width: 100%;
  height: auto;
  object-fit: cover; /* Ensures the image fills the div without distortion */
}

/* Responsive Design */
@media (max-width: 900px) {
  .image-container {
    width: 90%;
  }
}

@media (max-width: 600px) {
  .image-container {
    width: 100%;
  }

  .image-container h1 {
    font-size: 1.5rem;
  }
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
