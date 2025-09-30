import React from "react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({currentPage, totalPages, onPageChange}) => {
    const renderPageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 5;

        if (totalPages > 0) pages.push(1);

        let start = Math.max(2, currentPage - Math.floor(maxPagesToShow/2) + 1);
        let end = Math.min(totalPages - 1, currentPage + Math.floor(maxPagesToShow/2) - 1);

        if (currentPage <= Math.ceil(maxPagesToShow/2)){
            end = Math.min(totalPages - 1, maxPagesToShow);
        } else if (currentPage > totalPages - Math.ceil(maxPagesToShow/2)){
            start = Math.max(2, totalPages - maxPagesToShow + 1);
        }

        //Add reticence before if necessary
        if (start > 2){
            pages.push("...");
        }

        for (let i = start; i <= end; i++){
            if (i !== 1 && i !== totalPages){
                pages.push(i);
            }
        }

        //Add reticence after if necessary
        if (end < totalPages - 1){
            pages.push("...");
        }

        if (totalPages > 1 && pages[pages.length - 1] !== totalPages) pages.push(totalPages)

        //Special case if had few bottons
        if (totalPages <= maxPagesToShow){
            return Array.from({length: totalPages}, (_,i) => i + 1);
        }

        return pages;
    }
 return (
   <div className="flex justify-center items-center mt-6">    
        
        {/* Pages number */}
        {renderPageNumbers().map((page, index) => {
            if (typeof page === 'string'){
                return <span key={index} className="px-3 py-1 text-gray-500">...</span>
            }
            const isActive = page === currentPage;
            return (
                <button key={index} onClick={() => onPageChange(page)} className={`px-3 py-1 text-sm rounded-sm transition-colors ${isActive ? 'bg-orange-500 text-white font-bold border-orange-500' : 'font-bold text-gray-700 hover:bg-gray-100'}`}>
                    {page}
                </button>
            )
        })}

   </div>
 );
}