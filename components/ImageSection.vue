<template>
    <div class="image-container">
        <span class="no-result" v-if="!generalStore.loading && props.query && images.length < 1">No result found for "{{ props.query }}"</span>
      <div class="grid" v-show="!generalStore.loading">
        <div
            v-for="(image, index) in images"
            :key="image.id"
            class="item"
            :style="`grid-row-end: span ${image.spanSize}`"
            @click="showSingleImage(index, image)"
        >

          <div class="image-overlay">
            <div class="photographer-name">
              {{ image.user.first_name }} {{ image.user.last_name }}
            </div>
            <div class="photographer-location">{{ image.user.location }}</div>
          </div>
          <img
            :src="image.urls.full"
            class="images"
            :alt="image.description"
            @load="loaded"
          />
        </div>
      </div>
  
      <div v-show="generalStore.loading" class="grid">
        <div v-for="image in 6" :key="image" class="item-loader" :style="`grid-row-end: span ${calculateSpan()}`">
          <div class="skeleton">
            <div class="line"></div>
            <div class="line"></div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import axios from 'axios'
  import { useGeneralStore } from '~/store/general'
  const generalStore = useGeneralStore()
  const props = defineProps({
    query: {
      type: String,
      default: '',
      required: false,
    },
  });
  const emit = defineEmits(['displayModal'])
  
  const loading = ref(true);
  const images = ref<any[]>([]);
  
  const calculateSpan = (): number => {
    return Math.ceil(Math.random() * 3) + 3;
  };
  
  const loaded = () => {
    loading.value = false;
  };
  
  const loadFromUnsplash = async () => {
    const runtimeConfig = useRuntimeConfig().public
    try {
        generalStore.setLoading(true)
        const imagesData = await axios.get(`${runtimeConfig.BASE_URL}?query=${props.query || 'Nigeria'}`, { headers: { Authorization: `Client-ID ${runtimeConfig.UNSPLASH_ACCESS_KEY}` }});
        const fetchedImages = imagesData?.data?.results;

        images.value = fetchedImages.map((image: any) => {
            return {
                ...image,
                spanSize: Math.ceil(Math.random() * 3) + 3,
            };
        });
        
        generalStore.setLoading(false)
        } catch (error) {
            generalStore.setLoading(false)
            console.error('Error fetching photos:', error);
        }
    };
  
  const showSingleImage = (index: number, data) => {
    const { urls, user, alt_description } = data
    const url = urls.full;
    const location = user.location || alt_description;
    const photographer = `${user.first_name} ${user.last_name}`;
  
    emit('displayModal', {
      url,
      location,
      photographer,
    });
  };
  onMounted(() => {
    loadFromUnsplash();
  });
  
  watch(() => props.query, () => {
    loadFromUnsplash();
  });
  </script>
  
  <style lang="scss" scoped>
  .image-container {
    min-height: calc(100vh - 350px);
    position: relative;
    bottom: 120px;
    margin: auto;
    max-width: 980px;
    .no-result {
        color: #263958;
        font-size: 21px;
        font-weight: 500;
    }
  
    .grid {
      display: grid;
      grid-row-gap: 30px;
      grid-column-gap: 40px;
      column-gap: 40px;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      text-rendering: optimizeLegibility;
      padding: 3rem;
    }
  
    .item,
    .item-loader {
      background-color: #ffffff;
      min-height: 300px;
      border-radius: 8px;
      transition: all 0.5s;
      position: relative;
    }
  
    .item:hover {
      transform: scale(1.07);
      cursor: pointer;
    }
  
    .images {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 10px;
    }
  
    .image-overlay {
        padding-bottom: 1.5rem;
        padding-left: 1rem;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: linear-gradient(rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.95));
        border-radius: 10px;
        color: white;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }
  
    .photographer-name {
      font-size: 16px;
    }
  
    .photographer-location {
      font-size: 12px;
      margin-top: 3px;
    }
  
    .skeleton {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: 0 0 1em 1em;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background: #f5f5f5;
      background: linear-gradient(#f5f5f5, 100%, transparent 0);
      border-radius: 10px;
      animation: shine-lines 1.6s infinite linear;
  
      .line {
        width: 140px;
        height: 10px;
        margin-top: 12px;
        border-radius: 2px;
        background-image: linear-gradient(90deg, #ddd 0px, #e8e8e8 40px, #ddd 80px);
        background-size: 600px;
        animation: shine-lines 1.6s infinite linear;
  
        &:nth-child(even) {
          width: 70px;
        }
      }
    }
  
    @keyframes shine-lines {
      0% {
        background-position: -100px;
      }
      40%,
      100% {
        background-position: 140px;
      }
    }
  }
  @media (max-width: 768px) {
    .image-container {
    .no-result {
            padding: 0 25px;
            font-size: 15px;
        }
    }
  }
  </style>
  