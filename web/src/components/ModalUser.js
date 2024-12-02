"use client"; // Indica que este é um componente do lado do cliente

import { useEffect, useState } from 'react'; // Importa hooks do React
import { useRouter } from 'next/navigation'; // Importa o hook useRouter para navegação entre páginas

const ModalUser = ({ isOpen, onClose, userId }) => {
  const [username, setUsername] = useState(''); // Inicializa o estado para o nome
  const [email, setEmail] = useState(''); // Inicializa o estado para o email
  const router = useRouter(); // Hook de navegação

  useEffect(() => {
    if (isOpen) {
      fetchUser(); // Busca os dados do usuário quando o modal está aberto
    }
  }, [isOpen]); // Executa quando o modal é aberto

  const fetchUser = async () => {
    const response = await fetch(`http://localhost:3000/api/users/${userId}`); // Busca os dados do usuário da API
    if (response.ok) {
      const userData = await response.json();
      setUsername(userData.username); // Preenche o campo de nome
      setEmail(userData.email); // Preenche o campo de email
    } else {
      console.error('Erro ao buscar dados do usuário');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Impede o comportamento padrão do formulário

    const updatedUser = { username, email }; // Cria um objeto com os dados atualizados

    const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
      method: 'PUT', // Método PUT para atualizar os dados
      headers: {
        'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
      },
      body: JSON.stringify(updatedUser), // Converte os dados para JSON e envia no corpo da requisição
    });

    if (response.ok) {
      const updatedData = await response.json();
      localStorage.setItem('user', JSON.stringify(updatedData)); // Atualiza os dados no localStorage
      onClose(); // Fecha o modal após salvar
      router.push('/profile'); // Redireciona para a página de perfil após salvar
    } else {
      console.error('Erro ao atualizar dados do usuário');
    }
  };

  if (!isOpen) return null; // Se o modal não estiver aberto, retorna "null"

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Editar Usuário</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Atualiza o nome ao digitar
            placeholder="Nome"
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Atualiza o email ao digitar
            placeholder="Email"
            className="p-2 border border-gray-300 rounded"
            required
          />
          <button type="submit" className="bg-blue-500 text-white rounded py-2">Salvar</button>
        </form>

        <button onClick={onClose} className="mt-4 text-red-500">Fechar</button>
      </div>
    </div>
  );
};

export default ModalUser;