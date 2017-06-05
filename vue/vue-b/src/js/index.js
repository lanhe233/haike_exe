import Vue from 'vue';
import Dialogue from '../components/dialogue/dialogue.vue';
import store from '../store';
import vueResource from 'vue-resource';

Vue.use(vueResource);

var data = {
	"status":1,
	"result":{
		"totalMoney":59,
		"list":[
			{
				"productId":"600100002115",
				"productName":"黄鹤楼香烟",
				"productPrice":19,
				"productQuentity":1,
				"productImage":"images/1-1.jpg",
				"parts":[
					{
						"partsId":"10001",
						"partsName":"打火机"
					},
					{
						"partsId":"20001",
						"partsName":"吸管"
					}
				]
			},
			{
				"productId":"600100002120",
				"productName":"加多宝",
				"productPrice":8,
				"productQuentity":5,
				"productImage":"images/2-2.jpg",
				"parts":[
					{
						"partsId":"20001",
						"partsName":"吸管"
					}
				]
			}
		]
	},
	"message":""
};


const app = new Vue({
	el: "#app",
	data:{
		totalMoney:0,
		productList:[],
		checkAllFlag:false
	},
	filters:{
		formatMoney: function(value){
			//value为调用过滤器的参数
			return "￥"+value.toFixed(2);
		}
	},
	mounted: function(){
		//保证vm实例已经加载入文档
		this.$nextTick(function(){
			//查询输出列表信息
			this.cartView();
		})
	},
	methods:{
		cartView: function(){
			// this.$http.get('./data/data.json',{id:123}).then(function(res){
				// this.productList = res.body.result.list;
			// })
			//this.$http.get('',{id:123}).then(res=>{函数体})
			//上面为es6写法 好处是函数体作用域this指向外层this
			this.productList = data.result.list;
		},
		changeMoney:function(product,way) {
			product.productQuentity+=way;
			if (product.productQuentity<1) {product.productQuentity=1}
			this.calTotalPrice();
		},
		changeChecked:function(item){
			if (typeof item.isChecked=="undefined") {
				this.$set(item,"isChecked",false);
			}
			item.isChecked = !item.isChecked;
			if (!item.isChecked) {
				this.checkAllFlag = false;
			}

			var state = true;
			this.productList.forEach(function(value,index){
				if (!value.isChecked) {
					state = false;
				}
			})
			if (state) {
				this.checkAllFlag = true;
			}
			this.calTotalPrice();
		},
		checkAll:function(status){
			if (typeof status!= "boolean") {
				var status = !this.checkAllFlag;
			}
			this.checkAllFlag = status;
			this.productList.forEach(function(value,index){
				if (typeof value.isChecked=="undefined") {
					this.$set(value,"isChecked",false);
				}
				value.isChecked = status;
			},this);
			this.calTotalPrice();
		},
		calTotalPrice:function() {
			this.totalMoney = 0;
			this.productList.forEach(function(value,index){
				if (value.isChecked) {
					this.totalMoney += value.productPrice*value.productQuentity;
				}
			},this);
		},
		delProduct:function(item) {
			//根据元素内容获取该元素在数组中的下标
			var index = this.productList.indexOf(item);
			//从数组第index个元素开始删除。共删除一个元素
			this.productList.splice(index,1);

			this.calTotalPrice();
		}
	}
});
