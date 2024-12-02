"use client"; // Indica que este é um componente do lado do cliente, que será executado no navegador

import { useState, useEffect } from 'react'; // Importa os hooks useState e useEffect do React

// Definição do componente Modal
export default function Modal({ isOpen, onClose, onSubmit, photo }) {
  const [title, setTitle] = useState(''); // Inicializa o título da foto como uma string vazia
  const [imageFile, setImageFile] = useState(null); // Estado para armazenar o arquivo da imagem
  const [userId, setUserId] = useState(3); // Define o ID do usuário, inicialmente com valor fixo 3 (substituir por ID real)

  // useEffect é executado toda vez que o valor de "photo" mudar
  useEffect(() => {
    if (photo) {
      setTitle(photo.title); // Define o título com o valor de photo.title
      setUserId(photo.userId); // Define o ID do usuário com o valor de photo.userId
    } else {
      setTitle('');
      setUserId(3); // Resetando para o ID padrão quando for adicionar nova foto
    }
  }, [photo]); // O useEffect depende de "photo"

  // Função de envio do formulário, chamada ao submeter o formulário
  const handleSubmit = (e) => {
    e.preventDefault(); // Impede o comportamento padrão do formulário

    if (!imageFile) {
      return alert('Por favor, selecione uma imagem para upload.'); // Verifica se a imagem foi selecionada
    }

    const formData = new FormData(); // Cria um novo objeto FormData para enviar os dados
    formData.append('title', title); // Adiciona o título ao FormData
    formData.append('image', imageFile); // Adiciona a imagem ao FormData
    formData.append('userId', userId); // Adiciona o ID do usuário ao FormData

    onSubmit(formData); // Chama a função onSubmit passando os dados do formulário
    onClose(); // Fecha o modal após o envio dos dados
  };

  if (!isOpen) return null; // Se o modal não estiver aberto, retorna "null"

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-4">{photo ? 'Editar Foto' : 'Adicionar Nova Foto'}</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Campo de entrada para o título da foto */}
          <input
            type="text"
            placeholder="Título da Foto"
            value={title}
            onChange={(e) => setTitle(e.target.value)} // Atualiza o título ao digitar
            className="p-2 border border-gray-300 rounded"
            required
          />
          {/* Campo para upload da imagem */}
          <input
            type="file"
            accept="image/*" // Aceita apenas arquivos de imagem
            onChange={(e) => setImageFile(e.target.files[0])} // Atualiza o estado com o arquivo selecionado
            className="p-2 border border-gray-300 rounded"
            required
          />
          {/* Botão para submeter o formulário */}
          <button type="submit" className="bg-blue-500 text-white rounded py-2">Salvar</button>
        </form>

        {/* Botão para fechar o modal sem fazer alterações */}
        <button onClick={onClose} className="mt-4 text-red-500">Fechar</button>
      </div>
    </div>
  );
}