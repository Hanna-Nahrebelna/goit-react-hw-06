import { Field, Form, Formik, ErrorMessage } from 'formik';
import { nanoid } from "nanoid";
import * as Yup from "yup";

import { addContact } from "../../redux/contactsSlice";
import { useDispatch } from "react-redux";

import css from './ContactForm.module.css'

const ContactSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    number: Yup.string()
      .min(5, "Too Short!")
      .max(13, "Too Long!")
      .required("Required")
  });

export default function ContactForm() { 
  const dispatch = useDispatch();

  const handleSubmit = (values, actions)=> {
        values.id = nanoid();
        const {name, phone} = values;
        dispatch(addContact(name, phone));
        actions.resetForm();
    }  
  
  return (
    <div>
    <Formik initialValues={{ name: "", phone: "" }} validationSchema={ContactSchema} onSubmit={handleSubmit}>
        <Form className={css.form}>
          <div>
            <label className={css.label} htmlFor="username">Name</label>
              <Field className={css.field} id="username" type="text" name="name" />
              <ErrorMessage className={css.errorName} name="name" component="span" />
          </div>
          <div>
            <label htmlFor="phone">Phone number</label>
              <Field className={css.field} id="phone" type="tel" name="phone" />
              <ErrorMessage className={css.errorNumber} name="phone" component="span" />
          </div>

        <button className={css.btn} type="submit">Add contact</button>
      </Form>
      </Formik>
    </div>
  )
}
  
