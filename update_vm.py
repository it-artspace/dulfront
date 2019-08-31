from home import homedir
import os

users_dirs = os.listdir(f'{homedir}/user_space')
for directory in users_dirs:
    if os.path.isdir(directory):
        os.system(f'cp {homedir}/dulang/dulang {homedir}/user_space/{directory}/dulang')

