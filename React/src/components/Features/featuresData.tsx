import { Feature } from "@/types/feature";
import { CloudArrowUpIcon, SparklesIcon, ExclamationTriangleIcon, MagnifyingGlassIcon, LockClosedIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";

const featuresData: Feature[] = [
  {
    id: 1,
    icon: <CloudArrowUpIcon className="w-10 h-10 text-indigo-500" />,
    title: "Easy Book Uploading",
    paragraph:
      "Users can upload books in PDF format with details like title, author, category, and description."
  },
  {
    id: 2,
    icon: <SparklesIcon className="w-10 h-10 text-green-500" />,
    title: "AI-Based Book Recommendations",
    paragraph:
      "System suggests books to users based on their reading history and preferences."
  },
  {
    id: 3,
    icon: <ExclamationTriangleIcon className="w-10 h-10 text-yellow-500" />,
    title: "Duplicate Book Detection",
    paragraph:
      "System checks if the same file already exists and prevents duplicate uploads."
  },
  {
    id: 4,
    icon: <MagnifyingGlassIcon className="w-10 h-10 text-blue-500" />,
    title: "Smart Book Search",
    paragraph:
      "Users can search for books using keywords, categories, or authors to quickly find desired titles."
  },
  {
    id: 5,
    icon: <LockClosedIcon className="w-10 h-10 text-red-500" />,
    title: "Secure PDF Reading & Downloading",
    paragraph:
      "Users can read and download books in PDF format securely, ensuring content protection and privacy."
  },
  {
    id: 6,
    icon: <Cog6ToothIcon className="w-10 h-10 text-purple-500" />,
    title: "Admin Control Panel",
    paragraph:
      "Administrators have access to a control panel to manage users, content, and system settings efficiently."
  },
];

export default featuresData;
