<template>
  <!-- 修改用户密码 -->
  <!-- <n-modal
    v-model:show="showUserRoleDialog"
    class="container-card"
    preset="card"
    title="分配角色"
    :auto-focus="false"
    :style="{ width: '37.5rem' }"
    :on-update:show="handleModalShow"
  >
    角色
    <template #footer>
      <n-space justify="end">
        <n-button type="default" @click="handleCancel">取 消</n-button>
        <n-button type="primary" :loading="confirmBtnLoading" @click="handleConfirm">确 定</n-button>
      </n-space>
    </template>
  </n-modal> -->
  <q-dialog v-model="showUserRoleDialog" persistent>
    <q-card bordered>
      <q-card-section class="row items-center">
        <q-table
          v-model:selected="curSelected"
          :rows="roleTableData"
          :columns="roleTableColumns"
          row-key="code"
          selection="multiple"
          flat
          :selected-rows-label="getSelectedRows"
          @selection="handleSelection"
        />
      </q-card-section>
      <q-separator />
      <q-card-actions align="right" class="q-ma-sm">
        <q-btn label="取 消" color="warning" @click="handleCancel" />
        <q-btn label="确 定" color="primary" :loading="confirmBtnLoading" @click="handleConfirm" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { mdiClose } from "@quasar/extras/mdi-v6";
import { getAllRoleList } from "@/api/system/roleManage";
import { IRes } from "@/interface/common";
import { get } from "http";

let props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});

// 响应式数据
let confirmBtnLoading = $ref<boolean>(false);
let roleTableData: any = reactive([]);
let curSelected: any = reactive([]);
let roleTableColumns = [
  {
    label: "角色名称",
    name: "name",
    field: "name",
    align: "center",
    headerClasses: "cus-table-th",
    classes: "cus-table-td",
  },
  {
    label: "角色代码",
    name: "code",
    field: "code",
    align: "center",
    headerClasses: "cus-table-th",
    classes: "cus-table-td",
  },
  {
    label: "描述",
    name: "description",
    field: "description",
    align: "center",
    headerClasses: "cus-table-th",
    classes: "cus-table-td",
  },
];

// 计算属性
let showUserRoleDialog = computed(() => {
  return props.show;
});

// 监听
watch(showUserRoleDialog, (nVal, oVal) => {
  if (nVal) {
    getRoleData();
  }
});

let emit = defineEmits(["close"]);

const handleConfirm = (): void => {
  confirmBtnLoading = true;
  setTimeout(() => {
    Notify.create({
      type: "positive",
      message: "分配成功！",
    });
    confirmBtnLoading = false;
    emit("close");
  }, 1000);
};

const handleCancel = (): void => {
  emit("close");
};

// 查询角色列表
const getRoleData = (): void => {
  getAllRoleList().then((res: IRes) => {
    if (res && res.code === 200) {
      roleTableData = res.data.records;
    }
  });
};

// 选择行
const getSelectedRows = (rows: any): string => {
  console.log(rows);
  return curSelected.value.length === 0
    ? ""
    : `${curSelected.value.length} record${curSelected.value.length > 1 ? "s" : ""} selected of ${rows.length}`;
};

const handleSelection = ({ rows, added, evt }: any): void => {
  console.log(rows);
};
</script>

<style lang="scss" scoped></style>
