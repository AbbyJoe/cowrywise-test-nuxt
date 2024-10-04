<template>
    <div class="header">
      <input 
        v-if="search" 
        type="text" 
        placeholder="Search for a photo" 
        class="search-input"
        v-model="searchInput"
        @keyup.enter="fetchUnsplash('search')"
      />
      <div v-else class="search-field">
        <button @click="fetchUnsplash('reset')" class="search-back__button" type="button">
            <img src="~/assets/images/left-arrow.png" width="40" alt="left-arrow">
        </button>
        <span>{{ generalStore.loading ? 'Searching for ' : 'Search Results for ' }} </span>
        <span class="searched-query">"{{ searchInput }}"</span>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
    import { useGeneralStore } from '~/store/general'
    const generalStore = useGeneralStore()
    const searchInput = ref('');
    const search = ref(true);
    const emit = defineEmits(['search']);
  
  const fetchUnsplash = (type) => {
    search.value = false;
    switch (type) {
        case 'search':
            emit('search', searchInput.value);
            break;
        case 'reset':
            search.value = true
            searchInput.value = ''
            emit('search', '');
            break;
        default:
            break;
    }
  };
  </script>
  
  <style lang="scss" scoped>
  .header {
    height: 350px;
    display: flex;
    align-items: center;
    background: #dde2e9;
    .search {
        &-input {
            height: 60px;
            width: 80%;
            padding-left: 4em;
            color: #263958;
            margin: auto;
            border-radius: 8px;
            box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.05);
            border: 0px;
            font-size: 16px;
            background: url('~/assets/images/search.svg') no-repeat 20px 50% white;
            outline: none;
            &::placeholder {
                color: #263958;
            }
        }
        &-field {
            display: flex;
            align-items: center;
            gap: 15px;
            color: #263958;
            font-size: 38px;
            font-weight: 700;
            padding-left: 10rem;
        }
        &-back__button {
            border: 0;
            background: none;
        }
    }
    .searched-query {
        opacity: 0.8;
    }
  }
  @media (max-width: 768px) {
    .header {
        .search-field {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 5px;
            font-size: 24px;
            padding-left: 1rem;
            button {
                img {
                    width: 30px;
                }
            }
        }
    }
  }
  </style>
  