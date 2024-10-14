import React from 'react';
import Link from 'next/link';

interface MenuItem {
  path: string;
  solidIcon: React.ReactNode;
  outlineIcon: React.ReactNode;
  title: string;
}

function MenuLink({
  item,
  isSelected,
  onClick,
}: {
  item: MenuItem;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <Link 
      href={item.path} 
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-full mt-2`}
    >
      <div className={`${isSelected ? '!bg-black text-white' : 'bg-[#ffffff]'} hover:bg-hihlightsidebar bg-white border border-gray-300  w-12 h-12 flex justify-center items-center hover:scale-110 rounded-[10px] transition-colors duration-200`}>
        {isSelected ? item.solidIcon : item.outlineIcon}
      </div>
      {/* <div className="w-full">
        <span className="flex justify-center text-xs mt-1 font-medium">{item.title}</span>
      </div> */}
    </Link>
  );
}

export default MenuLink;
