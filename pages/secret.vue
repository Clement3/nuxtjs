<template>
  <div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  asyncData ({ params }) {
    return axios.get('http://localhost:8000/api/user')
    .then((res) => {
      console.log(res)
    })
  }
}
</script>