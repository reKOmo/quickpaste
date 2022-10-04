<template>
  <div>
    <div v-if="!postingPaste" class="container">
      <PasteEditor @submit="createPaste" :paste="clientSidePaste" :loggedIn="loggedIn"/>
    </div>
    <div v-else>
      <div v-if="!createdPaste" class="flex flex-row justify-center items-center mt-12">
        <object width="300" height="300" type="image/svg+xml" :data="svg1">
          <img ref="img0" src="@/assets/animated/logo-paste-loading.svg" />
        </object>
        <div class="bg-gradient-to-tr from-green to-orange rounded p-6 h-min hidden md:block">
          <h2 class="text-2xl font-bold">Creating paste...</h2>
        </div>
      </div>
      <div v-else>
        <div v-if="requestCode == 200" class="flex flex-row justify-center items-center mt-12">
          <object class="w-100px sm:w-150px md:w-300px" type="image/svg+xml" :data="svg2">
            <img ref="img1" src="@/assets/animated/logo-paste-created.svg" />
          </object>
          <div class="doneText bg-gradient-to-tr from-green to-orange rounded p-6 mt-6 h-min">    
            <h2 class="text-2xl font-bold">Paste created!</h2>
            <h3> 
              Check it at: <a class="font-bold" :href="`/${createdPaste.pasteId}`">{{createdPaste.pasteId}} <font-awesome-icon :icon="['fas', 'fa-arrow-up-right-from-square']" /></a>
            </h3>
          </div>
        </div>
        <div v-if="requestCode == 429" class="flex flex-row justify-center items-center mt-12">
          <div class="doneText bg-gradient-to-tr from-green to-orange rounded p-6 h-min">    
            <h2 class="text-2xl font-bold">Daily paste limit reached</h2>
            <h3> 
              You have surpassed your daily paste limit. For more information see <NuxtLink href="/api-docs#limits">here</NuxtLink>
            </h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useUserStore } from '@/store/user';
  import { useNotificationStore, NotificationTypes } from '../store/notification';
  import svg1 from "@/assets/animated/logo-paste-loading.svg";
  import svg2 from "@/assets/animated/logo-paste-created.svg";

  const userStore = useUserStore();
  const notificationStore = useNotificationStore();
  const loggedIn = userStore.user() != undefined;
  let postingPaste = ref(false);
  let createdPaste =  ref(undefined);
  let requestCode = ref(200);
  let clientSidePaste = ref(undefined);



  const createPaste = async (paste) => {
    clientSidePaste.value = paste;
    postingPaste.value = true;

    const res = await fetch(`/api/paste`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(paste)
    });
    
    const data = await res.json();

    requestCode.value = res.status;
    createdPaste.value = data.result;
    if (!data.ok) {
      if (requestCode.value == 429) return;
      postingPaste.value = false;
      if (data.result.includes("title")) {
        //paste title
        notificationStore.addNotification({
          title: "Paste title is missing",
          type: NotificationTypes.NOTIFICATION,
          level: 1
        });
      } else if (data.result.includes("name")) {
        //fragement title
        notificationStore.addNotification({
          title: "One or more fragments are missing a title",
          type: NotificationTypes.NOTIFICATION,
          level: 1
        });
      } else if (data.result.includes("content")) {
        //fragment content is empty
        notificationStore.addNotification({
          title: "Some fragments are missing a title",
          description: "Please deleate them, or add missing content",
          type: NotificationTypes.NOTIFICATION,
          level: 1
        });
      } else {
        // other
        notificationStore.addNotification({
          title: "Error accured when creating the paste",
          description: "Please try again.",
          type: NotificationTypes.NOTIFICATION,
          level: 1
        });
      }
    }
  }

  onMounted(() => {
    document.title = "Quickpaste";
  })
</script>

<style scoped>
  .editor {
    max-width: 54rem;
  }

  .hide {
    display: none;
  }

  .doneText {
    animation: appear 1.7s ease-in;
  }

  @keyframes appear {
  from {
    opacity: 0%;
  }

  to {
    opacity: 100%;
  }
}
</style>