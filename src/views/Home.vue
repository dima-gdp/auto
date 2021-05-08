<template>
  <div class="home">
    <div class="row">
      <div>{{price}}</div>
      <range-slider v-model="price" />
    </div>
    <div class="row active">
      <div>{{discount}}</div>
      <range-slider v-model="discount" />
    </div>
  </div>
</template>

<script>
import RangeSlider from '../components/RangeSlider'

export default {
  name: 'Home',
  components: { RangeSlider },
  data () {
    return {
      width: null,
      price: 10,
      discount: 20
    }
  }
}
</script>

<style lang="scss">
  .home {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px 20px;
  }
  .row {
    margin-bottom: 70px;
    &.active {
      .range {
        width: 400px;
        margin-left: 100px;
      }
    }
  }
</style>
