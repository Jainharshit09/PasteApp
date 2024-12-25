import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const initialState = {
    pastes:localStorage.getItem("pastes") ? JSON.parse(localStorage.getItem("pastes")) : [],
};

const pasteSlice = createSlice({
    name: 'pastes',
    initialState,
    reducers: {
        addToPastes: (state,actions) => {
            const pastes = actions.payload;
            state.pastes.push(pastes);
            localStorage.setItem("pastes",
                JSON.stringify(state.pastes)
            );
            toast.success('Paste created successfully');
        },

        resetAllPastes: (state,actions) => {
            state.pastes = [];
            localStorage.removeItem("pastes");
        },
        updateToPastes: (state, actions) => {
            const updatedPaste = actions.payload;
            const index = state.pastes.findIndex((paste) => paste._id === updatedPaste._id);
            if (index >= 0) {
              state.pastes[index] = updatedPaste;
              localStorage.setItem('pastes', JSON.stringify(state.pastes));
            }
            toast.success('Paste Updated successfully');
          },
        
        removeFromPastes: (state,actions) => {
            const pasteId = actions.payload;
            console.log(pasteId);
            state.pastes = state.pastes.filter((p) => p._id !== pasteId);
            localStorage.setItem("pastes",
                JSON.stringify(state.pastes)
            );
            toast.success('Paste Deleted ');
        },
    },
});

export const { addToPastes, resetAllPastes, updateToPastes, removeFromPastes} = pasteSlice.actions;

export default pasteSlice.reducer;