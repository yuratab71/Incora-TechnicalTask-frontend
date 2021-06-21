import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import Button from "@material-ui/core/Button";
import { nameValidator, descValidator } from "../../validators/formValidators";
import "./createForm.css";

const CreateForm = ({ create, token }) => {
  const [allowCreate, setAllowCreate] = useState(false);

  const handleAdd = () => {
    setAllowCreate(!allowCreate);
  };

  return (
    <div className="create_form_container">
      {allowCreate ? (
        <>
          <Formik
            initialValues={{
              name: "",
              description: "Add description",
              imageUrl: "",
            }}
            onSubmit={(values) => {
              const data = {
                name: values.name,
                description: values.description,
                date: new Date().toString(),
                imageUrl: values.imageUrl,
              };
              if (
                !nameValidator(data.name) ||
                !descValidator(data.description)
              ) {
                alert("invalid parameters");
              } else {
                create(token, data);
                setAllowCreate(!allowCreate);
              }
            }}
          >
            <Form className="create_form">
              <span className="create_form_input_name">Name</span>
              <Field
                className="create_form_input"
                name="name"
                type="text"
                placeholder="name"
              />
              <span className="form_input_name">Description</span>
              <Field
                className="create_form_input_description form_input"
                name="description"
                as={TextArea}
                type="text"
              />
              <span className="create_form_input_name">imageUrl</span>
              <Field
                className="create_form_input"
                name="imageUrl"
                type="text"
                placeholder="imageUrl"
              />
              <button className="create_submit_button" type="submit">
                Create
              </button>
            </Form>
          </Formik>
          <Button onClick={handleAdd}>Close</Button>
        </>
      ) : (
        <Button onClick={handleAdd}>Add item</Button>
      )}
    </div>
  );
};

export default CreateForm;

export const TextArea = (props) => {
  return <textarea {...props} />;
};
