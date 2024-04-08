import React, { useEffect } from "react";

// Componente para mostrar los mensajes relacionados con un apartamento
const Messages = ({ flatId }) => {
  useEffect(() => {
    const getMessages = async () => {
      // Lógica para obtener los mensajes
    };

    getMessages();
  }, [flatId]);

  return <div>Messages</div>;
};

export default Messages;
