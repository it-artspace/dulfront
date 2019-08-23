import os
from home import homedir
import socket


class VmConnection:
    def __init__(self, uid: str):
        # recompiled as socket runner it will automatically
        # take address of own place + sock
        cmd = f'nohup {homedir}/user_space/{uid}/dulang &'
        os.system(cmd)
        self.sock = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
        self.sock.connect(f'{homedir}/user_space/{uid}/dulsock')
        if not self.sock:
            pass

    def react(self, message):
        self.sock.send(message.encode("utf-8"))
        data = ""
        while "--end--" not in data:
            data += self.sock.recv(1024)
        return data.replace("--end--", "\n")


class _ConPool:
    def __init__(self):
        self.conns = {}

    def get_connection(self, uid):
        if uid in self.conns:
            self.conns[uid] = VmConnection(uid)
        return self.conns[uid]


ConPool = _ConPool()
