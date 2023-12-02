/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedTopic : {
    name : "All",
    id : null
  }
};

export const ArticlesPageSlice = createSlice({
    name: 'ArticlesPageSlice',
    initialState,
    reducers: {
        selectTopic: (state, action) => {
        state.selectedTopic.name = action.payload.name;
        state.selectedTopic.id = action.payload.id;
      },
  
      removeTopic: (state, action) => {
        state.selectedTopic.name = "";
        state.selectedTopic.topic = null;        
      }
  
    }
  });
  
  export default ArticlesPageSlice.reducer;
export const { selectTopic, removeTopic } = ArticlesPageSlice.actions;