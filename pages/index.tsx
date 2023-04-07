import React, { useState } from "react";
import { GrTrash } from "react-icons/gr";

export default function Home() {
  const [names, setNames] = useState([
    { id: 1, firstname: "Iron", surname: "Man" },
    { id: 2, firstname: "Spider", surname: "Man" },
    { id: 3, firstname: "Incredible", surname: "Hulk" },
  ]);

  const [firstname, setFirstname] = useState("");
  const [surname, setSurname] = useState("");

  function handleFirstnameChange(event: {
    target: { value: React.SetStateAction<string> };
  }) {
    setFirstname(event.target.value);
  }

  function handleSurnameChange(event: {
    target: { value: React.SetStateAction<string> };
  }) {
    setSurname(event.target.value);
  }

  function handleAddItem(event: { preventDefault: () => void }) {
    //stop the page from reloading
    event.preventDefault();

    //get the next available id
    const nextId = Math.max(...names.map((person) => person.id)) + 1;

    //create the next item for the array
    const newName = { id: nextId, firstname: firstname, surname: surname };

    //add this new item to tht e
    setNames([...names, newName]);

    setFirstname("");
    setSurname("");
  }

  function handleRemoveItem(id: number) {
    setNames((people) => people.filter((person) => person.id !== id));
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-5 justify-center min-h-screen from-[#F9F5F3] via-[#F9F5F3] to-[#F9F5F3] bg-gradient-to-br px-2">
        <div className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="max-w-md mx-auto">
            <div className="p-4 sm:p-6">
              <p className="font-bold text-gray-700 text-[22px] leading-7 mb-1">
                Add a person to the list
              </p>

              <div className="mt-5">
                <form onSubmit={handleAddItem}>
                  <div className="bg-white flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:shadow-inner">
                    <input
                      type="text"
                      name="firstname"
                      id="firstname"
                      value={firstname}
                      onChange={handleFirstnameChange}
                      className="peer block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0 outline-none"
                      placeholder="First name"
                    />
                    <label className="block transform text-xs font-bold uppercase text-gray-400 transition-opacity, duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0">
                      First name
                    </label>
                  </div>

                  <div className="bg-white flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:shadow-inner mt-3">
                    <input
                      type="text"
                      name="surname"
                      id="surname"
                      value={surname}
                      onChange={handleSurnameChange}
                      className="peer block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0 outline-none"
                      placeholder="Surname"
                    />
                    <label className="block transform text-xs font-bold uppercase text-gray-400 transition-opacity, duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0">
                      Surname
                    </label>
                  </div>
                </form>
              </div>

              <a
                target="_blank"
                href="foodiesapp://food/1001"
                className="block mt-5 w-full px-4 py-3 font-medium tracking-wide text-center capitalize transition-colors duration-300 transform bg-[#FFC933] rounded-[14px] hover:bg-[#FFC933DD] focus:outline-none "
                onClick={handleAddItem}
              >
                Add to list
              </a>
            </div>
          </div>
        </div>

        <div className="w-full max-w-md  mx-auto bg-white rounded-3xl shadow-xl overflow-hidden mb-5">
          <div className="max-w-md mx-auto">
            <div className="p-4 sm:p-6">
              <p className="font-bold text-gray-700 text-[22px] leading-7 mb-1">
                People on the list
              </p>

              <div className="grid grid-cols-1 gap-4 mt-5">
                {names.map((person) => (
                  <div
                    key={person.id}
                    className="grid grid-cols-2 gap-4 p-4 rounded-md border border-gray-300"
                  >
                    <div>
                      <h2 className="text-lg font-bold">
                        {person.firstname} {person.surname}
                      </h2>
                    </div>
                    <div className="flex justify-end">
                      <div
                        className="flex items-center space-x-2 cursor-pointer"
                        onClick={() => handleRemoveItem(person.id)}
                      >
                        <GrTrash></GrTrash>
                        <span>Delete</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
