from flask import render_template, request, make_response
from backend.server.server import server


@server.app.route('/')
@server.app.route('/index')
def index():
    """
    A route that renders the index.html template.
    """
    return render_template('index.html')