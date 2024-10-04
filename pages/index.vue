<template>
    <div>
      <Header @search="searchFor" />
      <ImageSection @displayModal="displayModal" :query="searchQuery" />
      <div v-if="modal" class="single-image-body">
        <div class="image-modal-body">
          <div class="single-image-div">
            <img :src="url" alt="Unsplash image" />
          </div>
          <div class="single-image-description-div">
            <div class="photographer">{{ photographer }}</div>
            <div class="location">{{ location }}</div>
          </div>
        </div>
        <span class="close-modal" @click="closeModal">&times;</span>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  const searchQuery = ref<string>('');
  const modal = ref<boolean>(false);
  const url = ref<string>('');
  const photographer = ref<string>('');
  const location = ref<string>('');
  
  const searchFor = (val: string) => {
    searchQuery.value = val;
  };
  
  const closeModal = () => {
    modal.value = false;
  };
  
  const displayModal = (data: { url: string; photographer: string; location: string }) => {
    photographer.value = data.photographer;
    location.value = data.location;
    url.value = data.url;
    modal.value = true;
  };
  </script>
  
  <style lang="scss" scoped>
  @import url('https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap');
  .single-image-body {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .image-modal-body {
    width: 800px;
    max-width: 80%;
    height: 600px;
    max-height: 80%;
    border-radius: 15px;
    animation: scale 0.3s linear;
  }
  
  @keyframes scale {
    from {
      transform: scale(0);
    }
  }
  
  .single-image-div {
    height: 80%;
    background: lightgrey;
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
    
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      border-top-right-radius: 15px;
      border-top-left-radius: 15px;
    }
  }
  
  .single-image-description-div {
    height: 5%;
    background: white;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    padding-left: 3rem;
    padding-top: 1.8rem;
    padding-bottom: 3rem;
    
    .photographer {
      font-size: 24px;
      color: #2a3d5b;
      font-weight: 600;
    }
  
    .location {
      font-size: 14px;
      font-weight: 600;
      color: #2a3d5b;
      opacity: 0.8;
      margin-top: 3px;
    }
  }
  
  .close-modal {
    font-size: 30px;
    position: absolute;
    top: 40px;
    right: 40px;
    color: white;
    cursor: pointer;
    transition: all 0.5s linear;
  }
  
  .close-modal:hover {
    color: lightgrey;
    transform: scale(1.1);
  }
  </style>
  