'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface QuizCardProps {
  title: string;
  description: string;
  time: string;
  buttonText: string;
  buttonRoute: string;
  imageSrc: string;
}

export default function QuizCard({
  title,
  description,
  time,
  buttonText,
  buttonRoute,
  imageSrc,
}: QuizCardProps) {
  const router = useRouter();

  return (
    <div className="max-w-sm bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col gap-3">
      <div className="rounded-lg overflow-hidden h-40 relative">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>

      <div className="flex items-center justify-between mt-2">
        <span className="text-sm text-gray-500">
          Estimated time: <span className="font-medium">{time}</span>
        </span>
        <button
          onClick={() => router.push(buttonRoute)}
          className="bg-green-700 hover:bg-green-800 text-white text-sm font-medium px-4 py-2 rounded-md transition"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
