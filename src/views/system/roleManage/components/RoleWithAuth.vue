<template>
  <!-- 角色对应的权限 -->
  <n-modal
    v-model:show="showRoleWithAuthModal"
    class="container-card"
    preset="card"
    title="分配权限"
    :auto-focus="false"
    :style="{ width: '37.5rem' }"
    :on-update:show="handleModalShow"
  >
    <n-space :show="dialogLoading">
      <n-tree
        block-line
        :data="appMenuTreeData"
        key-field="id"
        label-field="menuName"
        children-field="children"
        expand-on-click
        checkable
      ></n-tree>
    </n-space>
    <template #footer>
      <n-space justify="end">
        <n-button type="default" @click="handleCancel">取 消</n-button>
        <n-button type="primary" :loading="confirmLoading" @click="handleConfirm">确 定</n-button>
      </n-space>
    </template>
  </n-modal>
</template>

<script lang="ts" setup>
import { IRes } from '@/interface/common';
import { getMenuList, addMenuList, updateMenu, deleteMenu } from '@/api/system/menuManage';

interface IMenuForm {
  id: string;
  pid: string;
  path: string;
  name: string;
  meta: {
    title: string;
    icon: string;
    show: number;
    disabled: number;
    cache: number;
    type: number;
    description: string;
  };
  component: string;
  order: number;
  children?: IMenuForm[];
}

let props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
});

let emit = defineEmits(['close']);

let showRoleWithAuthModal = computed(() => {
  return props.show;
});

let dialogLoading = $ref<boolean>(false);
let confirmLoading = $ref<boolean>(false);
let appMenuTreeData: any = reactive([]);

const handleConfirm = (): void => {
  confirmLoading = true;
  setTimeout(() => {
    window.$message.success('确定');
    confirmLoading = false;
    emit('close');
  }, 1000);
};

const handleModalShow = (val: boolean) => {
  if (!val) emit('close');
};

const handleCancel = (): void => {
  emit('close');
};

// 菜单目录名称递归
const getMenuTree = (menuList: Array<IMenuForm>) => {
  let menuTree: Array<any> = [
    {
      menuName: '系统根目录',
      id: '0',
      pid: '0',
      children: []
    }
  ];
  const recursionMenu = (menuList: Array<IMenuForm>) => {
    const clonedTree: any = [];
    for (let node of menuList) {
      const clonedNode: any = {
        menuName: node.meta.title,
        id: node.id,
        pid: node.path
      };
      if (node.children && node.children.length > 0) {
        clonedNode.children = recursionMenu(node.children);
      }
      clonedTree.push(clonedNode);
    }
    return clonedTree;
  };
  let result = recursionMenu(menuList);
  menuTree[0].children = result;
  return menuTree;
};

// 获取菜单数据
const getMenuData = (): void => {
  // const data = {
  //   token: useUserStore().token
  // };
  dialogLoading = true;
  getMenuList()
    .then((res: IRes) => {
      if (res && res.code === 200) {
        let rData = res.data;
        appMenuTreeData = getMenuTree(rData);
        console.log(appMenuTreeData);
        dialogLoading = false;
      }
    })
    .catch(() => {
      dialogLoading = false;
    });
};

onMounted(() => {
  getMenuData();
});
</script>

<style lang="scss" scoped></style>
