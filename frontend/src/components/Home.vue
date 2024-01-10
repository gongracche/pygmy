<template>
    <h2>Home</h2>
    <div>
      <ul class="nav">
        <li v-for="(item, index) in items" :key="index" class="nav-item">
          <router-link v-bind:to="item.path">{{ item.title }}</router-link>
        </li>
      </ul>
    </div>
</template>
<script>
export default {
  data () {
    return {
      items: [
        { title: 'users', path: '/users'}
      ]
    }
  }
}
</script>