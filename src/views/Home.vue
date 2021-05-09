<template>
  <div class="home container">
    <div class="home__row">
      <range-slider v-model="price" />
    </div>
    <div class="home__row">
      <range-slider v-model="discount" />
    </div>
  </div>
</template>

<script>
import RangeSlider from '../components/RangeSlider'

export default {
  name: 'Home',
  components: { RangeSlider },
  data() {
    return {
      price: 10,
      discount: 20
    }
  }
}
</script>
