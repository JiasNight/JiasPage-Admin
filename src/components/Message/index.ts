import { createApp, render, getCurrentInstance } from 'vue';
import type { App } from 'vue';
import vuetify from 'plugins/vuetify';
import MessageConstructor from './message.vue';

// hooks
export function useMessage() {
  const {
    // @ts-ignore
    appContext: {
      app: {
        config: {
          globalProperties: { $message }
        }
      }
    }
  } = getCurrentInstance();

  return $message;
}

type MessageQueue = App[];

const instances: any = []; // 消息队列

const offset = 60; // 单个消息框偏移

let seed = 1;

const message: any = function (options: Object | string) {
  if (typeof options === 'string') {
    options = {
      message: options
    };
  }

  const id = `message_${seed++}`;

  const container = document.createElement('div');

  // createVNode 不行, 不能使用 use
  const app = createApp(MessageConstructor, {
    id,
    top: (instances.length + 1) * offset,
    onClose: () => {
      render(null, container);
      close(id);
    },
    ...options
  })
  .use(vuetify) // vuetify 的组件貌似必须挂载在具有 symbol(vuetify) 的节点上...
  .mount(container);

  instances.push(app as any);

  // 把虚拟节点加进 dom 树里(不要把 container 加进去)
  document.body.appendChild(container.firstElementChild!);
};

['success', 'info', 'warning', 'error'].forEach((type: string) => {
  message[type] = (options: Object | string) => {
    if (typeof options === 'string') {
      return message({
        type,
        message: options
      });
    } else if (typeof options === 'object') {
      return message({
        type,
        ...options
      });
    }
  };
});

// 消息关闭时的相关处理函数...
// 例如把其他消息的 top 缩小
function close(id: string): void {
  const idx = instances.findIndex((app: any) => id === app.id);

  if (idx === -1) return;

  const app = instances[idx];

  // 如果没有找到虚拟节点就什么都不做
  if (!app) return;

  // 从 idx 位置开始删除一个节点
  instances.splice(idx, 1);

  const len = instances.length;

  if (len < 1) return; // 删除一个虚拟节点后消息队列内没有元素, 什么都不做了

  for (let i = idx; i < len; i++) {
    instances[i]['reTime'](); // 重新开始定时

    // style 的 top 是 ..px 的形式, 因此需要 parseInt 解析出数字
    const pos: number = Number.parseInt((instances[i] as any).$el.style.top, 10) - offset;
    instances[i]['$el'].style.top = `${pos}px`;
  }
}

// 消息提示框插件
export default {
  install(app: App) {
    app.config.globalProperties.$message = message;
  }
};
