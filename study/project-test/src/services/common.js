//待办事项列表
import request from "@/utils/request.js";
export function teamList(params) { //获取表格数据
    const url = `/citymanagement/process/teamList`;
    return request({
        url: url,
        method: "get",
        data: params
    });
}
//下拉框通用字典
export function getByType(type) { //获取表格数据
    const url = `/citymanagement/process/getByType?type=${type}`;
    return request({
        url: url,
        method: "get"
    });
}
//惯用语查询
export function expressions(params) { //获取表格数据
    const url = `/citymanagement/process/expressions`;
    return request({
        url: url,
        method: "get",
        params
    });
}
//审批事项详情
export function eventDetails(eventId,userId) { //获取表格数据
    const url = `/citymanagement/process/details?eventId=${eventId}&userId=${userId}`;
    return request({
        url: url,
        method: "get"
    });
}
//审批事项详情
export function userLogin(params) { //用户登录
    const url = `/citymanagement/user/login`;
    return request({
        url: url,
        method: "get",
        params
    });
}
export function getTreeList(params) {
    const url = `citymanagement/user/getrole`;
    return request({
        url: url,
        method: "get",
        params
    });
}
