import React from 'react';
import { Bell, User, ChevronDown } from 'lucide-react';

const UserCard = () => {
  return (
    <div className="flex items-center justify-between border border-[#193254] bg-[#101c2c] px-3 rounded-[6px] text-[#ffffff] whitespace-nowrap w-full h-[54px] overflow-hidden">
      <div className="flex items-center gap-2 border-r border-[#193254] pr-3 min-w-0">
        <span className="text-[10px] text-[#757575] font-medium uppercase tracking-tight shrink-0">Connected</span>
        <div className="w-[5px] h-[5px] rounded-full bg-[#23df68] shadow-[0_0_5px_#23df68] shrink-0"></div>
        <span className="text-[12px] font-medium tracking-tight truncate">123-456-7 (Cash Balance)</span>
      </div>
      
      <div className="flex items-center gap-3 shrink-0 ml-2">
        <button className="text-[#757575] hover:text-[#ffffff] transition-colors">
          <Bell size={16} />
        </button>
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="w-[24px] h-[24px] rounded-full bg-[#193254] flex items-center justify-center overflow-hidden border border-[#193254]">
            <User size={14} className="text-[#757575] group-hover:text-[#ffffff]" />
          </div>
          <span className="text-[12px] font-medium group-hover:text-[#1479dd] transition-colors">User Name</span>
          <ChevronDown size={14} className="text-[#757575]" />
        </div>
      </div>
    </div>
  );
};

export default UserCard;
