import React, {FC} from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';

type Props = {
  value: {
    [key: string]: any;
  };
  onChange: (value: any) => void;
  style: any;
  records: {
    name: string;
    id: string;
  }[];
  label: string;
};

export const Select: FC<Props> = ({value, onChange, style, records, label}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TextInput
        label={label}
        value={value.name}
        onChangeText={onChange}
        style={style}
        onFocus={() => setOpen(true)}
      />
      <Modal visible={open}>
        <View
          style={{
            marginVertical: 40,
            marginTop: 100,
            paddingHorizontal: 16,
            flex: 1,
          }}>
          <FlatList
            data={records}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  onChange(item);
                  setOpen(false);
                }}>
                <View style={styles.container}>
                  <Text
                    style={[
                      styles.text,
                      {color: item.id === value.id ? 'green' : 'black'},
                    ]}>
                    {item.name}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
          <Button mode="contained" onPress={() => setOpen(false)}>
            დახურვა
          </Button>
        </View>
      </Modal>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    backgroundColor: '#efefef',
    borderWidth: 1,
    justifyContent: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    height: 40,
    textAlignVertical: 'center',
    lineHeight: 40,
    paddingLeft: 10,
  },
});
