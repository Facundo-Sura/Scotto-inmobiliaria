'use client';

import React from 'react';
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

interface WhatsAppButtonProps {
  itemTitulo?: string;
  itemTipo?: 'propiedad' | 'vehiculo';
  phoneNumber?: string;
  className?: string;
  isFixed?: boolean;
}

export default function WhatsAppButton({ 
  itemTitulo, 
  itemTipo, 
  phoneNumber = '+5493547570838',
  className = '',
  isFixed = false 
}: WhatsAppButtonProps) {
  const generateWhatsAppMessage = () => {
    if (!itemTitulo || !itemTipo) {
      return encodeURIComponent('Hola, quiero saber más sobre tus servicios');
    }
    
    const tipoTexto = itemTipo === 'propiedad' ? 'propiedad' : 'vehículo';
    return encodeURIComponent(
      `Hola, me interesó la ${tipoTexto} "${itemTitulo}". ¿Podría darme más información?`
    );
  };

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${generateWhatsAppMessage()}`;
  const baseClasses = isFixed 
    ? 'fixed bottom-6 right-6 bg-green-500 p-4 rounded-full shadow-lg hover:bg-green-600 transition'
    : 'bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-300 flex items-center justify-center gap-2';

  return (
    <Link
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseClasses} ${className}`}
    >
      {isFixed ? (
        <FaWhatsapp size={30} color="white" />
      ) : (
        <>
          <FaWhatsapp size={20} />
          Más información por WhatsApp
        </>
      )}
    </Link>
  );
}


