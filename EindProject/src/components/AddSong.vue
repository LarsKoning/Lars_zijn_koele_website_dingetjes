<template>
  <div class="add-song">
    <button v-if="!showForm" @click="showForm = true">Add Info</button>
    <form v-if="showForm" @submit.prevent="handleSubmit">
      <h4>Add More Info About The Project</h4>
      <input type="text" placeholder="Coding Language" required v-model="title">
      <input type="text" placeholder="What was it used for?" required v-model="artist">
      <button>Add</button>
    </form>
  </div> 
</template>

<script>
import { ref } from 'vue';
import useDocuement from '/composables/useDocument'
import { timestamp } from '@/firebase/config';

export default {
  props: ['playlist'],
  setup(props) {
    const title = ref('')
    const artist = ref('')
    const isComplete = ref(false)
    const showForm = ref(false)
    const { updateDoc } = useDocuement('playlists', props.playlist.id)

    const handleSubmit = async () => {
      const newSong = {
        title: title.value,
        artist: artist.value,
        isComplete: isComplete.value,
        id: Math.floor(Math.random() * 1000000)
      }
      await updateDoc({
        songs: [...props.playlist.songs, newSong]
      })
      title.value = ''
      artist.value = ''
    }

    return { title, artist, isComplete, showForm, handleSubmit }
  }

}
</script>

<style scoped>
  .add-song {
    text-align: center;
    margin-top: 40px;
  }
  form {
    max-width: 100%;
    text-align: left;
  }
</style>