// 按需全局引入 vant组件
import Vue from "vue";
import {
  Button,
  Divider,
  Icon,
  NavBar,
  Popup,
  Picker,
  Empty,
  Lazyload
} from "vant";
import "vant/lib/index.css";

// 注册时可以配置额外的选项
Vue.use(Lazyload, {
  // loading: '',
  // error
});

Vue.use(Empty);
Vue.use(Button);
Vue.use(NavBar);
Vue.use(Divider);
Vue.use(Icon);
Vue.use(Popup);
Vue.use(Picker);
