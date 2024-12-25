import { Calendar, Copy, Eye, PencilLine, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react"; // Import useState
import { removeFromPastes } from "../redux/pasteSlice";
import { FormatDate } from "../utils/formatDate"; // Import the FormatDate function

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState(""); // State to hold the search term

  const handleDelete = (id) => {
    dispatch(removeFromPastes(id));
  };

  // Filter pastes based on search term (by title or content)
  const filteredPastes = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
      <div className="flex flex-col gap-y-3">
        {/* Search */}
        <div className="w-full flex gap-3 px-6 py-2 rounded-[0.8rem] border-2 border-indigo-400  mt-6">
          <input
            type="search"
            placeholder="Search paste here..."
            className="focus:outline-none w-full bg-transparent text-lg "
            value={searchTerm} // Bind the input to searchTerm state
            onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
          />
        </div>

        {/* All Pastes */}
        <div className="flex flex-col border-2 border-indigo-500 py-4 rounded-[0.6rem] mt-4">
          <h2 className="px-4 text-4xl font-bold border-b border-[#243c5e] pb-4">
            All Pastes
          </h2>
          <div className="w-full px-3 pt-4 flex flex-col gap-y-5">
            {filteredPastes.length > 0 ? (
              filteredPastes.map((paste) => (
                <div
                  key={paste?._id}
                  className=" border-4 border-white-200 w-full gap-y-5 justify-between flex flex-col sm:flex-row p-3 rounded-[0.3rem]"
                >
                  {/* heading and Description */}
                  <div className="w-[50%] flex flex-col space-y-3">
                    <p className="text-2xl font-semibold p-2 text-start indent-3.5 capitalize ">{paste?.title}</p>
                    <p className=" text-sm font-normal text-[#0891b2] line-clamp-1 max-w-[18%] ">
                      {paste?.content}
                    </p>
                  </div>

                  {/* icons */}
                  <div className="flex flex-col gap-y-4 sm:items-end">
                    <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                    <button
                              className="p-2 rounded-[0.2rem]  border-2 border-[#c7c7c7]  hover:bg-black group hover:border-blue-500"
                             
                              >
                                 <a href={`/?pasteId=${paste?._id}`} >
                              <PencilLine
                                className="text-white group-hover:text-blue-500"
                                size={20}
                              />
                              </a>
                              </button>
                      <button
                        className="p-2 rounded-[0.2rem]  border-2 border-[#c7c7c7]  hover:bg-black group hover:border-red-500"
                        onClick={() => handleDelete(paste?._id)}
                      >
                        <Trash2
                          className="text-white group-hover:text-red-500"
                          size={20}
                        />
                      </button>

                      <button className="p-2 rounded-[0.2rem]  border-2 border-[#c7c7c7]  hover:bg-black group hover:border-purple-500">
                        <a href={`/pastes/${paste?._id}`} target="_blank" rel="noopener noreferrer">
                          <Eye
                            className="text-white group-hover:text-purple-500"
                            size={20}
                          />
                        </a>
                      </button>
                      <button
                        className="p-2 rounded-[0.2rem]  border-2 border-[#c7c7c7]  hover:bg-black group hover:border-green-500"
                        onClick={() => {
                          navigator.clipboard.writeText(paste?.title)
                            .then(() => {
                              toast.success("Copied to Clipboard");
                            })
                            .catch(() => {
                              toast.error("Not Copied");
                            });
                        }}
                      >
                        <Copy
                          className="text-white group-hover:text-green-500"
                          size={20}
                        />
                      </button>
                    </div>

                    <div className="gap-x-2 flex ">
                      <Calendar className="text-white-500  hover:bg-transprent group hover:text-blue-500" size={20} />
                      {FormatDate(paste?.createdAt)}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-2xl text-center w-full text-chileanFire-500">
                No Data Found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paste;
