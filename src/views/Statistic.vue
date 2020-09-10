<template>
  <div class="categories">
    <h4>Статистика</h4>
    {{ records }}
  </div>
</template>

<script>
export default {
  name: 'statistic',
  data: () => ({
    records: []
  }),
  async mounted() {
    this.records = await this.$store.dispatch('fetchRecord')
  }
}

</script>

