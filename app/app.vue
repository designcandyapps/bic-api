<template>
  <div class="flex flex-col h-screen justify-center items-center mx-5">
    <div class="w-full max-w-7xl flex flex-col lg:flex-row gap-4 justify-center items-center">
      <div class="w-1/2 h-96 overflow-hidden items-center pt-4  flex flex-col gap-6">
        <button @click="getArticlesList" class="bg-gray-950 p-3 rounded-lg hover:bg-gray-800 text-sm">
          {{ isFetchingArticles ? "Fetching..." : "Fetch Articles" }}
        </button>
        <div class="w-full h-full p-4 overflow-x-auto bg-gray-800 text-gray-200 rounded-lg">
          <div v-if="articlesList.length">
            <vue-json-pretty show-icon :data="articlesList" theme="dark" />
          </div>
          <div v-if="!articlesList.length">No articles yet. Fetch some!</div>
        </div>
      </div>

      <div class="w-1/2 h-96 overflow-hidden items-center pt-4  flex flex-col gap-6">
        <div class="w-full flex gap-4 px-1">
          <input v-model="articleLink" type="text" class="border text-sm rounded-lg block w-full p-2 bg-gray-800 border-gray-600 placeholder-gray-500 text-white" placeholder="https://www.article-link.com.br" required />
          <button :disabled="!articleLink.length" @click="getArticleContent" class="bg-gray-950 w-52 p-3 rounded-lg hover:bg-gray-800 text-sm">
            {{ isFetchingArticleContent ? "Fetching..." : "Fetch Article Content" }}
          </button>
        </div>

        <div class="w-full h-full p-4 overflow-x-auto bg-gray-800 text-gray-200 rounded-lg">
          <div v-if="Object.keys(articleContent).length">
            <vue-json-pretty show-icon :data="articleContent" theme="dark" />
          </div>
          <div v-if="!articleContent.length">No articles yet. Fetch some!</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';

useHead({
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { key: "theme-color", name: "theme-color", content: "white" }
  ],
  bodyAttrs: {
    class: "bg-gray-900 text-gray-200 antialiased"
  }
});

const articlesList = ref([]);
const articleContent = ref([])
const isFetchingArticles = ref(false);
const isFetchingArticleContent = ref(false)
const articleLink = ref("")

const getArticlesList = async () => {
  try {
    isFetchingArticles.value = true;
    const response = await $fetch('/api/articles', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    articlesList.value = response.data;
    isFetchingArticles.value = false
  } catch (error) {
    console.log(error);
    isFetchingArticles.value = false
  }
};

const getArticleContent = async () => {
  try {
    isFetchingArticleContent.value = true;
    const response = await $fetch('/api/articles/content', {
      method: 'GET',
      query: { link: articleLink.value },
      headers: {
        'Content-Type': 'application/json'
      },
    });

    articleContent.value = response.data;
    isFetchingArticleContent.value = false
    articleLink.value = ""
  } catch (error) {
    console.log(error);
    isFetchingArticleContent.value = false
  }
};
</script>
