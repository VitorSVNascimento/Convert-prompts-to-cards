from flask import Flask
from backend.server import constants as const
from flask_cors import CORS

import pathlib
class Server:
    def __init__(self,):
        self.app = Flask(
            __name__,
            template_folder=str(pathlib.Path(__file__).parent / "../templates"),
            static_folder=str(pathlib.Path(__file__).parent / "../static")
        )
        CORS(self.app, resources={r"/*": {"origins": "*"}})
    
    def run(self,):
        self.app.run(const.SERVER_HOST,const.SERVER_PORT,debug=True)

server = Server()