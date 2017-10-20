<template>
  <div>
    <div>以分页条的居中为例</div>
    <h3>一、margin和width实现水平居中</h3>
    <pre class="code">
      .pagination1 {
        width: 293px;
        margin: 0 auto;
        border: 1px dashed #ccc;
        overflow: hidden;

        li {
          display: inline;
          float: left;
          margin: 0 2px;
        }
      }</pre>
    <div class="pagination pagination1">
      <ul>
        <li><a href="javascript:;">Prev</a></li>
        <li><a href="javascript:;">1</a></li>
        <li><a href="javascript:;">2</a></li>
        <li><a href="javascript:;">3</a></li>
        <li><a href="javascript:;">4</a></li>
        <li><a href="javascript:;">5</a></li>
        <li><a href="javascript:;">Next</a></li>
      </ul>
    </div>
    <pre class="comment">
      优点：实现方法简单易懂，浏览器兼容性强；
      缺点：扩展性差，无法自适应未知项情况。</pre>

    <h3>二、inline-block实现水平居中方法</h3>
    <pre class="code">
      .pagination2 {
        text-align: center;
        font-size: 0; /*兼容chrome等*/
        /*letter-spacing: -4px;*/ /*兼容safari 根据不同字体字号或许需要做一定的调整*/ 
        /*word-spacing: -4px;*/

        li {
          display: inline-block;
          font-size: 14px;
          /*letter-spacing: normal;
          word-spacing: normal;*/
          margin: 0 2px;
        }
      }
      注：兼容safari的写法 实测对chrome有影响，会使其word-spacing为-4px，normal无法纠正回来</pre>
    <div class="pagination pagination2">
      <ul>
        <li><a href="javascript:;">Prev</a></li>
        <li><a href="javascript:;">1</a></li>
        <li><a href="javascript:;">2</a></li>
        <li><a href="javascript:;">3</a></li>
        <li><a href="javascript:;">4</a></li>
        <li><a href="javascript:;">5</a></li>
        <li><a href="javascript:;">Next</a></li>
      </ul>
    </div>
    <pre class="comment">
      优点：简单易懂，扩展性强；
      缺点：需要额外处理inline-block的浏览器兼容性。（相隔的空白）</pre>

    <h3>三、浮动加positive实现水平居中</h3>
    <pre class="code">
      .pagination3 {
        position: relative;
        overflow: hidden;

        ul {
          position: relative;
          left: 50%;
          float: left;

          li {
            position: relative;
            float: left;
            right: 50%;
            margin: 0 2px;
          }

          &:after {
            content: '';
            display: block;
            clear: both;
          }
        }
      }</pre>
    <div class="pagination pagination3">
      <ul>
        <li><a href="javascript:;">Prev</a></li>
        <li><a href="javascript:;">1</a></li>
        <li><a href="javascript:;">2</a></li>
        <li><a href="javascript:;">3</a></li>
        <li><a href="javascript:;">4</a></li>
        <li><a href="javascript:;">5</a></li>
        <li><a href="javascript:;">Next</a></li>
      </ul>
    </div>
    <pre class="comment">
      优点：兼容性强，扩展性强；
      缺点：实现原理较复杂。</pre>

    <h3>四、绝对定位实现水平居中</h3>
    <pre class="code">
      .pagination4 {
        position: relative;

        ul {
          position: absolute;
          left: 50%;
          background-color: rgba(0,0,0,.02);

          li {
            position: absolute;
            right: 50%;
            float: left;
            margin: 0 2px;
          }
        }
      }</pre>
    <div class="pagination pagination4">
      <ul>
        <li><a href="javascript:;">Prev</a></li>
        <li><a href="javascript:;">1</a></li>
        <li><a href="javascript:;">2</a></li>
        <li><a href="javascript:;">3</a></li>
        <li><a href="javascript:;">4</a></li>
        <li><a href="javascript:;">5</a></li>
        <li><a href="javascript:;">Next</a></li>
      </ul>
    </div>
    <pre class="comment">
      优点：扩展性强，兼容性强;
      缺点：理解性难。
      跟第三种方法差不多的，只是从relative换成absolute，另外absolute自带BFC功能来清除浮动，不需要另外写清除。不过问题在pagination撑不起来了，内部元素脱离文档流了。感觉这种方法不太好</pre>

    <h3>五、css3的flex实现水平居中</h3>
    <pre class="code">
      .pagination5 {
        ul {
          display: flex;
          justify-content: center;

          li {
            margin: 0 2px;
          }
        }
      }</pre>
    <div class="pagination pagination5">
      <ul>
        <li><a href="javascript:;">Prev</a></li>
        <li><a href="javascript:;">1</a></li>
        <li><a href="javascript:;">2</a></li>
        <li><a href="javascript:;">3</a></li>
        <li><a href="javascript:;">4</a></li>
        <li><a href="javascript:;">5</a></li>
        <li><a href="javascript:;">Next</a></li>
      </ul>
    </div>
    <pre class="comment">
      优点：实现便捷，扩展性强
      缺点：兼容性差。</pre>

    <h3>六、css3的fit-content实现水平居中</h3>
    <pre class="code">
      .pagination6 {
        width: fit-content;
        margin: 0 auto;
        
        ul {
          overflow: hidden;
          li {
            float: left;
            margin: 0 2px;
          }
        }
      }</pre>
    <div class="pagination pagination6">
      <ul>
        <li><a href="javascript:;">Prev</a></li>
        <li><a href="javascript:;">1</a></li>
        <li><a href="javascript:;">2</a></li>
        <li><a href="javascript:;">3</a></li>
        <li><a href="javascript:;">4</a></li>
        <li><a href="javascript:;">5</a></li>
        <li><a href="javascript:;">Next</a></li>
      </ul>
    </div>
    <pre class="comment">
      优点：简单易懂，扩展性强;
      缺点：浏览器兼容性差</pre>
  </div>
</template>

<style lang="scss">
  @import '~@/assets/css/center/center'
</style>