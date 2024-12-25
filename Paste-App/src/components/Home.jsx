import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const Home = () => {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get('pasteId');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pastes = useSelector((state) => state.paste.pastes);

  // On pasteId change (edit mode), fetch the existing paste details
  useEffect(() => {
    if (pasteId) {
      const existingPaste = pastes.find((paste) => paste._id === pasteId);
      if (existingPaste) {
        setTitle(existingPaste.title);
        setValue(existingPaste.content);
      }
    }
  }, [pasteId, pastes]);

  const createPaste = () => {
    if (!title) {
      toast.error('Please fill Title details', { duration: 2000 });
      return;
    }
  
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };
  
    if (pasteId) {
      // If editing an existing paste, skip the title check
      dispatch(updateToPastes(paste));  // Update the paste
    } else {
      // If creating a new paste
      const checking = pastes.find((paste) => paste.title === title);
      if (checking) {
        toast.error('Title already exists', { duration: 2000 });
        return;
      }
      dispatch(addToPastes(paste));  // Create new paste
    }
  
    // Reset the input fields and search params after creating/updating
    setTitle('');
    setValue('');
    setSearchParams({});
    navigate(`/pastes`);
  };
  

  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
      <div className="flex flex-col gap-y-5 items-start">
        <div className="w-full flex flex-row gap-x-4 justify-between items-center">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`${
              pasteId ? 'w-[80%]' : 'w-[85%]'
            } text-white border border-input rounded-md p-2`}
          />
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700"
            onClick={createPaste}
          >
            {pasteId ? 'Update Paste' : 'Create Paste'}
          </button>
        </div>
        <textarea
          className="w-full h-[500px] p-5 rounded-lg border border-white-300"
          placeholder="Paste your text here"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Home;
