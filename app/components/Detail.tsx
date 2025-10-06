"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

export interface Detail {
    id: number;
    titulo: string;
    descripcion: string;
    precio: number;
    tipo: string;
    caracteristicas: string[];
    imagen: string;
}