<template>
  <div class="error" v-if="error">{{ error }}</div>
  <div v-else-if="playlist" class="playlist-details">

    <!-- playlist information -->
    <div class="playlist-info">
      <div class="cover">
        <img :src="playlist.coverUrl">
      </div>
      <h2>{{ playlist.title }}</h2>
      <p class="username">Created by {{ playlist.username }}</p>
      <p class="description">{{ playlist.description }}</p>
      <button @click="handleDelete">Delete Blog</button>
    </div>

    <!-- song list -->
    <div class="song-list">
      <div v-if="!playlist.songs.length">No songs have been added yet</div>
      <div v-for="song in playlist.songs" :key="song.id" class="single-song">
        <div class="details">
          <h3>{{ song.title }}</h3>
          <p>{{ song.artist }}</p>
        </div>
        <button v-if="ownership" @click="handleClick(song.id)">Delete</button>
      </div>
      <AddSong v-if="ownership" :playlist="playlist"/>
    </div>
    
  </div>
</template>

<script>
import useStorage from '/composables/useStorage'
import getDocument from '/composables/getDocument'
import useDocument from '/composables/useDocument'
import getUser from '/composables/getUser'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import AddSong from '../../components/AddSong.vue'


export default {
  props: ['id'],
  components: { AddSong },
  setup(props) {
    const { error, document: playlist } = getDocument('playlists', props.id)
    const { user } = getUser()
    const { deleteDoc, updateDoc } = useDocument('playlists', props.id)
    const { deleteImage } = useStorage()
    const router = useRouter()


    const ownership = computed(() => {
      return playlist.value 
        && user.value 
        && user.value.uid == playlist.value.userID
    })

    const handleDelete = async () => {
      await deleteDoc()
      await deleteImage(playlist.value.filePath)
      router.push({ name: 'home'})
    }

    const handleClick = async (id) => {
      const songs = playlist.value.songs.filter((song) => song.id != id)
      await updateDoc({ songs })
    }

    return { error, playlist, ownership, handleDelete, handleClick }
  }
}
</script>

<style>
  .playlist-details {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 80px;
  }

  .cover {
    overflow: hidden;
    border-radius: 20px;
    position: relative;
    padding: 160px;
  }

  .cover img {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-width: 100%;
    min-height: 100%;
    max-width: 200%;
    max-height: 200%;
  }

  .playlist-info {
    text-align: center;
    color: darkgoldenrod;
  }

  .playlist-info h2 {
    text-transform: capitalize;
    font-size: 28px;
    margin-top: 20px;
    color: darkgoldenrod;
  }

  .playlist-info p {
    margin-bottom: 20px;
  }

  .username {
    margin-top: 10px;
    color: darkgoldenrod;
  }

  .description {
    text-align: left;
  }

  .single-song {
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px dashed var(--warning);
    margin-bottom: 20px;
  }
</style>