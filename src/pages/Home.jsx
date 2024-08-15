import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete, MdEdit } from "react-icons/md";
import Button from "../components/Button";

const URL = `${process.env.REACT_APP_API_URL}`;

const Home = () => {
  const [personals, setpersonals] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newPerson, setNewPerson] = useState({
    firstname: "",
    lastname: "",
    email: "",
    position: "",
  });

  console.log(isAdding)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPerson((prev) => ({ ...prev, [name]: value }));
  };

  const addPerson = async () => {
    try {
      await axios.post(`${URL}`, newPerson, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      await getPersonal();
      setIsAdding(false); 
      setNewPerson({
        firstname: "",
        lastname: "",
        email: "",
        position: "",
      });
    } catch (error) {
      console.error("Hata:", error.message);
    }
  };

  const DeletePerson = async (id) => {
    try {
      await axios.delete(`${URL}${id}`);
      await getPersonal();
    } catch (error) {
      console.error(error);
    }
  };

  const getPersonal = async () => {
    try {
      const { data } = await axios.get(URL);
      setpersonals(data);
    } catch (error) {
      console.error("Hata:", error.message);
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
            <th className="py-2 px-4 border border-1 border-gray-400">Firstname</th>
            <th className="py-2 px-4 border border-1 border-gray-400">Lastname</th>
            <th className="py-2 px-4 border border-1 border-gray-400">Email</th>
            <th className="py-2 px-4 border border-1 border-gray-400">Position</th>
            <th className="py-2 px-4 border border-1 border-gray-400"></th>
          </tr>
        </thead>
        <tbody>
          {personals?.map(({ id, firstname, lastname, email, position }) => (
            <tr key={id} className="border-b border-gray-300">
              <td className="py-2 px-4 border border-gray-300">{firstname}</td>
              <td className="py-2 px-4 border border-gray-300">{lastname}</td>
              <td className="py-2 px-4 border border-gray-300">{email}</td>
              <td className="py-2 px-4 border border-gray-300">{position}</td>
              <td className="py-2 px-4 border border-gray-300 flex justify-center gap-2">
                <Button onClick={() => DeletePerson(id)} butonName={<MdDelete />} />
                <Button butonName={<MdEdit />} />
              </td>
            </tr>
          ))}
          {isAdding && (
            <tr className="border-b border-gray-300">
              <td className="py-2 px-4 border border-gray-300">
                <input
                  type="text"
                  name="firstname"
                  value={newPerson.firstname}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </td>
              <td className="py-2 px-4 border border-gray-300">
                <input
                  type="text"
                  name="lastname"
                  value={newPerson.lastname}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </td>
              <td className="py-2 px-4 border border-gray-300">
                <input
                  type="email"
                  name="email"
                  value={newPerson.email}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </td>
              <td className="py-2 px-4 border border-gray-300">
                <input
                  type="text"
                  name="position"
                  value={newPerson.position}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </td>
              <td className="py-2 px-4 border border-gray-300 flex justify-center gap-2">
                <Button onClick={addPerson} butonName="✔️" />
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {!isAdding && (
        <Button
          onClick={() => setIsAdding(true)}
          butonName={"Add Person"}
          className="my-4"
        />
      )}
    </div>
  );
};

export default Home;
