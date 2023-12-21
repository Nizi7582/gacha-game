<script setup lang="ts"></script>

<template>
  <div class="h-screen">
    <div
      class="w-full h-screen bg-[url('~/assets/home.jfif')] bg-center bg-cover fixed top-0 -z-10"
    ></div>

    <div class="flex items-end justify-center w-full h-full bg-gray-900/40">
      <div class="text-center">
        <h1 class="text-3xl font-semibold text-white lg:text-4xl">
          Gacha game
        </h1>
        <div class="group mb-10">
          <button class="w-20 h-20 absolute z-20">
            <img src="~/assets/gate.png" class="h-12 mx-auto" />
          </button>
          <button
            class="border-2 border-green-800 bg-gradient-to-b from-yellow-800 via-green-900 to-yellow-800 w-20 h-20 rotate-45 group-hover:rotate-180 duration-700 transition absolute"
          ></button>
          <button
            class="border-2 border-green-800 bg-gradient-to-tl to-green-800 via-yellow-700 from-green-800 w-20 h-20 rotate-[0deg] group-hover:rotate-[135deg] duration-700 transition "
          ></button>
        </div>
      </div>
    </div>
  </div>
</template>
