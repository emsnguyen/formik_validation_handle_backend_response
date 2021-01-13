import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import { CustomImageInput } from "./components/CustomImageInput";
import { TextFormField } from "./components/TextFormField";
import { SelectFormField } from "./components/SelectFormField";
import * as yup from "yup";
import { Button } from "@material-ui/core";
import FormHelperText from "@material-ui/core/FormHelperText";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      preview: ""
    };
  }

  render() {
    const FILE_SIZE = 2 * 1024 * 1024; //2MB
    const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
    const PASSWORD_FORMAT = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    const validationSchema = yup.object().shape({
      email: yup
        .string()
        .required("Email is required")
        .email("Email is invalid"),
      password: yup
        .string()
        .required("Password is required")
        .matches(
          PASSWORD_FORMAT,
          "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character."
        ),
      sex: yup.string().required("Sex is required"),
      avatar: yup
        .mixed()
        .required("Avatar is required")
        .test(
          "fileSize",
          "Image size cannot be larger than 2MB",
          (value) => value && value.size <= FILE_SIZE
        )
        .test(
          "fileFormat",
          "File can only be in jpg, png, jpeg format",
          (value) => value && SUPPORTED_FORMATS.includes(value.type)
        )
    });
    return (
      <div
        className="container mt-5"
        style={{ textAlign: "center", width: 400, margin: "auto" }}
      >
        <h4>Register Form</h4>
        <hr />
        <Formik
          initialValues={{
            email: "",
            password: "",
            sex: "",
            avatar: ""
          }}
          validationSchema={validationSchema}
          validateOnBlur={true}
          onSubmit={(values, { setSubmitting, setStatus }) => {
            setStatus(undefined);
            if (values.email === "abc@gmail.com") {
              setStatus({ email: "Email existed" });
            } else {
              alert("Form submitted successfully!");
            }
            setSubmitting(false);
          }}
          render={({ setFieldValue, touched, errors, dirty, isValid }) => {
            return (
              <Form>
                <div>
                  <Field name="email" component={TextFormField} label="Email" />
                </div>
                <div>
                  <Field
                    name="password"
                    component={TextFormField}
                    label="Password"
                  />
                </div>
                <div>
                  <Field
                    name="sex"
                    component={SelectFormField}
                    label="Sex"
                    options={[
                      { id: 1, name: "Male" },
                      { id: 2, name: "Female" }
                    ]}
                  />
                </div>
                <div>
                  <div className="mb-2">{this.state.preview}</div>
                  <Field
                    name="avatar"
                    component={CustomImageInput}
                    label="Upload Avatar"
                    setFieldValue={setFieldValue}
                    setPreview={(preview) =>
                      this.setState({ preview: preview })
                    }
                  />
                  <FormHelperText error={true}>
                    {touched.avatar && errors.avatar}
                  </FormHelperText>
                </div>
                <Button
                  disabled={!dirty || (dirty && !isValid)}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Submit
                </Button>
              </Form>
            );
          }}
        />
      </div>
    );
  }
}
export default App;
