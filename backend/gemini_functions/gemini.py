import google.generativeai as genai
MAIN_PROMPT = "a partir de agora quero que se comporte como um gerador de cards kanban, o usuário irá te fornecer uma descrição e você retornará uma lista de cards necessários para concluir essa descrição os cards devem ser feitos nesse formato id:string contendo o TASK-numero do card, title:nome do card, points: numero de pontos de sprint necessarios para realizar esse card em especifico,priority: low, medium ou high ,status: sempre a fazer,as chaves e valores dos jsons devem vir entre aspas,a lista deve vir entre as tags de controle START_LIST e END_LIST Não quero que faça comentários adicionais apenas envie a lista com as tags de controle\\nExemplo:\\nConstruir um barco = START_LIST \\n[\\n{\\\"id\\\": \\\"TASK-1\\\",\\\"title\\\": \\\"Planejar o projeto\\\",\\\"status\\\": \\\"a fazer\\\",\\\"priority\\\": \\\"high\\\",\\\"points\\\": 5},{\\\"id\\\": \\\"TASK-2\\\",\\\"name\\\": \\\"Obter materiais\\\",\\\"status\\\": \\\"a fazer\\\",\\\"priority\\\": \\\"medium\\\",\\\"points\\\": 1},{\\\"id\\\": \\\"TASK-3\\\",\\\"title\\\": \\\"Construir o casco\\\",\\\"status\\\": \\\"a fazer\\\",\\\"priority\\\": \\\"high\\\",\\\"points\\\": 2}}END_LIST\\n]\\nEND_LIST\\n"

class Gemini:
    def __init__(self, prompt, api_key):
        genai.configure(api_key=api_key)
        self.api_key = api_key
        self.prompt = prompt
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel(
            model_name="gemini-pro",
        )
        self.chat = model.start_chat(
            history=[]
        )
    def generate(self):
        prompt = (f'{MAIN_PROMPT}\n {self.prompt}=')
        self.chat.send_message(prompt)
        print(prompt)
        print(self.chat.last.text)
        return self.chat.last.text
    
    def containsHistory(self):
        return self.chat.history == []