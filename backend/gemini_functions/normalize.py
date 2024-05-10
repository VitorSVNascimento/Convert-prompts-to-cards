import re
import json
def convert_response_to_dict_list(response:str):
    
    response_str = str(response)

    # Encontrar a string entre START_LIST e END_LIST usando expressão regular
    match = re.search(r"START_LIST(.*?)END_LIST", response_str, re.DOTALL)

    if match:
        # Extrair o conteúdo entre START_LIST e END_LIST
        list_str = match.group(1).strip()

        list_str = re.sub(r'}\s*{', r'}, {', list_str)

        # Adicionar colchetes se não existirem
        if not list_str.startswith("[") and not list_str.endswith("]"):
            list_str = "[" + list_str + "]"

        # Adicionar aspas duplas às chaves que não as têm
        list_str = re.sub(r'(\w+):', r'"\1":', list_str)

        # Substituir aspas simples por aspas duplas para tornar a string válida JSON
        list_str = list_str.replace("'", "\"")

        # Corrigir a formatação dos objetos JSON
        print(list_str)

        # Converter a string em uma lista de dicionários
        try:
            list_of_dicts = json.loads(list_str)
            return list_of_dicts
        except json.JSONDecodeError as e:
            print(f"Erro ao decodificar JSON: {e}")
            return None
    else:
        print("Não foi possível encontrar START_LIST e END_LIST na string.")
        return None