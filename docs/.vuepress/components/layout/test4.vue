<template>
  <div>
    <s-row :gutter="20">
      <s-col :span="6"><div class="grid-content bg-purple"></div></s-col>
      <s-col :span="6" :offset="6"><div class="grid-content bg-purple"></div></s-col>
    </s-row>
    <s-row :gutter="20">
      <s-col :span="6" :offset="6"><div class="grid-content bg-purple"></div></s-col>
      <s-col :span="6" :offset="6"><div class="grid-content bg-purple"></div></s-col>
    </s-row>
    <s-row :gutter="20">
      <s-col :span="12" :offset="6"><div class="grid-content bg-purple"></div></s-col>
    </s-row>
  </div>
</template>


<style scoped lang="scss">
.s-row{
  margin-bottom: 20px;
  &:last-child{
    margin-bottom: 0;
  }
}
.grid-content{
  border-radius: 4px;
  min-height: 36px;
}
.bg-purple {
  background: #d3dce6;
}
</style>