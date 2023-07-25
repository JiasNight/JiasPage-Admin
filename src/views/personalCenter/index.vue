<template>
  <div class="view-container">个人中心</div>
</template>

<script lang="ts" setup>
import { Ref, ComputedRef, h, Component } from 'vue';
import { TreeOption, FormInst, DataTableColumns, NButton, NIcon, useDialog, useMessage } from 'naive-ui';
// import { renderIcon } from '@/utils/common';
// import { IRes } from '@/interface/common';
// import useUserStore from '@/store/module/user';
// import { Icon } from '@iconify/vue';
// import { getDeptTree, getUserList } from '@/api/system/userManage';

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
</script>

<style lang="scss" scoped>
.screen-layout {
}
</style>
