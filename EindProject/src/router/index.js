import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/auth/Login.vue'
import Signup from '../views/auth/Signup.vue'
import CreatePlaylist from '../views/playlists/CreatePlaylist.vue'
import PlaylistDetails from '@/views/playlists/PlaylistDetails.vue'
import UserPlaylists from '@/views/playlists/UserPlaylists.vue'
import CV from '../views/CV.vue'

import { projectAuth } from '@/firebase/config'


const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },
  {
    path: '/playlists/create',
    name: 'createPlaylist',
    component: CreatePlaylist,
  },
  {
    path: '/playlists/:id',
    name: 'playlistDetails',
    component: PlaylistDetails,
    props: true
  },
  {
    path: '/playlists/user',
    name: 'userPlaylists',
    component: UserPlaylists,
  },
  {
    path: '/blog',
    name: 'blog',
    component: CV,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
