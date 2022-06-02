import { RouteRecordRaw } from "vue-router";
import Home from "../views/home.vue";

const Login = () => import("../views/login.vue");
const Logout = () => import("../views/logout.vue");

const SiteList = () => import("../views/site-list.vue");
const SiteEdit = () => import("../views/site-edit.vue");

const RoomList = () => import("../views/room-list.vue");
const RoomEdit = () => import("../views/room-edit.vue");
const SiteOnline = () => import("../views/site-online.vue");


const PortList = () => import("../views/port-list.vue");
const PortEdit = () => import("../views/port-edit.vue");




const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: { notMenu: true },
  },
  {
    path: "/",
    name: "home",
    component: Home,
    meta: { title: "Home Page", name: "首页", auth: true, notMenu: true },
  },
  {
    path: "/site-edit/:id?",
    name: "siteEdit",
    component: SiteEdit,
    meta: { name: "新建分类", auth: true, notMenu: true },
  },
  {
    path: "/site-list",
    name: "siteList",
    component: SiteList,
    meta: { name: "分类列表", auth: true },
  },
  {
    path: "/room-edit/:roomId?",
    name: "roomEdit",
    component: RoomEdit,
    meta: { name: "新建房间", auth: true, notMenu: true },
  },
  {
    path: "/room-list/:chatSite?",
    name: "roomList",
    component: RoomList,
    meta: { name: "房间列表", auth: true },
  },
  {
    path: "/site-online/:room/:wsRoute",
    name: "siteOnline",
    component: SiteOnline,
    meta: { auth: true, notMenu: true },
  },
  {
    path: "/port-edit/:id?",
    name: "portEdit",
    component: PortEdit,
    meta: { name: "新建连接", auth: true, notMenu: true },
  },
  {
    path: "/port-list",
    name: "portList",
    component: PortList,
    meta: { name: "连接列表", auth: true },
  },
  // {
  //   path: "/site",
  //   name: "site",
  //   component: Site,
  //   meta: { name: "站点管理", auth: true },
  //   redirect: "/site/list",
  //   children: [
  //     {
  //       path: "list",
  //       name: "SiteList",
  //       component: SiteList,
  //       meta: { name: "站点列表", auth: true },
  //     },
  //   ],
  // },
  {
    path: "/logout",
    name: "logout",
    component: Logout,
    meta: { name: "退出登录", auth: true },
  },
];

export default routes;
