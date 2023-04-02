<template>
  <div>
    <div v-for="playlist in playlists" :key="playlist.id">
        <div class="single">
          <span v-if="playlist.isComplete" class="dot" style="background-color: green;"></span>
          <span v-else class="dot" style="background-color: red;"></span>
          <div class="thumbnail">
            <img :src="playlist.coverUrl">
          </div>
          <router-link :to="{ name: 'playlistDetails', params: { id: playlist.id }}">
          <div class="info">
            <h3>{{ playlist.title }}</h3>
            <p>~  {{ playlist.username }}</p>
          </div>
        </router-link>
        <span @click= "handleUpdate(playlist.id)" class="material-icons tick">done</span>
        </div>
    </div>
  </div>
</template>

<script>
import useDocument from '/composables/useDocument';
export default {

  props: ['playlists'],
  setup(props){
    const handleUpdate = async (id) => {
      const plays = props.playlists
      const updatePlay = plays.findIndex((playlist) => playlist.id === id)
      console.log(plays);
      const newValue = !plays[updatePlay].isComplete

      const { updateDoc } = useDocument('playlists', id)

     await updateDoc ({ isComplete: newValue })
    }
    return { handleUpdate }
  }
}
</script>

<style scoped>

  .material-icons {
    font-size: 3em;
    color: #bbb;
    cursor: pointer;
    padding-left: auto;
  }

  .material-icons:hover {
    color: #777;
  }
  .single {
    display: flex;
    align-items: center;
    padding: 20px;
    border-radius: 10px;
    background: #292929;
    margin: 16px 0;
    transition: all ease 0.2s;
  }
  .single:hover {
    box-shadow: 1px 2px 3px rgba(50,50,50,0.05);
    transform: scale(1.02);
    transition: all ease 0.2s;
  }
  .thumbnail {
    max-width: 100px;
    max-height: 100px;
    overflow: hidden;
    border-radius: 10px;
  }

  .thumbnail img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
  }

  img {
    max-width: 150%;
    max-height: 150%;
    display: block;
  }
  .info {
    margin: 0 30px;
    color:darkgoldenrod;
  }
</style>