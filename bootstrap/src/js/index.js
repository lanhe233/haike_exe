import '../css/bootstrap.css'
import '../css/index.css'
import '../js/bootstrap.js'

$(function(){
	$('table').append(`<thead><tr><th>姓名</th><th>性别</th><th>年龄</th><th>地址</th></tr></thead>
		<tbody> <tr> <td>张珊</td> <td>女</td> <td>18</td> <td>高新区</td> </tr> <tr> <td>张珊</td> <td>女</td> <td>18</td> <td>高新区</td> </tr> <tr> <td>张珊</td> <td>女</td> <td>18</td> <td>高新区</td> </tr> <tr> <td>张珊</td> <td>女</td> <td>18</td> <td>高新区</td> </tr> </tbody>`)
	let table_tr_type = ['danger','warning','info','success','active']
	table_tr_type.forEach(function(val,i,arr){
		$('table').eq(4).find('tbody').append(`<tr class="${val}"> <td>${val}</td> <td>女</td> <td>18</td> <td>高新区</td> </tr> <tr>`)
	})

	let test = ( () => {
		let count = 0;

		return {
			increCount () {
				return ++count
			},
			getcount () {
				return count
			}
		}
	})()

	console.log(test.increCount())
	console.log(test.increCount())
	console.log(test.increCount())
	console.log(test.getcount())
	console.log(test.increCount())
	console.log(test.getcount())
})