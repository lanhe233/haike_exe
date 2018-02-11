// 将多语言方法混合入组件
import { t } from 'element-ui/src/locale';

export default {
  methods: {
    t(...args) {
      return t.apply(this, args);
    }
  }
};
