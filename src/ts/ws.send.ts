const wsSend = (ws: WebSocket | null, data: any) => {
    if (ws && ws.send) {
        ws.send(JSON.stringify(data))
    }
}

export const getUserListByRoom = (ws: WebSocket | null, room: string | string[]) => {
    wsSend(ws, {
        class: "Admin",
        type: "getUserList",
        data: {
            room,
        },
    })
}

export const modifyUserStatus = (ws: WebSocket | null, data: any) => {
    wsSend(ws, {
        class: "Admin",
        type: "modifyUserStatus",
        data
    })
}

export const userDisconnect = (ws: WebSocket | null, data: any) => {
    wsSend(ws, {
        class: "Admin",
        type: "userDisconnect",
        data
    })
}

export const roomTipModify = (ws: WebSocket | null, data: any) => {
    wsSend(ws, {
        class: "Admin",
        type: "roomTipModify",
        data
    })
}

