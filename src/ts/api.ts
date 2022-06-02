import request from "./axios";

export const login = (data: any) => {
  return request({
    url: "/admin/login",
    data,
    method: "post",
  });
};

export const logout = () => {
  return request({
    url: "logout",
  });
};

export const chatSiteLst = (data: any) => {
  return request({
    url: "chat/site/list",
    data,
  });
};

export const chatSiteAllName = () => {
  return request({
    url: "chat/site/all",
  });
};

export const chatSiteCreate = (data: any) => {
  return request({
    url: "chat/site/create",
    data,
    method: 'post',
  });
};

export const chatSiteSwitchUpdate = (data: any) => {
  return request({
    url: "chat/site/switch/update",
    data,
    method: 'put',
  });
};

export const chatSiteListDelete = (data: any) => {
  return request({
    url: "chat/site/list/delete",
    data,
    method: 'delete',
  });
};

export const chatSiteDetail = (data: any) => {
  return request({
    url: "chat/site/detail",
    data,
    method: 'get',
  });
};

export const chatRoomCreate = (data: any) => {
  return request({
    url: "chat/room/create",
    data,
    method: 'post',
  });
};

export const chatRoomList = (data: any) => {
  return request({
    url: "chat/room/list",
    data,
  });
};

export const chatRoomNameList = (data: any) => {
  return request({
    url: "chat/room/all",
    data,
  });
};

export const chatRoomSwitchUpdate = (data: any) => {
  return request({
    url: "chat/room/switch/update",
    data,
    method: 'put',
  });
};

export const chatRoomListDelete = (data: any) => {
  return request({
    url: "chat/room/list/delete",
    data,
    method: 'delete',
  });
};

export const chatRoomDetail = (data: any) => {
  return request({
    url: "chat/room/detail",
    data,
    method: 'get',
  });
};


export const chatPortCreate = (data: any) => {
  return request({
    url: "chat/port/create",
    data,
    method: 'post',
  });
};

export const chatPortList = (data: any) => {
  return request({
    url: "chat/port/list",
    data,
  });
};

export const chatPortListDelete = (data: any) => {
  return request({
    url: "chat/port/list/delete",
    data,
    method: 'delete',
  });
};

export const chatPortDetail = (data: any) => {
  return request({
    url: "chat/port/detail",
    data,
    method: 'get',
  });
};

export const allPortGet = () => {
  return request({
    url: "chat/port/all",
    method: 'get',
  });
};