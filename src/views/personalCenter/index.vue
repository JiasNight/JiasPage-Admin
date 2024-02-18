<template>
  <div class="view-container">
    <n-grid cols="2 s:1 m:1 l:2 xl:2 2xl:2" responsive="screen" x-gap="20">
      <n-grid-item>
        <n-card title="个人信息">
          <n-avatar round :size="50" src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
        </n-card>
      </n-grid-item>
      <n-grid-item>
        <n-card title="详细">
          <n-descriptions label-placement="left" bordered :column="3">
            <n-descriptions-item label="账号"> {{ userInfo?.userName }} </n-descriptions-item>
            <n-descriptions-item label="昵称"> {{ userInfo?.userNickName }} </n-descriptions-item>
          </n-descriptions>
        </n-card>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script lang="ts" setup>
import { Ref, ComputedRef, h, Component } from 'vue';
import { TreeOption, FormInst, DataTableColumns, NButton, NIcon, useDialog, useMessage } from 'naive-ui';
// import { renderIcon } from '@/utils/common';
// import { IRes } from '@/interface/common';
import useUserStore from '@/store/module/user';
// import { Icon } from '@iconify/vue';
// import { getDeptTree, getUserList } from '@/api/system/userManage';

const userStore = useUserStore();

interface IUserForm {
  userName: string | null;
  userAccount: string | null;
  userPhone: string | null;
  userRole: string | null;
  dataRange: Array<[string, string]> | null;
}

type IUserTable = {
  userName: string;
  userAccount: string;
  userRole: string;
  createTime: string;
};

const userInfo = toRaw(userStore.getUserInfo);
</script>

<style lang="scss" scoped>
.view-container {
}
</style>
