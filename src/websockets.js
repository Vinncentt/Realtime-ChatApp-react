

const host = process.env.NODE_ENV === 'production' ? window.location.host: 'localhost:8080';

export let send;

let onMessageCallback

export const startWebSocketConnection = () => {
    const ws = new window.WebSocket('ws://' + host + '/chat') || {};

    ws.onopen = () => {
        console.log('WebSocket opened');
    }

    ws.onclose = (e) => {
        console.log('WebSocket closed : ', e.code, e.reason);
    }

    ws.onmessage = (e) => {
        onMessageCallback && onMessageCallback(e.data);
    }

    send = ws.send.bind(ws);

}

export const registerOnMessageCallback = (fn) => {
    onMessageCallback = fn;
}