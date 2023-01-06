import { EventEmitter } from "events";
import ReconnectingWebSocket from "reconnecting-websocket";
import cookie from "@/utils/cookie";

import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { useEffect } from "react";
import { getToken, getUser, isLogin } from "@/utils/auth";

export type Message<T = Record<string, string>> = {
  topic: string;
  params: T;
};

const webSocketAtom = atom<ReconnectingWebSocket | null>({
  key: "webSocketInstance",
  default: null,
  dangerouslyAllowMutability: true,
});

const eventEmitterAtom = atom<EventEmitter | null>({
  key: "eventEmitterInstance",
  default: null,
  dangerouslyAllowMutability: true,
});

export const useInitWebSocket = () => {
  const user = getUser();

  const [ws, setWS] = useRecoilState(webSocketAtom);
  const setEventEmitter = useSetRecoilState(eventEmitterAtom);

  useEffect(() => {
    if (!isLogin()) {
      return;
    }

    if (!ws) {
      const websocket = new ReconnectingWebSocket(
        WS_URL + "?accessToken=" + getToken(),
        undefined,
        {
          maxReconnectionDelay: 8000,
          minReconnectionDelay: 2000,
          maxRetries: 10,
        }
      ) as WebSocket;

      const eventEmitter = new EventEmitter();

      websocket.addEventListener(
        "message",
        function (message: { data: string }) {
          const data = JSON.parse(message.data);
          const topic = data.topic;
          if (!topic) {
            return;
          }
          eventEmitter?.emit("message", data);
        }
      );

      setInterval(() => {
        websocket?.send("ping");
      }, 45 * 1000);

      setWS(websocket);
      setEventEmitter(eventEmitter);
    }
  }, [ws, setWS, setEventEmitter, user]);
};

export const useWebSocket = () => {
  return useRecoilValue(webSocketAtom);
};

export const useEventEmitter = () => {
  return useRecoilValue(eventEmitterAtom);
};
