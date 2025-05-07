import React from "react";

interface PlaceholderPageProps {
  title: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="text-center max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-gray-600 mb-4">
          This feature is currently under development and will be available
          soon.
        </p>
        <div className="w-full h-2 bg-blue-100 rounded-full overflow-hidden mt-6">
          <div className="bg-blue-500 h-full w-1/3 rounded-full"></div>
        </div>
        <p className="text-sm text-gray-500 mt-2">Development in progress</p>
      </div>
    </div>
  );
};

export default PlaceholderPage;
