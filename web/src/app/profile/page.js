"use client"; // Indica que este é um componente do lado do cliente

import React, { useEffect, useState } from 'react'; // Importa React e hooks
import { useRouter } from 'next/navigation'; // Importa o hook useRouter para navegação entre páginas
import ModalUser from '@/components/ModalUser'; // Importa o novo componente ModalUser
import Header from '@/components/Header';

export default function Profile() {
  const [user, setUser] = useState(null); // Estado para armazenar os dados do usuário
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar se o modal está aberto ou fechado
  const router = useRouter(); // Hook de navegação

  useEffect(() => {
    const userData = localStorage.getItem('user'); // Obtém os dados do usuário do localStorage
    if (userData) {
      setUser(JSON.parse(userData)); // Converte os dados de string para objeto e armazena no estado
    }
  }, []);

  const handleEditClick = () => {
    setIsModalOpen(true); // Abre o modal ao clicar no botão de editar
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md text-center">
          <h1 className="text-2xl font-bold mb-4">Perfil do Usuário</h1>
          {user ? (
            <>
              <p className="text-lg mb-2"><strong>Nome:</strong> {user.username}</p>
              <p className="text-lg mb-2"><strong>Email:</strong> {user.email}</p>
            </>
          ) : (
            <p className="text-lg">Nenhum dado de usuário encontrado.</p>
          )}
          <button
            onClick={handleEditClick}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Editar Perfil
          </button>
        </div>
        {/* Componente Modal para editar informações do usuário */}
        {user && ( /* Verifica se existe um usuário antes de passar para o modal */
          <ModalUser
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            userId={user.id}
          />
        )}
      </div>
    </>
  );
}