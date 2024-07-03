import React from 'react';
import {Button, Text, TextInput} from 'react-native-paper';
import {View} from 'react-native';
import {useFormik} from 'formik';
import firestore from '@react-native-firebase/firestore';

export const NewExpenseScreen = ({navigation}) => {
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: () => {
      firestore()
        .collection('categories')
        .add({
          name: formik.values.name,
        })
        .then(() => {
          navigation.goBack();
        })
        .catch(error => {
          console.error('Error adding document: ', error);
        });
    },
  });

  return (
    <View style={{marginHorizontal: 16}}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: 'bold',
          paddingBottom: 20,
          paddingTop: 10,
        }}>
        კატეგორიის სახელწოდება
      </Text>
      <TextInput
        label="სახელწოდება"
        value={formik.values.name}
        onChangeText={text => formik.setFieldValue('name', text)}
      />

      <Button
        mode="contained"
        disabled={formik.values.name.trim() !== '' ? false : true}
        onPress={() => formik.handleSubmit()}
        style={{marginTop: 40}}>
        შენახვა
      </Button>
    </View>
  );
};
