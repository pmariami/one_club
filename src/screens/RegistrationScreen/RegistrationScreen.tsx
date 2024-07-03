import {FormikProvider, useFormik} from 'formik';
import React, {FC} from 'react';
import {Switch, View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import * as Yup from 'yup';
import {MainStackParamsList} from '../../navigation/types';
import {StackScreenProps} from '@react-navigation/stack';

const SignupSchema = Yup.object().shape({
  phoneNumber: Yup.number()
    .test('len', 'Max 9 numbers', val => val.toString().length === 9)
    .required('Required'),
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  password: Yup.string().required('Required'),
  repeatPassword: Yup.string()
    // @ts-ignore
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
  policies: Yup.boolean().oneOf([true], 'Please accept policies'),
});

export const RegistrationScreen: FC<StackScreenProps<MainStackParamsList>> = ({
  navigation,
}) => {
  const formik = useFormik({
    initialValues: {
      phoneNumber: '',
      firstName: '',
      lastName: '',
      password: '',
      repeatPassword: '',
      policies: false,
    },
    onSubmit: () => {
      navigation.navigate('ExpensesCategoriesScreen');
    },
    validationSchema: SignupSchema,
  });

  return (
    <View style={{padding: 16}}>
      <FormikProvider value={formik}>
        <TextInput
          label="მობილურის ნომერი"
          value={formik.values.phoneNumber}
          onChangeText={text => formik.setFieldValue('phoneNumber', text)}
          error={
            formik.errors.phoneNumber && formik.touched.phoneNumber
              ? true
              : false
          }
        />
        <Text>
          {formik.errors.phoneNumber && formik.touched.phoneNumber
            ? formik.errors.phoneNumber
            : null}
        </Text>
        <TextInput
          label="სახელი"
          value={formik.values.firstName}
          onChangeText={text => formik.setFieldValue('firstName', text)}
          error={
            formik.errors.firstName && formik.touched.firstName ? true : false
          }
        />
        <Text>
          {formik.errors.firstName && formik.touched.firstName
            ? formik.errors.firstName
            : null}
        </Text>
        <TextInput
          label="გვარი"
          value={formik.values.lastName}
          onChangeText={text => formik.setFieldValue('lastName', text)}
          error={
            formik.errors.lastName && formik.touched.lastName ? true : false
          }
        />
        <Text>
          {formik.errors.lastName && formik.touched.lastName
            ? formik.errors.lastName
            : null}
        </Text>
        <TextInput
          label="პაროლი"
          value={formik.values.password}
          onChangeText={text => formik.setFieldValue('password', text)}
          error={
            formik.errors.password && formik.touched.password ? true : false
          }
          secureTextEntry
        />
        <Text>
          {formik.errors.password && formik.touched.password
            ? formik.errors.password
            : null}
        </Text>
        <TextInput
          label="გაიმეორე პაროლი"
          value={formik.values.repeatPassword}
          onChangeText={text => formik.setFieldValue('repeatPassword', text)}
          error={
            formik.errors.repeatPassword && formik.touched.repeatPassword
              ? true
              : false
          }
          secureTextEntry
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Text>ვეთანხმები წესებს და პირობებს</Text>
          <Switch
            style={{marginLeft: 10}}
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={formik.values.policies ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => {
              formik.setFieldValue('policies', !formik.values.policies);
            }}
            value={formik.values.policies}
          />
        </View>
        <Text style={{color: 'red'}}>
          {formik.errors.policies && formik.touched.policies
            ? formik.errors.policies
            : null}
        </Text>
        <Button
          style={{marginTop: 20}}
          mode="contained"
          onPress={() => formik.handleSubmit()}>
          რეგისტრაცია
        </Button>
      </FormikProvider>
    </View>
  );
};
