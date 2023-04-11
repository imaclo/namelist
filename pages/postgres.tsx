import React, { useState, useEffect } from "react";
import { GrTrash } from "react-icons/gr";
import { GrFormNextLink } from "react-icons/gr";

export default function Postgres() {
  const [names, setNames] = useState(null);

  const [firstname, setFirstname] = useState("");
  const [surname, setSurname] = useState("");

  useEffect(() => {
    const data = { func: "all" };

    fetch(
      "https://exmf2c3qlrry4bwulhkhji6txa0jizyw.lambda-url.eu-west-2.on.aws/",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setNames(data);
      });
  }, [names]);

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

  async function handleAddItem(event: { preventDefault: () => void }) {
    //stop the page from reloading
    event.preventDefault();

    const json = { func: "insert", firstname: firstname, surname: surname };

    const response = await fetch(
      "https://exmf2c3qlrry4bwulhkhji6txa0jizyw.lambda-url.eu-west-2.on.aws/",
      {
        method: "POST",
        body: JSON.stringify(json),
      }
    );
    const resp = await response.json();

    setNames(null);
    setFirstname("");
    setSurname("");
  }

  async function handleRemoveItem(id: number) {
    const json = { func: "delete", id: id };

    const response = await fetch(
      "https://exmf2c3qlrry4bwulhkhji6txa0jizyw.lambda-url.eu-west-2.on.aws/",
      {
        method: "POST",
        body: JSON.stringify(json),
      }
    );
    const resp = await response.json();

    setNames(null);
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-5 justify-center min-h-screen from-[#F9F5F3] via-[#F9F5F3] to-[#F9F5F3] bg-gradient-to-br px-2 ">
        <div className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-xl overflow-hidden  mb-10 mt-4">
          <div className="max-w-md mx-auto">
            <div className="p-4 sm:p-6">
              <p className="font-bold text-gray-700 text-[22px] leading-7 mb-1">
                Add a person to the list (Postgres data)
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
                href="#"
                className="block mt-5 w-full px-4 py-3 font-medium tracking-wide text-center capitalize transition-colors duration-300 transform bg-[#FFC933] rounded-[14px] hover:bg-[#FFC933DD] focus:outline-none "
                onClick={handleAddItem}
              >
                Add to list
              </a>

              <a
                target="_self"
                href="/"
                className="block mt-10 w-full px-4 py-3 font-medium tracking-wide text-center capitalize transition-colors duration-300 transform bg-[#d4d4d4] rounded-[14px] hover:bg-[#343434dd] focus:outline-none "
              >
                <div className="flex justify-end">
                  <div className="flex items-center space-x-2 cursor-pointer">
                    <span>Static version</span>
                    <GrFormNextLink></GrFormNextLink>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="w-full max-w-md  mx-auto bg-white rounded-3xl shadow-xl overflow-hidden  mb-10 mt-4">
          <div className="max-w-md mx-auto">
            <div className="p-4 sm:p-6">
              <p className="font-bold text-gray-700 text-[22px] leading-7 mb-1">
                People on the list
              </p>

              {names && (
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
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
