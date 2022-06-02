import request from "./axios";
import { apiAddress, apiSiteName } from "./config";
const TOON123_URL_PATH =
    "http://wwwimageup.11angle.net/other/Alditor/emoticons";

const len = 134;
let toon123 = [];
let toon123_gif = [];
let toon123_download_gif = [];

for (let i = 1; i <= len; i++) {
    let item = i < 10 ? "0" + i : "" + i;
    toon123.push({
        src: `${TOON123_URL_PATH}/${item}.png`,
    });
}

for (let i = 1; i <= 54; i++) {
    toon123_gif.push({
        src: `${TOON123_URL_PATH}/${i}.gif`,
    });
}

for (let i = 1; i <= 63; i++) {
    toon123_download_gif.push({
        src: `${TOON123_URL_PATH}/download(${i}).gif`,
    });
}

const config = {
    lang: "ko",
    languages: {
        ko: {
            wangEditor: {
                插入: "insert",
                默认: "default",
                创建: "create",
                修改: "edit",
                如: "like",
                请输入正文: "please enter the text",
                menus: {
                    title: {
                        标题: "标题",
                        加粗: "加粗",
                        字号: "字号",
                        字体: "字体",
                        斜体: "斜体",
                        下划线: "下划线",
                        删除线: "删除线",
                        缩进: "缩进",
                        行高: "行高",
                        文字颜色: "文字颜色",
                        背景色: "背景色",
                        链接: "链接",
                        序列: "序列",
                        对齐: "对齐",
                        引用: "引用",
                        表情: "表情",
                        图片: "图片",
                        视频: "视频",
                        表格: "表格",
                        代码: "代码",
                        分割线: "分割线",
                        恢复: "恢复",
                        撤销: "撤销",
                        全屏: "全屏",
                        代办事项: "代办事项",
                    },
                    dropListMenu: {
                        设置标题: "title",
                        背景颜色: "background",
                        文字颜色: "font color",
                        设置字号: "font size",
                        设置字体: "font family",
                        设置缩进: "indent",
                        对齐方式: "align",
                        设置行高: "line heihgt",
                        序列: "list",
                        head: {
                            正文: "text",
                        },
                        indent: {
                            增加缩进: "indent",
                            减少缩进: "outdent",
                        },
                        justify: {
                            靠左: "left",
                            居中: "center",
                            靠右: "right",
                            两端: "justify",
                        },
                        list: {
                            无序列表: "unordered",
                            有序列表: "ordered",
                        },
                    },
                    panelMenus: {
                        emoticon: {
                            默认: "default",
                            新浪: "sina",
                            emoji: "emoji",
                            emoji2: "emoji2",
                            emoji3: "emoji3",
                            手势: "gesture",
                        },
                        image: {
                            图片链接: "image link",
                            上传图片: "upload image",
                            网络图片: "network image",
                        },
                        link: {
                            链接: "link",
                            链接文字: "link text",
                            删除链接: "delete",
                            查看链接: "view",
                        },
                        video: {
                            插入视频: "insert video",
                        },
                        table: {
                            行: "row",
                            列: "column",
                            的: " ",
                            表格: "table",
                            添加行: "add row",
                            删除行: "delete row",
                            添加列: "add column",
                            删除列: "delete column",
                            设置表头: "set header",
                            取消表头: "cancel header",
                            插入表格: "insert table",
                            删除表格: "delete table",
                        },
                        code: {
                            删除代码: "delete code",
                            修改代码: "edit code",
                            插入代码: "insert code",
                        },
                    },
                },
                validate: {
                    张图片: "images",
                    大于: "greater than",
                    图片链接: "image link",
                    不是图片: "is not image",
                    返回结果: "return results",
                    上传图片超时: "upload image timeout",
                    上传图片错误: "upload image error",
                    上传图片失败: "upload image failed",
                    插入图片错误: "insert image error",
                    一次最多上传: "once most at upload",
                    下载链接失败: "download link failed",
                    图片验证未通过: "image validate failed",
                    服务器返回状态: "server return status",
                    上传图片返回结果错误: "upload image return results error",
                    请替换为支持的图片类型: "please replace with a supported image type",
                    您插入的网络图片无法识别:
                        "the network picture you inserted is not recognized",
                    您刚才插入的图片链接未通过编辑器校验:
                        "the image link you just inserted did not pass the editor verification",
                },
            },
        },
    },
    emotions: [
        {
            title: "emoji",
            type: "image",
            content: toon123,
        },
        {
            title: "emoji2",
            type: "image",
            content: toon123_gif,
        },
        {
            title: "emoji3",
            type: "image",
            content: toon123_download_gif,
        },
    ],
    menus: [
        "bold",
        "fontSize",
        "head",
        "italic",
        "underline",
        "emoticon",
        "image",
        'justify',
    ],
    colors: [
        '#444',
        '#e5bcda',
        '#dac36d',
        '#d2ae72',
        '#af562e',
        '#8faa9f',
        '#5f79c9',
        '#e8bf54',
        '#3f5c5e',
        '#354b95',
        '#cc5b39',
        '#864144',
        '#dbdfbb',
        '#7e935a',
        '#182d46',
        '#a38a38',
    ],
    showLinkImg: false,
    showMenuTooltips: false,
    uploadImgParamsWithUrl: false,
    uploadImgServer: apiAddress + "community-upload",
    uploadFileName: "file",
    customUploadImg: (resultFiles: any, insertImgFn: any) => {
        const param = new FormData();
        param.append("file", resultFiles[0]);
        param.append("folder", apiSiteName);
        request({
            url: "upload",
            method: "post",
            param,
            upload: true,
        }).then((res) => {
            if (res.src) {
                insertImgFn(res.src);
            }
        });
    },
};

export default config;
