from flask import render_template, request, make_response, jsonify
from backend.server.server import server
from ..tests.json_list import JSON_LIST
from ..gemini_functions.normalize import convert_response_to_dict_list
from ..gemini_functions.gemini import Gemini

@server.app.route('/')
@server.app.route('/index')
def index():
    """
    A route that renders the index.html template.
    """
    return render_template('index.html')

@server.app.route('/tasks',methods=['GET'])
def get_tasks():
    return make_response(JSON_LIST)

@server.app.route('/generate',methods=['POST'])
def tasks():
    data = request.get_json()
    print(data.get('prompt'))
    user_prompt = data.get('prompt')
    user_prompt = user_prompt.strip()
    user_api = data.get('api').strip()
    if(len(user_prompt) == 0):
        return make_response("O prompt não pode estar vazio",400)
    gemini = Gemini(user_prompt,user_api)
    card_list = convert_response_to_dict_list(gemini.generate())

    return make_response(card_list)