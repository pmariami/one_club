import React, {FC, useEffect} from 'react';
import {Button, Text, TextInput} from 'react-native-paper';
import {useFormik} from 'formik';
import {ScrollView} from 'react-native-gesture-handler';
import {DatePicker} from '../../components/DatePicker';
import firestore from '@react-native-firebase/firestore';
import {StackScreenProps} from '@react-navigation/stack';
import {MainStackParamsList} from '../../navigation/types';
import {Select} from '../../components/Select';
import StarRating from 'react-native-star-rating-widget';
import {StyleSheet, View} from 'react-native';

const companyData = [
  {
    name: 'Tegeta',
    id: '1',
  },
  {
    name: 'Ambol',
    id: '2',
  },
  {
    name: 'Gulf',
    id: '3',
  },
  {
    name: 'Winto',
    id: '4',
  },
  {
    name: 'Wissol',
    id: '5',
  },
];

const oilAllowingData = [
  {
    name: '5x40',
    id: '1',
  },
  {
    name: '5x30',
    id: '2',
  },
  {
    name: '0x16',
    id: '3',
  },
  {
    name: '15x40',
    id: '4',
  },
];

export const AddExpenseScreen: FC<
  StackScreenProps<MainStackParamsList, 'AddExpenseScreen'>
> = ({route, navigation}) => {
  const formik = useFormik({
    initialValues: {
      amount: '',
      companyName: {
        label: '',
        value: '',
      },
      date: new Date(),
      companyRating: 0,
      comment: '',
      oilAllowing: {
        label: '',
        value: '',
      },
      oilAmount: '',
    },
    onSubmit: () => {
      if (route.params?.expenseId) {
        firestore()
          .collection('categories')
          .doc(route.params?.categoryId)
          .collection('expenses')
          .doc(route.params?.expenseId)
          .update(formik.values)
          .then(() => {
            navigation.goBack();
          });
      } else {
        firestore()
          .collection('categories')
          .doc(route.params?.categoryId)
          .collection('expenses')
          .add(formik.values)
          .then(() => {
            navigation.goBack();
          });
      }
    },
  });

  useEffect(() => {
    if (route.params?.expenseId) {
      firestore()
        .collection('categories')
        .doc(route.params?.categoryId)
        .collection('expenses')
        .doc(route.params?.expenseId)
        .get()
        .then(doc => {
          const data = {
            ...doc.data(),
            date: doc.data()?.date.toDate(),
          };
          // @ts-ignore
          formik.setValues(data ?? {});
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params?.categoryId, route.params?.expenseId]);

  return (
    <ScrollView style={{marginHorizontal: 16}}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: 'bold',
          paddingBottom: 20,
          paddingTop: 10,
        }}>
        კატეგორიის დასახელება
      </Text>
      <Select
        label="კომპანიის დასახელება"
        value={formik.values.companyName}
        onChange={value => formik.setFieldValue('companyName', value)}
        style={{marginBottom: 20}}
        records={companyData}
      />
      <DatePicker
        onChange={date => {
          formik.setFieldValue('date', date);
        }}
        value={formik.values.date}
        style={{marginBottom: 20}}
      />
      <TextInput
        label="ხარჯის ღირებულება"
        value={formik.values.amount}
        onChangeText={text => formik.setFieldValue('amount', text)}
        style={{marginBottom: 20}}
      />
      {route.params.oil ? (
        <>
          <Select
            label="ზეთის დაშვება"
            value={formik.values.oilAllowing}
            onChange={text => formik.setFieldValue('oilAllowing', text)}
            style={{marginBottom: 20}}
            records={oilAllowingData}
          />
          <TextInput
            label="ზეთის ლიტრაჟი"
            value={formik.values.oilAmount}
            onChangeText={text => formik.setFieldValue('oilAmount', text)}
            style={{marginBottom: 20}}
          />
        </>
      ) : null}
      <View style={{marginBottom: 20}}>
        <StarRating
          rating={formik.values.companyRating}
          onChange={value => formik.setFieldValue('companyRating', value)}
        />
      </View>
      <TextInput
        label="კომენტარი"
        value={formik.values.comment}
        onChangeText={text => formik.setFieldValue('comment', text)}
        style={{marginBottom: 20}}
      />
      <Button
        mode="contained"
        disabled={formik.values.amount.trim() !== '' ? false : true}
        onPress={() => formik.handleSubmit()}
        style={{marginTop: 40}}>
        შენახვა
      </Button>
    </ScrollView>
  );
};
