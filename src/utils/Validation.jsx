
import * as Yup from 'yup';
export const SignupSchema = Yup.object().shape({
  fullName: Yup.string().required('Required'),
  myUserName: Yup.string().required('Required'),
  projectName: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!#%*?&]){8,}/, "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:").required('Required')
});