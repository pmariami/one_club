import {StackScreenProps} from '@react-navigation/stack';
import {useFormik} from 'formik';
import React, {FC} from 'react';
import {Text, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import * as Yup from 'yup';
import {MainStackParamsList} from '../../navigation/types';

const LoginSchema = Yup.object().shape({
  phoneNumber: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

export const LoginScreen: FC<StackScreenProps<MainStackParamsList>> = ({
  navigation,
}) => {
  const formik = useFormik({
    initialValues: {
      phoneNumber: '',
      password: '',
    },
    onSubmit: () => {
      navigation.navigate('ExpensesCategoriesScreen');
    },
    validationSchema: LoginSchema,
  });

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TextInput
        label="მობილურის ნომერი"
        value={formik.values.phoneNumber}
        onChangeText={text => formik.setFieldValue('phoneNumber', text)}
      />
      <Text>
        {formik.errors.phoneNumber && formik.touched.phoneNumber
          ? formik.errors.phoneNumber
          : null}
      </Text>
      <TextInput
        label="პაროლი"
        value={formik.values.password}
        onChangeText={text => formik.setFieldValue('password', text)}
        secureTextEntry
      />
      <Text>
        {formik.errors.password && formik.touched.password
          ? formik.errors.password
          : null}
      </Text>
      <Button mode="contained" onPress={() => formik.handleSubmit()}>
        შესვლა
      </Button>
      <Button
        mode="text"
        onPress={() => navigation.navigate('RegistrationScreen')}>
        რეგისტრაცია
      </Button>
    </View>
  );
};
