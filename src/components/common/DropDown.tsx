import React, { useState} from 'react';
import { DropDownProps } from '../../types';
import { dropDownStyles } from '../styles/DropDown.styles';
import { useAppLayout } from '../../hooks/useAppLayout';
import { View, Text , TouchableOpacity, Modal, FlatList, Platform} from 'react-native';

const DropDown: React.FC<DropDownProps> = ({
  label,
  selectedValue,
  onValueChange,
  items,
  placeholder = 'Select an option',
  error,
}) => {
  const [visible, setVisible] = useState(false);
  const { isDesktop } = useAppLayout();
  const selectedLabel =items.find(item => item.value === selectedValue)?.label || placeholder;
  const handleSelect = (value: string) => {
    setVisible(false);
    onValueChange(value);
  };
  return (
    <View style={dropDownStyles.container}>
      {label && <Text style={dropDownStyles.label}>{label}</Text>}
      <TouchableOpacity
        style={dropDownStyles.inputBox}
        onPress={() => setVisible(true)}
      >
        <Text
          style={[
            dropDownStyles.inputText,
            !selectedValue && dropDownStyles.placeholder,
          ]}
        >
          {selectedLabel}
        </Text>
      </TouchableOpacity>
      {error && <Text style={dropDownStyles.errorText}>{error}</Text>}
      <Modal
        visible={visible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setVisible(false)}
      >
        <View style={[dropDownStyles.modalOverlay, isDesktop && dropDownStyles.modalOverlayDesktop]}>
          <View
            style={[
              dropDownStyles.modalContent,
              isDesktop && dropDownStyles.modalContentDesktop,
              Platform.OS === 'android' && dropDownStyles.androidCentered,
            ]}
          >
            <Text style={[dropDownStyles.modalTitle, isDesktop && dropDownStyles.modalTitleDesktop]}>{label}</Text>

            <FlatList
              data={items}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[dropDownStyles.option, isDesktop && dropDownStyles.optionDesktop]}
                  onPress={() => handleSelect(item.value)}
                >
                  <Text style={dropDownStyles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity
              onPress={() => setVisible(false)}
              style={dropDownStyles.cancelButton}
            >
              <Text style={dropDownStyles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DropDown;
