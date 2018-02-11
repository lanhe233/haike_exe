<template>
  <div>
    {{time1}}<br>
    <DatePicker type="date"v-model="time1" placeholder="选择日期" style="width: 200px"></DatePicker>
    <br><br><br><br><br><br>
    {{time2}}<br>
    <DatePicker type="datetime"v-model="time2" placeholder="选择日期和时间" style="width: 200px"></DatePicker>
    <br><br><br><br><br><br>
    {{time3}}<br>
    <DatePicker v-model="time3"
      type="datetimerange" 
      placeholder="选择日期范围" 
      style="width: 300px"></DatePicker>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        time1: '',
        time2: '',
        time3: []
      }
    }
  }
</script>