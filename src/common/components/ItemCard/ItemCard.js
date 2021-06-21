import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { TextArea } from "../CreateForm/CreateForm";
import CreateIcon from "@material-ui/icons/Create";
import { Link } from "react-router-dom";
import { nameValidator, descValidator } from "../../validators/formValidators";
import dateStringCutter from "../../helpers/dateCutter";
import "./itemCard.css";

const ItemCard = ({
  id,
  name,
  description,
  imageUrl,
  email,
  date,
  isModified,
  authorId,
  currentUserId,
  deleteItem,
  token,
  setPatch,
  logout,
}) => {
  const [isModify, setModify] = useState(false);

  const handleDelete = () => {
    deleteItem(token, id, logout);
  };

  const handleModify = () => {
    setModify(!isModify);
  };

  return (
    <div className="item_container">
      <div className="image_wrapper">
        <img className="item_image" src={imageUrl} />
      </div>
      <div className="itemInfo_container">
        {isModify ? (
          <div className="item_form_wrapper">
            <Formik
              initialValues={{
                name: name,
                description: description,
                imageUrl: imageUrl,
              }}
              onSubmit={(values) => {
                const data = {
                  name: values.name,
                  description: values.description,
                  imageUrl: values.imageUrl,
                  date: new Date().toString(),
                };
                if (
                  !nameValidator(data.name) ||
                  !descValidator(data.description)
                ) {
                  alert("invalid parameters");
                } else {
                  setPatch(token, id, data);
                  setModify(!isModify);
                }
              }}
            >
              <Form className="item_form">
                <span className="form_input_name">Name: </span>
                <Field className="form_input" name="name" type="text" />
                <span className="form_input_name">Description: </span>
                <Field
                  className="form_input form_input_description"
                  as={TextArea}
                  name="description"
                  type="text"
                />
                <span className="form_input_name">imageUrl</span>
                <Field className="form_input" name="imageUrl" type="text" />
                <button className="submit_button" type="submit">
                  Save
                </button>
              </Form>
            </Formik>
          </div>
        ) : (
          <>
            <div className="item_name">
              <Link to={`/item/${id}`}>{name}</Link>
            </div>
            <hr />
            <div className="item_description">{description}</div>
          </>
        )}

        {authorId === currentUserId ? (
          <div className="button_wrapper">
            <div>
              <IconButton onClick={handleDelete} color="secondary">
                <DeleteIcon fontSize="large" />
              </IconButton>
            </div>
            <div>
              <IconButton onClick={handleModify} color="primary">
                <CreateIcon fontSize="large" />
              </IconButton>
            </div>
          </div>
        ) : (
          <div className="warning">
            You cannot modify this item, you`re not the author
          </div>
        )}

        <div className="author_info">
          <div className="item_createBy">created by {email}</div>
          <div className="item_createBy">
            {isModified === "true" ? (
              <span>Modified at: </span>
            ) : (
              <span>Created at: </span>
            )}
            {dateStringCutter(date)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
