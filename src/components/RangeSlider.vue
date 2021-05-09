<template>
  <div class="range">
    <div class="range__current">{{ dataValue }}%</div>
    <div class="range__input" data-range="range__input" ref="rangeInput">
      <span class="range__cursor" data-range="cursor" ref="cursor"></span>
    </div>
    <ul class="range__values">
      <li>
        <button class="range__btn" @click="setDataValue(25)">25%</button>
      </li>
      <li>
        <button class="range__btn" @click="setDataValue(50)">50%</button>
      </li>
      <li>
        <button class="range__btn" @click="setDataValue(75)">75%</button>
      </li>
      <li>
        <button class="range__btn" @click="setDataValue(100)">100%</button>
      </li>
    </ul>
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
  data() {
    return {
      hammer: null
    }
  },
  computed: {
    dataValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    setDataValue(value) {
      const $cursor = this.$refs.cursor
      const rangeWidthWithoutCursor =
        this.$refs.rangeInput.offsetWidth - $cursor.offsetWidth
      const styleLeft = (rangeWidthWithoutCursor * value) / 100
      const percentStyleLeft =
        (styleLeft / this.$refs.rangeInput.offsetWidth) * 100
      const cursorStyleLeft = percentStyleLeft.toFixed(1)
      this.dataValue = value
      $cursor.style.left = cursorStyleLeft + '%'
    }
  },
  mounted() {
    const $rangeInput = this.$refs.rangeInput
    const $cursor = this.$refs.cursor
    let rangeWidth
    let leftBorderWithBtnHalf
    let btnWidth
    let btnWidthPercent
    let btnWidthHalf
    let rangeWithoutBtn
    let leftBorder
    let rightBorder
    $cursor.style.left = this.dataValue + '%'
    this.hammer = new Hammer($cursor)
    const setBaseSizes = () => {
      rangeWidth = $rangeInput.offsetWidth
      btnWidth = $cursor.offsetWidth
      btnWidthHalf = btnWidth / 2
      const percentBtn = (btnWidth / rangeWidth) * 100
      btnWidthPercent = percentBtn.toFixed(1)
    }
    // click
    $rangeInput.addEventListener('click', ev => {
      setBaseSizes()
      // rangeWidth = $range.offsetWidth
      // btnWidth = cursor.offsetWidth
      // btnWidthHalf = btnWidth / 2
      // const percentBtn = btnWidth / rangeWidth * 100
      // btnWidthPercent = percentBtn.toFixed(1)
      if (ev.target !== ev.currentTarget) return
      if (rangeWidth - ev.offsetX < btnWidthHalf) {
        $cursor.style.left = 100 - btnWidthPercent + '%'
        this.dataValue = 100
        return
      }
      if (rangeWidth - ev.offsetX > rangeWidth - btnWidthHalf) {
        $cursor.style.left = '0%'
        this.dataValue = 0
        return 0
      }
      const styleLeft = ((ev.offsetX - btnWidthHalf) / rangeWidth) * 100
      const value = (ev.offsetX / rangeWidth) * 100
      $cursor.style.left = +styleLeft.toFixed(1) + '%'
      this.dataValue = +value.toFixed(1)
    })
    this.hammer.on('panstart', () => {
      setBaseSizes()
      // rangeWidth = $range.offsetWidth
      // btnWidth = cursor.offsetWidth
      // btnWidthHalf = btnWidth / 2
      // const percentBtn = btnWidth / rangeWidth * 100
      // btnWidthPercent = percentBtn.toFixed(1)
      leftBorder = $rangeInput.getBoundingClientRect().left
      rightBorder = $rangeInput.getBoundingClientRect().right
      leftBorderWithBtnHalf = leftBorder + btnWidthHalf
      rangeWithoutBtn = rangeWidth - btnWidth
    })
    this.hammer.on('pan', ev => {
      if (ev.center.x >= rightBorder - btnWidthHalf) {
        $cursor.style.left = 100 - btnWidthPercent + '%'
        this.dataValue = 100
        return
      }
      if (ev.center.x <= leftBorder + btnWidthHalf) {
        $cursor.style.left = 0 + '%'
        this.dataValue = 0
        return
      }
      const s = ev.center.x - leftBorderWithBtnHalf
      const styleLeft = (s / rangeWidth) * 100
      const value = (s / rangeWithoutBtn) * 100
      this.dataValue = +value.toFixed(1)
      ev.target.style.left = styleLeft.toFixed(1) + '%'
    })
  },
  beforeDestroy() {
    this.hammer.destroy()
  }
}
</script>
