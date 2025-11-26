import React from 'react';
import { FlatList } from 'react-native';
import { RootState } from '../../../app/store';
import { styles } from '../styles/ExsistingShift.style';
import { useSelector, useDispatch } from 'react-redux';
import ShiftCard from './ShiftCard';

const ExsistingShift: React.FC<any> = () => {
  const { shifts } = useSelector((state: RootState) => state.shift);
  const handleDelete = (id: number) => {
    console.log(id);
  };
  return (
    <FlatList
      data={shifts}
      renderItem={({ item }) => (
        <ShiftCard shift={item} onDelete={() => handleDelete(item.id)} />
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default ExsistingShift;
