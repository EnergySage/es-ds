'use strict'

const year = new Date().getFullYear()

function getBanner() {
    return `/*!
  * EnergySage Flavor of Bootstrap
  * Copyright 2022-${year} (https://github.com/EnergySage/es-bs-base/blob/main/LICENSE)
  *
  * Bootstrap
  * Copyright 2011-2021
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/v4.6.1/LICENSE)
  */`
}

module.exports = getBanner
