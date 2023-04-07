<template>
  <div class="error" v-if="error">{{ error }}</div>
  <div v-else-if="playlist" class="playlist-details">

    <!-- playlist information -->
    <div class="playlist-info">
      <div class="cover">
        <img :src="playlist.coverUrl">
      </div>
      <h2>{{ playlist.title }}</h2>
      <p class="username">~ {{ playlist.username }}</p>
      <button v-if="ownership" @click="handleDelete">Delete Blog</button>
    </div>

    <!-- song list -->
    <div class="song-list">

      <div v-for="song in playlist.songs" :key="song.id" class="single-song">
        <div class="details">
          <span v-if="song.isComplete" class="dot" style="background-color: green;"></span>
          <span v-else class="dot" style="background-color: red;"></span>

          <div>
            <h3>{{ song.title }}</h3>
            <p>{{ song.artist }}</p>
          </div>
        </div>
        <section class="icoontjes">
          <span @click= "toggleComplete(song.id)" class="material-icons tick">done</span>
          <span v-if="ownership" @click="handleClick(song.id)" class="material-icons">delete</span>
        </section>
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
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import AddSong from '../../components/AddSong.vue'


export default {
  props: ['id'],
  components: { AddSong },
  setup(props) {
    const isComplete = ref(false)
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

    const toggleComplete = async (id) => {
      
      const songs = playlist.value.songs
      const updateSong = songs.findIndex((song) => song.id === id)
      songs[updateSong].isComplete = !songs[updateSong].isComplete

      await updateDoc({ songs })
    }

    return { error, playlist, ownership, handleDelete, handleClick, toggleComplete }
  }
}
</script>

<style>
.dot {
  height: 25px;
  width: 25px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 20px;
}

.icoontjes {
  display: flex;
  flex-direction: row;
}

.material-icons {
  font-size: 3em;
  margin-left: 10px;
  color: #bbb;
  cursor: pointer;
  margin-left: auto;
}

.material-icons:hover {
  color: #777;
}
  .playlist-details {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 80px;
    color: #FCF8E8;
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
    padding-bottom: 50px;
    color: darkgoldenrod;
  }

  .playlist-info h2 {
    text-transform: capitalize;
    font-size: 28px;
    margin-top: 20px;
    color: #FCF8E8;
  }

  .playlist-info p {
    margin-bottom: 20px;
  }

  .username {
    margin-top: 10px;
    color: #FCF8E8;
  }

  .description {
    text-align: left;
    color: darkgoldenrod;
  }

  .single-song {
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px dashed var(--warning);
    margin-bottom: 20px;
  }
  .single-song.details{
    display: flex;
    justify-content: left;
  }

  .details {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .details h3{
    font-size: 22px;
    margin-bottom: 5px;
  }
</style>