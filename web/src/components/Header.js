"use client"; // Indica que este é um componente do lado do cliente

import { useEffect, useState } from 'react'; // Importa hooks do React para gerenciar estado e efeitos colaterais
import { useRouter } from 'next/navigation'; // Importa o hook useRouter para navegação entre páginas

const Header = () => {
  const [user, setUser] = useState(null); // Estado para armazenar os dados do usuário
  const router = useRouter(); // Hook de navegação

  useEffect(() => {
    const userData = localStorage.getItem('user'); // Obtém os dados do usuário do localStorage
    if (userData) {
      setUser(JSON.parse(userData)); // Converte os dados de string para objeto e armazena no estado
    }
  }, []);

  const handleProfileClick = () => {
    router.push('/profile'); // Redireciona para a página de perfil ao clicar no botão/link
  };

  const handleDashboardClick = () => {
    router.push('/dashboard'); // Redireciona para a página de dashboard ao clicar no link
  };

  return (
    <header className="w-full bg-gray-800 text-white flex justify-between items-center p-4">
      <div>
        {user ? (
          <span>Bem-vindo, {user.username}!</span> // Exibe o nome do usuário se estiver logado
        ) : (
          <span>Bem-vindo!</span> // Mensagem padrão se não houver usuário logado
        )}
      </div>
      <div className="flex gap-4"> {/* Adiciona espaço entre os botões */}
        <button
          onClick={handleProfileClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Perfil
        </button>
        <button
          onClick={handleDashboardClick} // Adiciona o novo botão para navegar ao dashboard
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Dashboard
        </button>
      </div>
    </header>
  );
};

export default Header;