"use client"; // Para indicar que este é um componente do lado do cliente

import { useState, useEffect } from 'react'; // Importa hooks do React para gerenciar estado e efeitos colaterais
import Modal from '@/components/Modal'; // Importa o componente de modal
import FadingText from '@/components/FadingText'; // Importa o componente que exibe textos com efeito de fade
import Header from '@/components/Header'; // Importa o novo componente Header

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [editingPhoto, setEditingPhoto] = useState(null);

  const texts = [
    'Capture momentos incríveis! 📸',
    'Compartilhe suas memórias com a galeria! 🌟'
  ];

  useEffect(() => {
    fetchPhotos(); // Carrega as fotos ao iniciar o componente
  }, []);

  const fetchPhotos = async () => {
    const response = await fetch('http://localhost:3000/api/photos');
    if (response.ok) {
      const data = await response.json();
      setPhotos(data);
    } else {
      console.error('Erro ao buscar fotos');
    }
  };

  const handleOpenModal = (photo) => {
    setEditingPhoto(photo);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPhoto(null);
  };

  const handleAddPhoto = async (formData) => {
    const response = await fetch('http://localhost:3000/api/photos', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      fetchPhotos();
      handleCloseModal();
    } else {
      console.error('Erro ao adicionar foto');
    }
  };

  const handleEditPhoto = async (formData) => {
    const response = await fetch(`http://localhost:3000/api/photos/${editingPhoto.id}`, {
      method: 'PUT',
      body: formData,
    });

    if (response.ok) {
      fetchPhotos();
      handleCloseModal();
    } else {
      console.error('Erro ao editar foto');
    }
  };

  const handleDeletePhoto = async (id) => {
    const response = await fetch(`http://localhost:3000/api/photos/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      fetchPhotos();
    } else {
      console.error('Erro ao deletar foto');
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-8 text-center">
        <h1 className="text-4xl font-bold text-foreground">Sua Galeria de Fotos</h1>
        <FadingText texts={texts} />
        <button
          onClick={() => handleOpenModal(null)}
          className="bg-blue-500 text-white rounded-lg py-2 px-4 shadow hover:bg-blue-600 transition"
        >
          Criar Nova Foto
        </button>
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={editingPhoto ? handleEditPhoto : handleAddPhoto}
          photo={editingPhoto}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 w-full max-w-screen-md">
          {photos.map(photo => (
            <div key={photo.id} className="border rounded-lg p-4 shadow">
              <img src={`http://localhost:3000/uploads/${photo.url}`} alt={photo.title} className="rounded mb-2" />
              <h3 className="font-bold">{photo.title}</h3>
              <div className="flex justify-between mt-2">
                <button onClick={() => handleOpenModal(photo)} className="bg-blue-500 text-white rounded-lg py-1 px-3 hover:bg-blue-600 transition">
                  Editar
                </button>
                <button onClick={() => handleDeletePhoto(photo.id)} className="bg-red-500 text-white rounded-lg py-1 px-3 hover:bg-red-600 transition">
                  Deletar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}