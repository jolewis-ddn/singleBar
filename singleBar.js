/** @format */

const DEFAULT_MAX = 100 // Total of all values
const DEFAULT_WIDTH = 400 // Total width of the bar
const DEFAULT_HEIGHT = 20 // Height of the bar

// Default colors based on # of values supplied
const DEFAULT_COLORS_3 = ['#EF476F', '#FFD166', '#06D6A0']
const DEFAULT_COLORS_4 = ['#EF476F', '#FFD166', '#06D6A0', '#073B4C']
const DEFAULT_COLORS_5 = ['#EF476F', '#FFD166', '#06D6A0', '#118AB2', '#073B4C']

const DEFAULT_FONT_COLORS = ['white', 'black', 'black', 'white', 'white']

const DEFAULT_SHOW_VALUES = false

/**
 * Class to create SingleBar object
 * Requires: p5.js
 */
class SingleBar {
  /**
   * Constructor
   * @param {number} values - Values (comma-separated)
   * @param {number} width - Width of the canvas
   * @param {number} height - Height of the canvas
   * @param {number} barHeight - Height of the value bar
   *
   */
  constructor(
    values,
    showValues = DEFAULT_SHOW_VALUES,
    width = DEFAULT_WIDTH,
    height = DEFAULT_HEIGHT
  ) {
    this.buffer = 0 // Horizontal buffer
    this.vbuffer = 0 // Vertical buffer (above/below chart)

    this.setValues(values.map((x) => +x))

    this.canvasWidth = width
    this.canvasHeight = height
    this.showValues = showValues

    // Calculate the bounding box of the chart
    this.chartX = 0
    this.chartY = 0

    this.chartWidth = this.canvasWidth - this.chartX // No buffer
    this.chartHeight = this.canvasHeight // No buffer

    // points per pixel
    this.ppp = this.chartWidth / this.max
    noLoop()
  }

  /**
   * Set the array of values
   * Note: will be converted to numbers (or fail)
   *
   * @param {Array} v Array of numeric values
   * @memberof SingleBar
   */
  setValues(v) {
    this.binCount = v.length
    this.values = v.map((x) => +x)
    console.log(`this.values = `, this.values)
    this.max = this.values.reduce((p, c) => (p += c))
    this.ppp = this.chartWidth / this.max

    // Set up the bins and colors
    switch (this.binCount) {
      case 3:
        this.colors = DEFAULT_COLORS_3
        break
      case 4:
        this.colors = DEFAULT_COLORS_4
        break
      case 5:
        this.colors = DEFAULT_COLORS_5
        break
      default:
        this.colors = []
        break
    }
    this.fontColors = DEFAULT_FONT_COLORS
  }

  /**
   * Show the values?
   *
   * @param {boolean} s Display
   * @memberof SingleBar
   */
  setShowValues(s) {
    this.showValues = s
  }

  /**
   * Standard p5js display() function
   * Note: noloop() is set to prevent refresh
   *
   * @memberof SingleBar
   */
  display() {
    // Quantitiatve Bins
    noStroke()
    let shade = 0
    let prevW = 0

    textAlign(CENTER, CENTER)

    // Create the shaded backgrounds
    for (let i = 0; i < this.binCount; i++) {
      let thisW = this.ppp * this.values[i]

      fill(this.colors[i])
      rect(this.chartX + prevW, 0, thisW, this.chartHeight)

      // Print the value
      if (this.showValues) {
        fill(this.fontColors[i])
        if (this.values[i] > 0) {
          text(this.values[i], prevW + thisW / 2, this.canvasHeight / 2)
        }
      }
      // Catch the width for the next loop
      prevW += thisW
    }
  }

  /**
   * Get the canvas width
   * @returns {number} Canvas width
   */
  getWidth() {
    return this.canvasWidth
  }

  /**
   * Get the canvas height
   * @returns {number} Canvas height
   */
  getHeight() {
    return this.canvasHeight
  }
}

/**
 * Print debug message
 * @param {string} msg Debug message
 */
function dbg(msg) {
  if (debug) {
    console.log(msg)
  }
}
