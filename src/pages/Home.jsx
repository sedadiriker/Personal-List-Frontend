import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [personals, setpersonals] = useState([]);

  const getPersonal = async () => {
    const URL = "http://127.0.0.1:8000/api/personallists/";

    try {
      const { data } = await axios.get(URL);
      setpersonals(data);
    } catch (error) {
      if (error.response) {
        // Sunucu yanıtı varsa
        console.error("Sunucu Hatası:", error.response.data);
        console.error("Durum Kodu:", error.response.status);
        console.error("Başlıklar:", error.response.headers);
      } else if (error.request) {
        // İstek yapıldı ama yanıt alınamadı
        console.error("İstek Yapıldı, Yanıt Alınamadı:", error.request);
      } else {
        // Diğer hatalar
        console.error("Hata:", error.message);
      }
    }
  };

  useEffect(() => {
    getPersonal();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Personal List</h1>
      <table className="min-w-full">
        <thead>
          <tr className=" bg-gray-200">
            <th className="py-2 px-4 border border-1 border-gray-400">
              Firstname
            </th>
            <th className="py-2 px-4 border border-1 border-gray-400">
              Lastname
            </th>
            <th className="py-2 px-4 border border-1 border-gray-400">Email</th>
            <th className="py-2 px-4 border border-1 border-gray-400">
              Position
            </th>
          </tr>
        </thead>
        <tbody>
          {personals.map(({id, firstname, lastname, email, position }) => (
            <tr key={id} className="border-b border-gray-300">
              <td className="py-2 px-4 border border-gray-300">
                {firstname}
              </td>
              <td className="py-2 px-4 border border-gray-300">
                {lastname}
              </td>
              <td className="py-2 px-4 border border-gray-300">
                {email}
              </td>
              <td className="py-2 px-4 border border-gray-300">
                {position}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
