<template>
  <div class="home">
    <Login />
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/ButtonsLog'
export default {
  name: 'Home',
  components: {
    Login
  }
}
</script>
