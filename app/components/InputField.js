import React from 'react';
import * as Icons from 'react-icons/fa';

const InputField = ({ icon, ...props }) => {
  const IconComponent = Icons[icon];

  return (
    <div className="relative mb-6">
      <IconComponent className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#4cd681] text-xl" />
      <input
        {...props}
        className="w-full p-4 pl-12 text-lg bg-white border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-[#4cd681]/20 focus:border-[#4cd681] outline-none transition-all duration-300 hover:border-[#4cd681]"
      />
    </div>
  );
};

export default InputField;