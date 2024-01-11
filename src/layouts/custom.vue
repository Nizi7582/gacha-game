<template>
  <div>
    <!-- <TheHeader /> -->
    <div class="page-wrap">
      <!-- <PageTransition /> -->
      <div class="absolute z-50 page-wrap top-4 right-4">
        <NuxtLink to="/">
          <img src="~/assets/img/gachat_logo.png" class="w-32" />
        </NuxtLink>
      </div>
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
._container {
  width: 100%;
  padding-left: 32px;
  padding-right: 32px;
}
</style>
