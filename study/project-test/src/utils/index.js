const sampleMenu = [
    {
        "id":"BASP",
        "text":"示例",
        "icon":"",
        "leaf":false,
        "expanded":true,
        "url":"",
        "children":[
            {
                "id":"BASP_01",
                "text":"表格",
                "leaf":false,
                "expanded":true,
                "url":"",
                "children":[
                    {
                        "id":"BASP_01_02",
                        "text":"表格1",
                        "leaf":true,
                        "url":"/wraptable",
                        "nodeType":2,  // 2:页面 3:按钮
                    },
                    {
                        "id":"BASP_01_03",
                        "text":"表格2",
                        "leaf":true,
                        "url":"/wraptableproxy",
                        "nodeType":2 // 2:页面 3:按钮
                    }
                ]
            }
        ]
    }
]

export function getMenu() {
    const getTheeList = localStorage.getItem("getTheeList");
    if (getTheeList) {
        return JSON.parse(getTheeList);
    }else {
        return sampleMenu
    }
}
