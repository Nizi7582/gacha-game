<script setup>
import { useUserStore } from '~/store/user';

const userStore = useUserStore()
const supabase = useSupabaseClient()

async function logout() {
  try {
    userStore.userData.isLoggedIn = false
    userStore.userData.email = ''
    const { error } = await supabase.auth.signOut()
	await navigateTo('/login')
    if (error) throw error;
  } catch (error) {
    console.log(error.message)
  }
}
</script>

<template>
    <div>
        <!-- <TheHeader /> -->
        <div class="page-wrap">
			<!-- <PageTransition /> -->

            <div class="absolute z-50 page-wrap top-6 right-6">

                <NuxtLink to="/" class="text-3xl text-white lg:text-4xl">
                    NekoWorldo
                </NuxtLink>
            </div>
			<div class="absolute z-50 page-wrap bottom-6 right-6">
				<button @click="logout()" class="text-3xl text-red-700 lg:text-4xl">
					Disconnect
				</button>
			</div>
            <slot />
        </div>
    </div>
</template>



<style lang='scss' scoped>

._container {
	width: 100%;
	padding-left: 32px;
	padding-right: 32px;
}


</style>