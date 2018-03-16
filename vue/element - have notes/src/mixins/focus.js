// 参数是传在这儿的，不在focus()函数
export default function(ref) {
  return {
    methods: {
      // 怪不得有时候照搬代码没有用，他混合了一个focus方法。。
      focus() {
        this.$refs[ref].focus();
      }
    }
  };
};
