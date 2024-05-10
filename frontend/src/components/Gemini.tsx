import { useState } from 'react';
function GeminiPrompt({ fetchTasksFromAPI }: { fetchTasksFromAPI: (prompt: string, apiKey: string) => Promise<void> }) {
  const [prompt, setPrompt] = useState('');
  const [api_key,setApiKey] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    // Call the new function to fetch tasks
    await fetchTasksFromAPI(prompt, api_key);

    // Clear the input fields
    setPrompt('');
    setApiKey('');
  };

  return (
    <div>
      <h2>Interaja com o Gemini</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          
          name='prompt'
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Digite seu prompt"
        />
        <input
          type="text"
          name='api'
          value={api_key}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Digite sua chave API gemini"
        />
        <button type="submit">Enviar</button>
      </form>
      
    </div>
  );
}

export default GeminiPrompt;