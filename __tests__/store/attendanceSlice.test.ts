import attendanceReducer, {
    checkIn,
    checkOut,
    getAttendance,
  } from '../../src/app/slice/attendanceSlice';
  
  import axios from 'axios';
  
  jest.mock('axios');
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  
  describe('attendance slice tests', () => {
    let initialState: any;
  
    beforeEach(() => {
      initialState = {
        checkIns: {},
        loading: false,
        error: null,
      };
    });
  
    it('should handle checkIn.fulfilled', async () => {
      const payload = { id: 10, staff_id: 5 };
      mockedAxios.post.mockResolvedValue({ data: { data: payload } });
  
      const result = await checkIn(5)(jest.fn(), () => initialState, undefined);
  
      const newState = attendanceReducer(initialState, {
        type: checkIn.fulfilled.type,
        payload: result.payload,
      });
  
      expect(newState.checkIns[5]).toBe(10);
    });
  
    it('should handle checkIn.rejected', async () => {
      mockedAxios.post.mockRejectedValue({
        response: { data: { message: 'Error checking in' } },
      });
  
      const result = await checkIn(5)(jest.fn(), () => initialState, undefined);
  
      const newState = attendanceReducer(initialState, {
        type: checkIn.rejected.type,
        payload: result.payload,
      });
  
      expect(newState.error).toBe('Error checking in');
    });
  
    it('should handle checkOut.fulfilled', async () => {
      const payload = { id: 20, staff_id: 7 };
      mockedAxios.post.mockResolvedValue({ data: { data: payload } });
  
      initialState.checkIns = { 7: 20 }; 
  
      const result = await checkOut({ attendance_id: 20 })(
        jest.fn(),
        () => initialState,
        undefined,
      );
  
      const newState = attendanceReducer(initialState, {
        type: checkOut.fulfilled.type,
        payload: result.payload,
      });
  
      expect(newState.checkIns[7]).toBeUndefined();
    });
  
    it('should handle checkOut.rejected', async () => {
      mockedAxios.post.mockRejectedValue({
        response: { data: { message: 'Error checking out' } },
      });
  
      const result = await checkOut({ attendance_id: 20 })(
        jest.fn(),
        () => initialState,
        undefined,
      );
  
      const newState = attendanceReducer(initialState, {
        type: checkOut.rejected.type,
        payload: result.payload,
      });
  
      expect(newState.error).toBe('Error checking out');
    });
  
    it('should handle getAttendance.fulfilled', async () => {
      const responseData = [
        { id: 1, staff_id: 100 },
        { id: 2, staff_id: 200 },
      ];
  
      mockedAxios.get.mockResolvedValue({ data: { data: responseData } });
  
      const result = await getAttendance()(jest.fn(), () => initialState, undefined);
  
      const newState = attendanceReducer(initialState, {
        type: getAttendance.fulfilled.type,
        payload: result.payload,
      });
  
      expect(newState.checkIns).toEqual({
        100: 1,
        200: 2,
      });
    });
  
    it('should handle getAttendance.rejected', async () => {
      mockedAxios.get.mockRejectedValue({
        response: { data: { message: 'Failed to fetch' } },
      });
  
      const result = await getAttendance()(jest.fn(), () => initialState, undefined);
  
      const newState = attendanceReducer(initialState, {
        type: getAttendance.rejected.type,
        payload: result.payload,
      });
  
      expect(newState.error).toBe('Failed to fetch');
    });
  });
  