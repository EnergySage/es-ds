/* eslint-disable no-promise-executor-return */
// Utils for testing, credit https://github.com/bootstrap-vue/bootstrap-vue/blob/dev/tests/utils.js

export const waitRAF = () => new Promise((resolve) => requestAnimationFrame(resolve));
export const waitNT = (ctx) => new Promise((resolve) => ctx.$nextTick(resolve));
