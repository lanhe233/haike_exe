<template>
	<div class="message-wrapper">
		<div class="message-time">{{msg.time}}</div>
		<div v-if="userState" class="message-mine">
			<div class="message-avatar">
				<img :src="msg.avatarUrl">
			</div>
			<div class="message-content">
				<p>{{msg.msg}}</p>
			</div>
		</div>
		<div v-if="!userState" class="message-other">
			<div class="message-avatar">
				<img :src="msg.avatarUrl">
			</div>
			<div class="message-content">
				<p>{{msg.msg}}</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
      msg: {
        type: Object,
        default() {
          return {
            userid: 0,
            msg: 'hehe',
            avatarUrl: './images/avatar2.jpg',
            time: ''
          }
        }
      }
    },
		computed: {
			userState() {
				if (this.msg.userid === 0) {
					return true
				}else {
					return false
				}
			}
		}
	}
</script>
