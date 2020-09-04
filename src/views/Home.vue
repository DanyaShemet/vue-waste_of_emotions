<template>
  <div class="home">

    <Login />
    <Register />
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login'
import Register from '@/components/Register'
export default {
  name: 'Home',
  components: {
    Login, Register
  }
}
</script>
