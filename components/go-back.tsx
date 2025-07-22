'use client';

import { ChevronLeft } from 'lucide-react';

interface IGoBackProps {
  label?: string;
  href?: string;
}

export default function GoBack({ label, href }: IGoBackProps) {
  return (
    <a
      className="fixed w-6 hover:w-full overflow-hidden group flex top-10 left-10 cursor-pointer duration-200 transition-all rounded-full"
      href={href || '/dashboard'}
    >
      <ChevronLeft className="bg-white z-10" />
      <p className={`pr-3 absolute transition-all duration-200 -left-40 group-hover:left-6`}>
        {label || 'Dashboard'}
      </p>
    </a>
  );
}
