<template>
  <div>
    <div>
      <cl-checkbox v-model="c1">加载中</cl-checkbox>
      <div>c1: {{c1}}</div>
    </div>
    <div class="mt20">
      <cl-checkbox-group v-model="clist1">
        <cl-checkbox label="1"></cl-checkbox>
        <cl-checkbox label="2"></cl-checkbox>
        <cl-checkbox label="3"></cl-checkbox>
        <cl-checkbox label="4"></cl-checkbox>
        <cl-checkbox label="5"></cl-checkbox>
      </cl-checkbox-group>
      <div>clist：{{clist1}}</div>
    </div>
    <div class="mt20">
      <cl-checkbox v-model="c2" :disabled="true">加载中</cl-checkbox>
    </div>
    <div class="mt20">
      <cl-checkbox-group v-model="clist2" :disabled="true">
        <cl-checkbox label="1"></cl-checkbox>
        <cl-checkbox label="2"></cl-checkbox>
        <cl-checkbox label="3"></cl-checkbox>
        <cl-checkbox label="4"></cl-checkbox>
        <cl-checkbox label="5"></cl-checkbox>
      </cl-checkbox-group>
      <div>clist：{{clist2}}</div>
    </div>
    <div class="mt20">
      <cl-checkbox-group v-model="clist3">
        <cl-checkbox label="1" :disabled="true"></cl-checkbox>
        <cl-checkbox label="2"></cl-checkbox>
        <cl-checkbox label="3"></cl-checkbox>
        <cl-checkbox label="4"></cl-checkbox>
        <cl-checkbox label="5" :disabled="true"></cl-checkbox>
      </cl-checkbox-group>
      <div>clist：{{clist3}}</div>
    </div>
    <div class="mt20">
      <cl-checkbox-group v-model="clist4" :min="1" :max="3">
        <cl-checkbox label="1"></cl-checkbox>
        <cl-checkbox label="2"></cl-checkbox>
        <cl-checkbox label="3"></cl-checkbox>
        <cl-checkbox label="4"></cl-checkbox>
        <cl-checkbox label="5"></cl-checkbox>
      </cl-checkbox-group>
      <div>clist：{{clist4}}</div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      c1: true,
      c2: false,
      clist1: ['1', '2'],
      clist2: ['1', '2'],
      clist3: ['1', '2'],
      clist4: ['1', '2']
    }
  },
  methods: {
  }
}

</script>

<style lang="scss">
  @import '~@/assets/css/index'
</style>