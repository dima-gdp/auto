<template>
  <div class="wrapper">
    <div class="range" data-range="range" @click="test" ref="range">
      <span class="range__btn" data-range="btn" ref="btn"></span>
    </div>
  </div>
</template>

<script>
import Hammer from 'hammerjs/hammer.min'

export default {
  name: 'RangeSlider',
  props: {
    value: {
      type: Number
    }
  },
  data () {
    return {
      width: null,
      btnWidth: null,
      btnWidthHalf: null,
      btnWidthPercent: null,
      btnWidthPercentHalf: null,
      coords: null
    }
  },
  computed: {
    dataValue: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    test (ev) {
      if (ev.target !== ev.currentTarget) return
      if (this.width - ev.offsetX < this.btnWidthHalf) {
        this.$refs.btn.style.left = 100 - this.btnWidthPercent + '%'
        return 100
      }
      if (this.width - ev.offsetX > this.width - this.btnWidthHalf) {
        this.$refs.btn.style.left = '0%'
        return 0
      }
      this.$refs.btn.style.left = (ev.offsetX / this.width * 100) - this.btnWidthPercentHalf + '%'
      this.dataValue = ev.offsetX / this.width * 100
      this.coords = ev.offsetX
    }
  },
  mounted () {
    // this.width = this.$refs.range.offsetWidth
    // const $btn = this.$refs.range.querySelector('[data-range="btn"]')
    // this.btnWidth = $btn.offsetWidth
    // this.btnWidthHalf = this.btnWidth / 2
    // const percentBtn = this.btnWidth / this.width * 100
    // this.btnWidthPercent = percentBtn.toFixed(1)
    // this.btnWidthPercentHalf = this.btnWidthPercent / 2
    const $range = this.$refs.range
    const $btn = this.$refs.btn
    let rangeWidth
    let btnWidth
    let btnWidthPercent
    let btnWidthPercentHalf
    let leftBorder
    // let rightBorder
    $btn.style.left = this.dataValue + '%'
    const hammer = new Hammer($btn)
    hammer.on('panstart', () => {
      rangeWidth = $range.offsetWidth
      btnWidth = $btn.offsetWidth
      const percentBtn = btnWidth / rangeWidth * 100
      btnWidthPercent = percentBtn.toFixed(1)
      const percentBtnHalf = btnWidthPercent / 2
      btnWidthPercentHalf = percentBtnHalf.toFixed(1)
      leftBorder = $range.getBoundingClientRect().left
      // rightBorder = $range.getBoundingClientRect().right
      // this.width = this.$refs.range.offsetWidth
      // const $btn = this.$refs.btn
      // this.btnWidth = $btn.offsetWidth
      // const percentBtn = this.btnWidth / this.width * 100
      // this.btnWidthPercent = percentBtn.toFixed(1)
      // const percentBtnHalf = this.btnWidthPercent / 2
      // this.btnWidthPercentHalf = percentBtnHalf.toFixed(1)
      // leftBorder = this.$refs.range.getBoundingClientRect().left
    })
    hammer.on('pan', (ev) => {
      const percent = ((ev.center.x - leftBorder) / rangeWidth * 100) - btnWidthPercentHalf
      this.dataValue = +percent.toFixed(1)
      ev.target.style.left = percent.toFixed(1) + '%'
      // this.dataValue = ((ev.center.x - leftBorder) / this.width * 100) - this.btnWidthPercentHalf
      // ev.target.style.left = ((ev.center.x - leftBorder) / this.width * 100) - this.btnWidthPercentHalf + '%'
    })
  }
}
</script>

<style lang="scss">
.range {
  width: 300px;
  height: 26px;
  background-color: green;
  position: relative;
  border-radius: 15px;
  cursor: pointer;

  &__btn {
    position: absolute;
    top: 50%;
    left: 40px;
    transform: translateY(-50%);
    height: 40px;
    width: 40px;
    background-color: blueviolet;
    border-radius: 100%;
    cursor: pointer;
  }
}
</style>
