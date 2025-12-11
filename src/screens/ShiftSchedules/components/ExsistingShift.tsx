import React from 'react';
import AnimatedCard from '../../../components/common/AnimatedCard';
import ShiftCard from './ShiftCard';
import { deleteShift } from '../../../app/slice/shiftSlice';
import { RootState, AppDispatch } from '../../../app/store';
import { styles } from '../styles/ExsistingShift.style';
import { useSelector, useDispatch } from 'react-redux';
import { View, FlatList } from 'react-native';

const ExsistingShift: React.FC<any> = () => {
  const { shifts } = useSelector((state: RootState) => state.shift);
  const dispatch = useDispatch<AppDispatch>();
  const handleDelete = (id: number) => {
    dispatch(deleteShift({ id }));
  };
  return (
    <View style={styles.container}>
      <AnimatedCard>
      <FlatList
        data={shifts}
        renderItem={({ item }) => (
          <ShiftCard shift={item} onDelete={() => handleDelete(item.id)} />
        )}
        keyExtractor={(_, index) => index.toString()}
      />
      </AnimatedCard>
    </View>
  );
};

export default ExsistingShift;
