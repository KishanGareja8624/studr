import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

interface AlertProps {
  text: string;
  action: string;
}

const Alert: React.FC<AlertProps> = ({ text, action }) => (
  <div className="flex items-start p-2 bg-white border-b hover:bg-gray-100 transition-colors duration-300">
    <ExclamationCircleIcon className="h-5 w-5 text-red-500 mt-1" />
    <div className="ml-3">
      <div className="graytext font-medium">{text}</div>
      <div className="text-sm graytext">{action}</div>
    </div>
  </div>
);

export default Alert;
