import { validateForms } from './functions/validate-forms.js';


const rules = [
  {
    ruleSelector: '.input-name',
    rules: [
      {
        rule: 'required',
        value: true,
        errorMessage: 'Заполните имя!'
      }
    ]
  },
  // {
  //   ruleSelector: '.input-tel',
  //   tel: true,
  //   telError: 'Введите корректный телефон',
  //   rules: [
  //     {
  //       rule: 'required',
  //       value: true,
  //       errorMessage: 'Заполните телефон!'
  //     }
  //   ]
  // },
  {
    ruleSelector: '.input-email',
    rules: [
      {
        rule: 'required',
        value: true,
        errorMessage: 'Заполните Email!'
      },
      {
        rule: 'email',
        value: true,
        errorMessage: 'Введите корректный Email!'
      }
    ]
  },
];

const afterForm = () => {
  console.log('Произошла отправка, тут можно писать любые действия');
};

validateForms('.order__form', rules, afterForm);
validateForms('.service-order__form--card', rules, afterForm);
validateForms('.service-order__form--landing', rules, afterForm);
validateForms('.service-order__form--shop', rules, afterForm);
