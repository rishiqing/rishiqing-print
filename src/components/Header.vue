<template>
  <header class="header">
    <div class="title">{{ title }}</div>
    <div class="operate">
      <button class="print" @click="print">打印</button>
    </div>
  </header>
</template>
<script>
export default {
  props: ['title'],
  methods: {
    print() {
      window.print();
    },
  },
};
</script>
<style lang="scss" scoped>
  .header {
    height: 54px;
    background: #fff;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,.18);
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 2;
    padding-left: 267px;
    padding-right: 269px;
    .title {
      line-height: 22px;
      padding: 16px 0;
      text-align: center;
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #666;
      letter-spacing: 0;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .operate {
      padding: 11px 23px;
      height: 100%;
      font-size: 14px;
      color: #0082ff;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      line-height: 32px;
      button {
        background: #0096F6;
        box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.23);
        border-radius: 3px;
        border: none;
        color: #fff;
        padding: 7px 18px;
        cursor: pointer;
      }
    }
  }
</style>
