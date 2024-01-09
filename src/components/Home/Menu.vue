<style></style>

<template>
  <div class="flex items-end justify-start gap-x-[50px] h-full ">
    <NuxtLink to="/map" class="group ml-6 mb-6 bg-gradient-to-tl from-gray-900 via-yellow-900 to-yellow-900 rounded-full border-2 p-3">
      <button
        class="flex justify-center py-4 w-44 h-44 items-center border-2 border-white rounded-3xl bg-gradient-to-tl from-gray-300 via-gray-500 to-gray-400"
      >
        <button class="z-20 group">
          <img
            src="~/assets/img/cat-map.png"
            class="w-32 mx-auto transition duration-700 hover:opacity-100 group-hover:scale-105"
          />
          <div class="text-3xl uppercase text-white">Carto</div>
        </button>
      </button>
    </NuxtLink>
    <NuxtLink to="/inventory" class="flex justify-center mb-6 group">
      <button
        class="flex justify-center py-2 w-32 h-32 items-center  border-white rounded-3xl  bg-gradient-to-tl from-gray-900 via-gray-800 to-gray-900"
      >
      <button class="z-20 group">
        <img
          src="~/assets/img/bag.png"
          class="w-20 mx-auto transition duration-700 opacity-60 group-hover:opacity-100 group-hover:scale-105"
        />
        <div class="text-2xl uppercase text-white mt-2">Bago</div>

      </button>
    </button>
    </NuxtLink>
    <NuxtLink to="/invocations" class="flex justify-center mb-6 group ">
      <div
        class="absolute px-2 pt-1 text-2xl font-semibold tracking-wider text-white duration-700 transform border-2 border-blue-800 shadow-xl opacity-0 bg-gradient-to-tl from-gray-900 via-purple-900 to-blue-900 rounded-xl transition-allx bottom-28 group-hover:bottom-32 lg:text-3xl group-hover:opacity-100"
      >
        Invocation
      </div>
      <button class="absolute z-20 w-20 h-20 bottom-7">
        <img
          src="~/assets/img/gate.png"
          class="h-12 mx-auto transition duration-700 opacity-60 group-hover:opacity-100 group-hover:scale-105"
        />
      </button>
      
      <button
        class="absolute w-20 h-20 transition duration-700 rotate-45 border border-gray-800 rounded-md bottom-7 bg-gradient-to-b from-yellow-900 via-blue-900 to-yellow-900 group-hover:rotate-180"
      ></button>
      <button
        class="absolute border-2 bottom-7 rounded-md border-gray-800 bg-gradient-to-tl from-gray-900 via-purple-900 to-blue-900 w-20 h-20 rotate-[0deg] group-hover:rotate-[135deg] duration-700 transition"
      ></button>
    </NuxtLink>
    
    
  </div>
</template>
