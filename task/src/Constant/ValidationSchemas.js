
import * as Yup from 'yup';


const nameRules = Yup.string().required('Name is required')
const emailRules = Yup.string().email('Invalid email address').required('Email is required')
const phoneNumberRules = Yup.string().matches(/^\d{10}$/, "Please enter a valid 10-digit phone number").required('Mobile number is required');
const locationRules = Yup.string().required('Location is required')



export const newEmployeevalidationSchema = Yup.object({
    name: nameRules,
    email: emailRules,
    phone: phoneNumberRules,
    location: locationRules
  });