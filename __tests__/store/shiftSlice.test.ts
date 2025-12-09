import shiftReducer, {
    fetchShifts,
    createShift,
    deleteShift,
    clearShiftError,
  } from "../../src/app/slice/shiftSlice"
  
  import axios from "axios";
  jest.mock("axios");
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  
  describe("Shift Slice Tests", () => {
    let initialState: any;
  
    beforeEach(() => {
      initialState = {
        shifts: [],
        selectedShift: null,
        loading: false,
        status: "idle",
      };
    });
  
    it("should handle fetchShifts.fulfilled", async () => {
      const mockShifts = [
        { id: 1, shift_name: "Morning" },
        { id: 2, shift_name: "Night" },
      ];
  
      mockedAxios.get.mockResolvedValue({ data: { data: mockShifts } });
  
      const result = await fetchShifts()(jest.fn(), () => initialState, undefined);
  
      const newState = shiftReducer(initialState, {
        type: fetchShifts.fulfilled.type,
        payload: result.payload,
      });
  
      expect(newState.shifts).toEqual(mockShifts);
      expect(newState.status).toBe("success");
      expect(newState.loading).toBe(false);
    });
  
    it("should handle fetchShifts.rejected", async () => {
      mockedAxios.get.mockRejectedValue({
        response: { data: { message: "Error fetching" } },
      });
  
      const result = await fetchShifts()(jest.fn(), () => initialState, undefined);
  
      const newState = shiftReducer(initialState, {
        type: fetchShifts.rejected.type,
        payload: result.payload,
      });
  
      expect(newState.status).toBe("error");
      expect(newState.loading).toBe(false);
    });

    it("should handle fetchShifts.pending", () => {
      const newState = shiftReducer(initialState, {
        type: fetchShifts.pending.type,
      });
    
      expect(newState.loading).toBe(true);
      expect(newState.status).toBe("loading");
    });    
  
    it("should handle createShift.fulfilled", async () => {
      const newShift = { id: 3, shift_name: "Evening" };
  
      mockedAxios.post.mockResolvedValue({ data: { data: newShift } });
  
      const result = await createShift(newShift as any)(
        jest.fn(),
        () => initialState,
        undefined
      );
  
      const newState = shiftReducer(initialState, {
        type: createShift.fulfilled.type,
        payload: result.payload,
      });
  
      expect(newState.shifts.length).toBe(1);
      expect(newState.shifts[0]).toEqual(newShift);
      expect(newState.status).toBe("success");
    });
  
    it("should handle createShift.rejected", async () => {
      mockedAxios.post.mockRejectedValue({
        response: { data: { message: "Error creating shift" } },
      });
  
      const result = await createShift({ shift_name: "Morning" , start_time: '11:00', end_time: '12:00',shift_days:['Mon'] },)(
        jest.fn(),
        () => initialState,
        undefined
      );
  
      const newState = shiftReducer(initialState, {
        type: createShift.rejected.type,
        payload: result.payload,
      });
  
      expect(newState.status).toBe("error");
    });

    it("should handle createShift.pending", () => {
      const newState = shiftReducer(initialState, {
        type: createShift.pending.type,
      });
    
      expect(newState.loading).toBe(true);
      expect(newState.status).toBe("loading");
    });
    
  
    it("should handle deleteShift.fulfilled", async () => {
      initialState.shifts = [
        { id: 1, shift_name: "Morning" },
        { id: 2, shift_name: "Night" },
      ];
  
      mockedAxios.delete.mockResolvedValue({});
  
      const result = await deleteShift({ id: 1 })(
        jest.fn(),
        () => initialState,
        undefined
      );
  
      const newState = shiftReducer(initialState, {
        type: deleteShift.fulfilled.type,
        payload: result.payload,
      });
  
      expect(newState.shifts.length).toBe(1);
      expect(newState.shifts[0].id).toBe(2);
      expect(newState.status).toBe("success");
    });
  
    it("should handle deleteShift.rejected", async () => {
      mockedAxios.delete.mockRejectedValue({
        response: { data: { message: "Failed to delete shift" } },
      });
  
      const result = await deleteShift({ id: 99 })(
        jest.fn(),
        () => initialState,
        undefined
      );
  
      const newState = shiftReducer(initialState, {
        type: deleteShift.rejected.type,
        payload: result.payload,
      });
  
      expect(newState.status).toBe("error");
    });

    it("should handle deleteShift.pending", () => {
      const newState = shiftReducer(initialState, {
        type: deleteShift.pending.type,
      });
    
      expect(newState.loading).toBe(true);
      expect(newState.status).toBe("loading");
    });    
  
    it("should clear shift error", () => {
      initialState.status = "error";
  
      const newState = shiftReducer(initialState, clearShiftError());
  
      expect(newState.status).toBe("idle");
    });
  });
  