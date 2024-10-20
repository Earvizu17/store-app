'use client'
import { useState, useEffect } from 'react';

// Define an interface for your media item
interface Media {
  title: string;
  author: string;
  year: number;
  type: string;
}

export default function HomePage() {
  const [mediaList, setMediaList] = useState<Media[]>([]); // Specify the type here
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null); // Specify type or null

  // Load the JSON data on component mount
  useEffect(() => {
    fetch('/store.json')
      .then((response) => response.json())
      .then((data) => setMediaList(data));
  }, []);

  const handleClick = (index: number) => {
    setSelectedMedia(mediaList[index]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Interesting Media List</h1>
      <ul className="list-disc ml-6">
        {mediaList.map((media, index) => (
          <li
            key={index}
            onClick={() => handleClick(index)}
            className="cursor-pointer hover:text-blue-500"
          >
            {media.title}
          </li>
        ))}
      </ul>

      {selectedMedia && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-100">
          <h2 className="text-xl font-semibold">{selectedMedia.title}</h2>
          <p><strong>Author:</strong> {selectedMedia.author}</p>
          <p><strong>Year:</strong> {selectedMedia.year}</p>
          <p><strong>Type:</strong> {selectedMedia.type}</p>
        </div>
      )}
    </div>
  );
}
