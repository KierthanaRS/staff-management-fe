import React from 'react';
import { View, FlatList } from 'react-native';
import { RootState, AppDispatch } from '../../../app/store';
import { useSelector, useDispatch } from 'react-redux';
import { deleteShift } from '../../../app/slice/shiftSlice';
import { styles } from '../styles/ExsistingShift.style';
import ShiftCard from './ShiftCard';

const ExsistingShift: React.FC<any> = () => {
  const { shifts } = useSelector((state: RootState) => state.shift);
  const dispatch = useDispatch<AppDispatch>();
  const handleDelete = (id: number) => {
    dispatch(deleteShift({ id }));
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={shifts}
        renderItem={({ item }) => (
          <ShiftCard shift={item} onDelete={() => handleDelete(item.id)} />
        )}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
};

export default ExsistingShift;
