import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state for the queue (an empty array)
const initialState: HTMLAudioElement[] = [];

// Create a slice for the audio queue
const audioQueueSlice = createSlice({
    name: 'audioQueue',
    initialState,
    reducers: {
        // Action to add an audio element to the queue
        enqueueAudio: (state, action: PayloadAction<any>) => {
            // Create a new array with the new audio element
            return [...state, action.payload];
        },
        // Action to remove the first audio element from the queue
        dequeueAudio: (state) => {
            if (state.length > 0) {
                // Create a new array without the first audio element
                state[0].pause();
                return state.slice(1);
            }
            return state; // Return the original state if the queue is empty
        },
    },
});

// Export action creators
export const { enqueueAudio, dequeueAudio } = audioQueueSlice.actions;

// Export the reducer function
export default audioQueueSlice.reducer;


