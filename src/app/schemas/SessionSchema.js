import * as yup from 'yup';

export const sessionSchema = yup.object().shape({
  email: yup.string().email('Digite um e-mail válido').required('E-mail é obrigatório'),
  password: yup.string().required('Senha é obrigatório').min(6).max(25),
});
