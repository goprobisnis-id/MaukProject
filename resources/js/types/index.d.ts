import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}
// Kategori
export interface Kategori {
    id: number;
    nama: string;
}

// ProdukImage
export interface ProdukImage {
    id: number;
    produk_id: number;
    image: string;
    created_at?: string;
    updated_at?: string;
}

// ProdukSize
export interface ProdukSize {
    id: number;
    produk_id: number;
    size: string;
    created_at?: string;
    updated_at?: string;
}

// ProdukColor
export interface ProdukColor {
    id: number;
    produk_id: number;
    color_name: string;
    hex_code: string;
    created_at?: string;
    updated_at?: string;
}

// Produk
export interface Produk {
    id: number;
    nama_produk: string;
    harga: number;
    kategori_id: number;
    kategori?: Kategori;
    first_image: string | null;
    link_shopee?: string;
    link_tokped?: string;
    short_desc?: string;
    long_desc?: string;
    jumlah_pembelian: number;
    images?: ProdukImage[];
    sizes?: ProdukSize[];
    colors?: ProdukColor[];
    created_at?: string;
    updated_at?: string;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}
