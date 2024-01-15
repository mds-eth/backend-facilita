import * as yup from 'yup';

export const clientSchema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório').min(6).max(255),
  email: yup.string().email('Digite um e-mail válido').required('E-mail é obrigatório'),
  phone: yup
    .string()
    .test('phone', 'Telefone inválido', function (value) {
      if (!value) {
        return true;
      }

      const cleanValue = value.replace(/\D/g, '');

      return cleanValue.length === 11;
    })
    .required('Telefone é obrigatório'),
  coordinate_y: yup.number().required('Coordenada Y é obrigatória'),
  coordinate_x: yup.number().required('Coordenada X é obrigatória'),
  location_name: yup.string().required('Nome localização é obrigatório'),
  address: yup.string().required('Endereço é obrigatório'),
  number: yup.number().required('Número é obrigatório'),
  cep: yup
    .string()
    .required('CEP é obrigatório')
    .test('cep', 'CEP inválido', function (value) {
      if (!value) {
        return true;
      }

      const cleanValue = value.replace(/\D/g, '');

      return /^\d{8}$/.test(cleanValue);
    }),
});
