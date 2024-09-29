import { RouteLocationNormalizedLoaded, RouteRecordRaw } from "vue-router";

// 接口返回统一标准
export interface IResponse<T = any> {
  success: boolean;
  code: number;
  message: string;
  timestamp: string;
  data: T;
}

export type IRes = IResponse;

// 用户信息
export interface IUserInfo {
  userId: string;
  username: string;
  nickName: string;
  token: string;
  deptId: string;
  deptName: string;
}

export interface IThemeColor {
  color: string;
  label: string;
  key: string;
}

export interface IThemeFormData {
  darkMode: boolean;
  color: string;
  size: string;
  layout: string;
  siderHasHeader: string;
  siderPosition: string;
  siderWidth: number;
  siderBgColor: string;
  headerShow: boolean;
  headerBgColor: string;
  headerHeight: number;
  logoShow: boolean;
  breadcrumbsShow: boolean;
  tagPageShow: boolean;
}

export interface IThemeState {
  darkMode: boolean;
  themeColor: Array<IThemeColor>;
  siderHasHeader: boolean;
  siderPosition: string;
  siderWidth: number;
  siderBgColor: string;
  headerShow: boolean;
  headerBgColor: string;
  headerHeight: number;
  logoShow: boolean;
  breadcrumbsShow: boolean;
  tagPageShow: boolean;
}

export interface IAppState {
  collapsedSider: boolean;
  reloadViews: boolean;
  routes: Array<RouteRecordRaw>;
  currentRoute: object;
  breadcrumbs: Array<RouteRecordRaw>;
  lockScreen: boolean;
}
