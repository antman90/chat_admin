import { ElMessage } from "element-plus";
import { chatWsLink, apiSiteName } from "./config";
import { wsName } from "./cookie";

interface funIntF {
    (data: { type: string, data: any }): void
}

class Ws {
    public ws: any = null;
    public pingTimer: any = null;
    public name: string = '';
    public room: string = '';
    public wsRoute: string = '';
    public callBack: funIntF = () => { }
    public disConnCallBack: any = () => { }
    constructor(room: string, wsRoute: string, callBack: funIntF, disConnCallBack: any) {
        this.room = room
        this.wsRoute = wsRoute;
        this.callBack = callBack;
        this.disConnCallBack = disConnCallBack;
        this.name = wsName.get();
        if (!this.name) {
            return;
        }
        this.setServer();
        return this.ws;
    }

    setServer() {
        const wsServer = `${chatWsLink}/${this.wsRoute}?type=admin&name=${this.name}&room=${this.room}`
        this.ws = new WebSocket(wsServer);
        this.ws.onopen = this.onOpen.bind(this);
        this.ws.onclose = this.onClose.bind(this);
        this.ws.onmessage = this.onMessage.bind(this);
        this.ws.onerror = this.onError.bind(this);
    }

    onOpen() {
        console.log("ws connect success");
        this.pingTimer = setInterval(() => {
            // this.ws.send(chatMsgObj({ type: "ping" }));
        }, 10000);
    }

    onClose(ev: any) {
        if (ev.type === "close") {
            clearInterval(this.pingTimer);
        }
        console.log("ws disconnected");
        this.disConnCallBack();
    }

    onMessage(evt: any) {
        let data = JSON.parse(evt.data);
        switch (data.type) {
            case "msg":
            case "error":
                ElMessage.success(data.data)
                break;
            default:
                this.callBack && this.callBack(data);
                break;
        }
    }

    onError(ev: any) {
        // console.log("ws error");
        // console.log(ev);
    }
}

export default Ws;
