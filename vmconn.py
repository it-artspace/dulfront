import os
from home import homedir
import socket
import threading


class VmConnection:
    def __init__(self, uid: str):
        # recompiled as socket runner it will automatically
        # take address of own place + sock
        cmd = f'nohup {homedir}/user_space/{uid}/dulang &'
        os.system(cmd)
        self.uid = uid
        self.sock = None
        if not self.sock:
            pass

    def react(self, message, ws):
        self.sock = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
        message_items = message.split()
        message_items[1] = f'{homedir}/user_space/{self.uid}/src/{message_items[1]}'
        message = " ".join(message_items)
        print(message)
        self.sock.connect(f'{homedir}/user_space/{self.uid}/addr')
        self.sock.send(message.encode("utf-8"))

        t = threading.Thread(target=self.send_answer, args=(ws, ))
        t.daemon = True
        t.start()

    def send_answer(self, ws):
        while True:
            data = self.sock.recv(1024)
            if not data:
                break
            ws.emit("output", data)




class _ConPool:
    def __init__(self):
        self.conns = {}

    def get_connection(self, uid):
        if uid not in self.conns:
            self.conns[uid] = VmConnection(uid)
        return self.conns[uid]


ConPool = _ConPool()
