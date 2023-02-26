<template>
  <div class="container">
    <Navbar />
    <ChatWindow />
    <NewChatForm />
  </div>
</template>

<script>
import NewChatForm from '@/components/NewChatForm.vue'
import ChatWindow from '@/components/ChatWindow.vue'
import getUser from '@/compasables/getUser';
import Navbar from '@/components/Navbar.vue';
import { watch } from 'vue';
import { useRouter } from 'vue-router';
import NewChatFormVue from '../components/NewChatForm.vue';
export default {
  components: { Navbar, NewChatForm, ChatWindow },
  setup() {
    const { user } = getUser()
    const router = useRouter()

    watch(user, () => {
      if (!user.value) {
        router.push({ name: 'welcome'})
      }
    })
  }
}
</script>

<style>

</style>