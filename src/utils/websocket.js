
// export default class A{
// var ws = new WebSocket('ws://dev-bi-im.blockbi.com:9988/chat');
//     ws.onmess()
// }

var ws = new WebSocket('ws://dev-bi-im.blockbi.com:9988/chat');
export function onmessage() {
    ws.onmessage = () => {
        console.log('处理消息');
    }
}


export function onerror() {
    ws.onerror = () => {
        console.log('处理消息');
    }
}


export function onopen() {
    ws.onopen = () => {
        console.log('连接上了');
    }
}

export function onclose() {
    ws.onopen = () => {
        console.log('ws 关闭');
    }
}

export function onsend(data) {
    ws.send(JSON.stringify(data));
}