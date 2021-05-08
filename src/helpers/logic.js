let rangeSlider
let rangeBtn
let rangeBtnWidth
let rangeBtnWidthPercent
let rangeBtnHalf

export const setSizes = (el) => {
  rangeSlider = el
  rangeBtn = rangeSlider.querySelector('[data-range="btn"]')
  rangeBtnWidth = rangeBtn.offsetWidth
  rangeBtnWidthPercent = rangeBtnWidth / rangeSlider.offsetWidth * 100
  rangeBtnHalf = rangeBtnWidthPercent / 2
}

export const handlerClickRangeSlider = (ev) => {
  if (ev.target !== ev.currentTarget) return
  if (rangeSlider.offsetWidth - ev.offsetX < 10) {
    rangeBtn.style.left = 100 - rangeBtnWidthPercent + '%'
    return 100
  }
  if (rangeSlider.offsetWidth - ev.offsetX > 290) {
    rangeBtn.style.left = '0%'
    return 0
  }
  rangeBtn.style.left = (ev.offsetX / 300 * 100) - rangeBtnHalf + '%'
  return ev.offsetX / 300 * 100
}
