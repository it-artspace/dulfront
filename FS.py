import os
from home import homedir
import json


class FS:
    # its is thought of recreating objects of this class
    def path(self):
        return f'{homedir}/user_space/{self.uid}'

    def auth_setup(self):
        os.system(";".join([
            f'mkdir {self.path()}',
            f'mkdir {self.path}/src',
            f'cp {homedir}/dulang/dulsocket {self.path()}/dulang',
            f'mkdir {self.path()}/src',
            f'echo \"write \"hello world\"\" > {self.path()}/src/main.dul'
        ]))

    def __init__(self, uid):
        self.uid = uid

    def get_file_list(self):
        if not os.path.exists(f'{self.path()}/src'):
            self.auth_setup()
        return json.dumps(os.listdir(f'{self.path()}/src'))

    def get_file_content(self, filename):
        filepath = f'{self.path()}/src/{filename}'
        if not os.path.exists(filepath):
            self.auth_setup()
            os.system(f'echo \"write \"hello world\"\" > {filepath}')
        return open(filepath, "r").read()

    def save_file(self, fname, fcontent):
        try:
            open(f'{self.path()}/src/{fname}', "w").write(str(fcontent, "utf-8"))
        except FileNotFoundError:
            # either id is incorrect or ... ?
            pass

