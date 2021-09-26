import { createSlice } from "@reduxjs/toolkit";

const simulationStateSlice = createSlice({
  name: "simulation state",
  initialState: "Not started yet",
  reducers: {
    setSimulationState(_state, action) {
      return action.payload.simulationState;
    },
  },
});

export const { setSimulationState } = simulationStateSlice.actions;

export default simulationStateSlice.reducer;
