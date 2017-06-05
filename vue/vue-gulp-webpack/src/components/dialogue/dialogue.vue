<template>
  <div>
    <div class="dialogue-wrapper">
      <div class="dialogue-out">
        <div class="dialogue-out-group" ref="scroll">
          <message v-for="msg in msgs" :msg="msg"></message>
        </div>
      </div>
      <div class="dialogue-input">
        <textarea class="dialogue-textarea" ref="text" v-model="myMessage"></textarea>
        <div class="dialogue-btn-group">
          <button class="btn" @click="sendMessage">发送</button>
        </div>
      </div>
    </div>
    <div>数据列表: {{msgs}}</div>
  </div>
</template>

<script>
	import Message from './message.vue';

  const arr = [
    { "userid": 1, "msg": "你好!", "avatarUrl": "./images/pangtouyu.jpg", "time": "2017-02-08 13:30" },
    { "userid": 1, "msg": "有什么需要帮助的？", "avatarUrl": "./images/pangtouyu.jpg", "time": "" },
    { "userid": 1, "msg": "呵呵", "avatarUrl": "./images/pangtouyu.jpg", "time": "2017-02-08 13:40" },
    { "userid": 1, "msg": "再见!", "avatarUrl": "./images/pangtouyu.jpg", "time": "" }
  ]

	export default {
		data() {
			return {
				msgs: [],
        myMessage: ''
			}
		},
		methods: {
			showMessage() {
				let count = 0;
				const vm = this;
				const timer = setInterval(function() {
					if (count > 2) {
						clearInterval(timer);
					}
					vm.msgs.push(arr[count]);
          vm.$nextTick(function () {
            vm.scroll();
          });
					count++;
				}, 3000);
			},
			sendMessage() {
				const vm = this;
				if (vm.myMessage.replace(/\s+/g, '') === '') {
					vm.myMessage = '';
					return false;
				}
				const obj = {
					userid: 0,
					msg: vm.myMessage,
					avatarUrl: './images/avatar2.jpg',
					time: '2017-02-08 13:20'
				}
				vm.msgs.push(obj);
				vm.$nextTick(function () {
					vm.scroll();
				});
				vm.myMessage = '';
        vm.showMessage();
			},
			scroll() {
				const div = this.$refs.scroll;
        console.log(this.msgs);
				div.scrollTop = div.scrollHeight - div.offsetHeight;
			}
		},
		components: {
			Message
		}
	}
</script>
