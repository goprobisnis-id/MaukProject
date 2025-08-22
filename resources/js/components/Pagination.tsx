import React from 'react';
import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationData {
    current_page: number;
    data: any[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

interface PaginationProps {
    data: PaginationData;
    className?: string;
}

export default function Pagination({ data, className = '' }: PaginationProps) {
    if (!data || data.last_page <= 1) {
        return null;
    }

    const getPageNumbers = () => {
        const pages = [];
        const currentPage = data.current_page;
        const lastPage = data.last_page;
        
        // Always show first page
        if (currentPage > 3) {
            pages.push(1);
            if (currentPage > 4) {
                pages.push('...');
            }
        }
        
        // Show pages around current page
        const start = Math.max(1, currentPage - 2);
        const end = Math.min(lastPage, currentPage + 2);
        
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        
        // Always show last page
        if (currentPage < lastPage - 2) {
            if (currentPage < lastPage - 3) {
                pages.push('...');
            }
            pages.push(lastPage);
        }
        
        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className={`flex items-center justify-between bg-white border-t border-gray-200 px-6 py-4 ${className}`}>
            {/* Results info */}
            <div className="flex-1 flex justify-between sm:hidden mr-3">
                <span className="text-sm text-gray-700">
                    Menampilkan {data.from} - {data.to} dari {data.total} hasil
                </span>
            </div>
            
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700 mr-3">
                        Menampilkan{' '}
                        <span className="font-medium">{data.from}</span>
                        {' '}sampai{' '}
                        <span className="font-medium">{data.to}</span>
                        {' '}dari{' '}
                        <span className="font-medium">{data.total}</span>
                        {' '}hasil
                    </p>
                </div>
                
                <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        {/* Previous button */}
                        {data.prev_page_url ? (
                            <Link
                                href={data.prev_page_url}
                                className="relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-[#579D3E] transition-colors duration-200"
                            >
                                <span className="sr-only">Previous</span>
                                <ChevronLeft className="h-4 w-4" />
                            </Link>
                        ) : (
                            <span className="relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 bg-gray-100 text-sm font-medium text-gray-400 cursor-not-allowed">
                                <ChevronLeft className="h-4 w-4" />
                            </span>
                        )}
                        
                        {/* Page numbers */}
                        {pageNumbers.map((page, index) => {
                            if (page === '...') {
                                return (
                                    <span
                                        key={`ellipsis-${index}`}
                                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                                    >
                                        <MoreHorizontal className="h-4 w-4" />
                                    </span>
                                );
                            }
                            
                            const isActive = page === data.current_page;
                            const pageUrl = `${data.path}?page=${page}`;
                            
                            return isActive ? (
                                <span
                                    key={page}
                                    className="relative inline-flex items-center px-4 py-2 border border-[#579D3E] bg-[#579D3E] text-sm font-medium text-white cursor-default"
                                >
                                    {page}
                                </span>
                            ) : (
                                <Link
                                    key={page}
                                    href={pageUrl}
                                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-[#579D3E] hover:border-[#579D3E] transition-colors duration-200"
                                >
                                    {page}
                                </Link>
                            );
                        })}
                        
                        {/* Next button */}
                        {data.next_page_url ? (
                            <Link
                                href={data.next_page_url}
                                className="relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-[#579D3E] transition-colors duration-200"
                            >
                                <span className="sr-only">Next</span>
                                <ChevronRight className="h-4 w-4" />
                            </Link>
                        ) : (
                            <span className="relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 bg-gray-100 text-sm font-medium text-gray-400 cursor-not-allowed">
                                <ChevronRight className="h-4 w-4" />
                            </span>
                        )}
                    </nav>
                </div>
            </div>
            
            {/* Mobile pagination */}
            <div className="flex-1 flex justify-between sm:hidden">
                {data.prev_page_url ? (
                    <Link
                        href={data.prev_page_url}
                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 hover:text-[#579D3E] transition-colors duration-200"
                    >
                        Sebelumnya
                    </Link>
                ) : (
                    <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-400 bg-gray-100 cursor-not-allowed">
                        Sebelumnya
                    </span>
                )}
                
                {data.next_page_url ? (
                    <Link
                        href={data.next_page_url}
                        className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 hover:text-[#579D3E] transition-colors duration-200"
                    >
                        Selanjutnya
                    </Link>
                ) : (
                    <span className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-400 bg-gray-100 cursor-not-allowed">
                        Selanjutnya
                    </span>
                )}
            </div>
        </div>
    );
}
