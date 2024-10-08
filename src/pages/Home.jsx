import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete, MdEdit } from "react-icons/md";
import Button from "../components/Button";

const URL = `${process.env.REACT_APP_API_URL}`

const HEADERS = {
  "Content-Type": "application/json",
  "apikey": process.env.REACT_APP_SUPABASE_ANON_KEY
};

const Home = () => {
  const [personals, setPersonals] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newPerson, setNewPerson] = useState({
    firstname: "",
    lastname: "",
    email: "",
    position: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPerson((prev) => ({ ...prev, [name]: value }));
  };

  const addPerson = async () => {
    try {
      await axios.post(URL, newPerson, { headers: HEADERS });
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

  const updatePerson = async () => {
    try {
      await axios.patch(`${URL}?id=eq.${editingId}`, newPerson, { headers: HEADERS });
      await getPersonal();
      setEditingId(null);
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

  const deletePerson = async (id) => {
    try {
      await axios.delete(`${URL}?id=eq.${id}`, { headers: HEADERS });
      await getPersonal();
    } catch (error) {
      console.error("Hata:", error.message);
    }
  };

  const getPersonal = async () => {
    try {
      const { data } = await axios.get(URL, { headers: HEADERS });
      setPersonals(data);
    } catch (error) {
      console.error("Hata:", error.message);
    }
  };

  useEffect(() => {
    getPersonal();
  }, []);

  const startEditing = (person) => {
    setNewPerson(person);
    setEditingId(person.id);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Personal List</h1>
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border border-1 border-gray-400">Firstname</th>
            <th className="py-2 px-4 border border-1 border-gray-400">Lastname</th>
            <th className="py-2 px-4 border border-1 border-gray-400">Email</th>
            <th className="py-2 px-4 border border-1 border-gray-400">Position</th>
            <th className="py-2 px-4 border border-1 border-gray-400"></th>
          </tr>
        </thead>
        <tbody>
          {personals?.map((person) => (
            <tr key={person.id} className="border-b border-gray-300">
              {editingId === person.id ? (
                <>
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
                    <Button onClick={updatePerson} butonName="✔️" />
                    <Button
                      onClick={() => {
                        setEditingId(null);
                        setNewPerson({
                          firstname: "",
                          lastname: "",
                          email: "",
                          position: "",
                        });
                      }}
                      butonName="❌"
                    />
                  </td>
                </>
              ) : (
                <>
                  <td className="py-2 px-4 border border-gray-300">{person.firstname}</td>
                  <td className="py-2 px-4 border border-gray-300">{person.lastname}</td>
                  <td className="py-2 px-4 border border-gray-300">{person.email}</td>
                  <td className="py-2 px-4 border border-gray-300">{person.position}</td>
                  <td className="py-2 px-4 border border-gray-300 flex justify-center gap-2">
                    <Button onClick={() => deletePerson(person.id)} butonName={<MdDelete />} />
                    <Button onClick={() => startEditing(person)} butonName={<MdEdit />} />
                  </td>
                </>
              )}
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
                <Button onClick={() => setIsAdding(false)} butonName="X" className="text-red-700" />
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {!isAdding && !editingId && (
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
