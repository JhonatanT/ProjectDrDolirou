import { serverHttp } from "./server";
import "./websocket"

serverHttp.listen(3030, async () => {
    console.log("RUNNING 3030 DrDolirou API")
})