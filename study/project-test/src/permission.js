/* eslint-disable */
import router from '@/router'
import { getMenu } from './utils/index.js' // 验权
export function parseUrl(url) {
    if (Object.prototype.toString.call(url) !== '[object String]') {
        return { url: '', isExternal: false }
    }
    if (/^https?:\/\//.test(url)) {
        return {
            url: '/iframe/' + encodeURIComponent(url),
            isExternal: true
        }
    } else if (url.substring(0, 8) === '/iframe/') {
        return {
            url,
            isExternal: true
        }
    } else if (url.charAt(0) === '/') {
        return {
            url: url.toLocaleLowerCase(),
            isExternal: false
        }
    } else {
        return { url: '', isExternal: false }
    }
}
const toRoute = function(item, pids, route) {
    const { url, isExternal } = parseUrl(item.nodeType !== 3 && item.url)
    item.name = pids.concat(item.id).join('-')
    item.pids = pids
    item.url = url
    if (url) {
        console.log("route:::", `@/views${url}/index.js`)
        route.push({
            path: `${url}`,
            component: isExternal ? () => import ('@/views/iframeTemplateEmpty.vue') : () => import (`@/views${url}/index.js`),
            name: item.name,
            icon: item.icon || '',
            meta: item,
            noDropdown: true
        })

        // if (child.hasOwnProperty(url)) {
        //     [].concat(child[url]).forEach((c, i) => {
        //         c.meta = Object.assign({
        //             children: c.children || [],
        //             id: `${item.id}.${i}`,
        //             pids: pids.concat(item.id),
        //             // hideMenu: true,
        //             addTag: false,
        //             text: c.name
        //         }, c.meta || {})
        //         route.push(c)
        //     })
        // }
    }
    if (Array.isArray(item.children)) {
        item.children.forEach(value=>toRoute(value, [...pids, item.id], route))
    }
}


export function menuToRoute(menu) {
    const children = []
    menu.forEach(item => {
        toRoute(item, [], children)
    })
    return [{
        path: '/',
        component: () => import ("./Layout.vue"),
        chunkName: 'views/index',
        children,
        hidden: true
    }]
}

export function addRoutes(menu) {
    router.addRoutes(menuToRoute(menu))
}
const menu = getMenu()

if (menu) {
    // console.log("menuToRoute::::menu",menuToRoute(menu))
    router.addRoutes(menuToRoute(menu))
}
