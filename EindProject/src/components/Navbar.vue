<template>
  <section class="navbar">
    <nav>
      <router-link :to="{ name: 'home' }">
        <img src="@/assets/banner.png" alt="Logo Lars">
      </router-link>
      <section class="links">
        <section v-if="user">
          <router-link class="btn" :to="{ name: 'blog' }">Blog Page</router-link>

          <router-link :to="{ name: 'createPlaylist'}">Create New Blog Post</router-link>

          <!-- <router-link :to="{ name: 'userPlaylists'}">My Playlists</router-link> -->
          <span>Hi there, {{ user.displayName }}!</span>

          <button @click="handleClick">Logout</button>
        </section>
        <section v-else>
          <router-link class="btn" :to="{ name: 'home' }">Blog Page</router-link>
          <router-link class="btn" :to="{ name: 'login' }">Login</router-link>
          <!-- <router-link class="btn" :to="{ name: 'signup' }">Signup</router-link> -->
        </section>
      </section>
    </nav>
  </section>
</template>

<script>
import { useRouter } from 'vue-router';
import useLogout from '/composables/useLogout';
import getUser from '/composables/getUser';
export default {
  setup() {
    const { user } = getUser()
    const router = useRouter()
    const { logout } = useLogout()

    const handleClick = async () => {
      await logout()
      console.log('user logged out')
      router.push({ name: 'home'})
    }
    

    return { handleClick, user }
  }
}
</script>

<style scoped>
  .navbar {
    padding: 16px 10px;
    margin-bottom: 60px;
    background-image: linear-gradient(to right, #161616, #3c3c3c);
  }

  nav {
    display: flex;
    align-items: left;
    max-width: 1200px;
    margin: 0 auto;
  }

  img {
    width: auto;
    height: 100px;
  }

  nav h1 {
    margin-left: 20px;
  }

  nav .links {
    margin-left: auto;
    margin-top: auto;
    margin-bottom: auto;
  }

  nav .links a, button {
    margin-left: 16px;
    font-size: 16px;
    color: #F2921D;
  }

  button {
    background-color: #DC3535;
  }

  span {
    font-size: 16px;
    display: inline-block;
    margin-left: 16px;
    padding-left: 16px;
    border-left: 1px solid #eee;
    color: #F2921D;
  }
</style>