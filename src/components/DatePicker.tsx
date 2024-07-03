import moment from 'moment';
import React, {useRef} from 'react';
import RNDatePicker from 'react-native-date-picker';
import {TextInput} from 'react-native-paper';
import type {TextInput as TextInputType} from 'react-native';
import {StyleProp, TextStyle} from 'react-native/types';

type DatePickerProps = {
  value: Date;
  onChange: (date: Date) => void;
  style: StyleProp<TextStyle>;
};

export const DatePicker = ({value, onChange, style}: DatePickerProps) => {
  const [open, setOpen] = React.useState(false);
  const inputRef = useRef<TextInputType>();

  return (
    <>
      <TextInput
        ref={(ref: TextInputType) => (inputRef.current = ref)}
        onFocus={() => setOpen(true)}
        caretHidden
        showSoftInputOnFocus={false}
        value={moment(value).format('DD/MM/YYYY')}
        style={style}
      />
      <RNDatePicker
        modal
        open={open}
        date={value}
        onConfirm={date => {
          onChange(date);
          setOpen(false);
          inputRef.current?.blur();
        }}
      />
    </>
  );
};
