import { object, string, date, boolean, ref, SchemaOf } from 'yup';
import AuthUser from '../../domain/auth-user';
import { FullNameProps } from '../../domain/value-objects/fullname';

type SignUpDto = Omit<AuthUser, 'id' | 'fullName' | 'hash'> &
  FullNameProps & {
    password: string;
    confirmation: string;
  };

const signUpSchema: SchemaOf<SignUpDto> = object({
  email: string()
    .required("Propriedade 'email' é obrigatória")
    .email("Propriedade 'email' inválida")
    .typeError("Propriedade 'email' espera receber o tipo 'string'"),
  firstName: string()
    .required("Propriedade 'firstName' é obrigatória")
    .min(2, "Propriedade 'firstName' deve ter, no mínimo, dois caracteres")
    .max(
      50,
      "Propriedade 'firstName' deve ter, no máximo, cinquenta caracteres"
    )
    .typeError("Propriedade 'firstName' espera receber o tipo 'string'"),
  surname: string()
    .required("Propriedade 'surname' é obrigatória")
    .min(2, "Propriedade 'surname' deve ter, no mínimo, dois caracteres")
    .max(50, "Propriedade 'surname' deve ter, no máximo, cinquenta caracteres")
    .typeError("Propriedade 'surname' espera receber o tipo 'string'"),
  birthday: date()
    .required("Propriedade 'birthday' é obrigatória")
    .typeError("Propriedade 'birthday' espera receber o tipo 'Date'"),
  emailVerified: boolean()
    .optional()
    .typeError("Propriedade 'emailVerified' espera receber o tipo 'boolean'"),
  password: string()
    .required("Propriedade 'password' é obrigatória")
    .min(8, 'Senha deve conter, no mínimo, oito caracteres')
    .max(80, 'Senha deve conter, no máximo, oitenta caracteres'),
  confirmation: string()
    .required("Propriedade 'confirmation' é obrigatória")
    .min(8, 'Senha deve conter, no mínimo, oito caracteres')
    .max(80, 'Senha deve conter, no máximo, oitenta caracteres')
    .oneOf([ref('password')], 'Senha e confirmação diferentes'),
  profilePicture: string()
    .optional()
    .typeError("Propriedade 'profilePicture' espera receber o tipo 'string'"),
});

export default SignUpDto;
export { signUpSchema };
