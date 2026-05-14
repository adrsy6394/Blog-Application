"use client";

import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = React.memo(({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  const pages = [];
  let start = Math.max(1, currentPage - 2);
  let end = Math.min(totalPages, start + 4);
  
  if (end - start < 4) {
    start = Math.max(1, end - 4);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center items-center space-x-4 mt-20 mb-20">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-6 py-3 glass rounded-none text-[10px] font-bold uppercase tracking-widest text-white hover:bg-white/10 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
      >
        Prev
      </button>
      
      <div className="hidden sm:flex space-x-3">
        {pages.map(page => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-12 h-12 flex items-center justify-center rounded-none text-xs font-bold transition-all ${
              currentPage === page
                ? 'bg-white text-[#0f172a]'
                : 'glass text-white/40 hover:text-white hover:bg-white/5'
            }`}
          >
            {page.toString().padStart(2, '0')}
          </button>
        ))}
      </div>
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-6 py-3 glass rounded-none text-[10px] font-bold uppercase tracking-widest text-white hover:bg-white/10 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
      >
        Next
      </button>
    </div>
  );
});

Pagination.displayName = 'Pagination';
export default Pagination;
