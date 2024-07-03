export type MainStackParamsList = {
  LoginScreen: undefined;
  RegistrationScreen: undefined;
  ExpensesCategoriesScreen: undefined;
  ExpenseDetailsScreen: {categoryId: string; oil?: boolean};
  AddExpenseScreen: {categoryId: string; expenseId?: string; oil?: boolean};
  EditExpenseScreen: {category: string; expense: string; oil?: boolean};
  NewExpenseScreen: {};
};
