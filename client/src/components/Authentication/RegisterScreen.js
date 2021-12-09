import React from "react";
import { Redirect } from "react-router";
import { Container, Col, Button, Row, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { createNewAccount, isLoggedIn } from "../../api/Authentication";
import { clearError } from "../../store/Errors";

function RegisterScreen() {
  const schema = yup.object({
    email: yup.string().email().required(),
    userName: yup.string().required(),
    password: yup.string().min(6).required(),
    repeatPassword: yup
      .string()
      .oneOf([yup.ref("password"), undefined], "Passwords must match!"),
  });
  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema,
    revalidateMode: "onSubmit",
  });

  const dispatch = useDispatch();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    dispatch(
      createNewAccount({
        email: data.email,
        userName: data.userName,
        password: data.password,
        repeatPassword: data.repeatPassword,
      })
    );
  });

  const onChangeOfCredentials = () => {
    dispatch(clearError({ name: "registrationCredentialError" }));
  };

  return isLoggedIn() ? (
    <Redirect
      to={{
        pathname: "/designer",
      }}
    />
  ) : (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form noValidate onSubmit={onSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter email"
                name="email"
                onChange={onChangeOfCredentials}
                ref={register}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                <h6>
                  {errors.email
                    ? Array.isArray(errors.email)
                      ? errors.email[0].message
                      : errors.email.message
                    : ""}
                </h6>
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formUserName">
              <Form.Label>User name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your user name"
                name="userName"
                onChange={onChangeOfCredentials}
                ref={register}
                isInvalid={!!errors.userName}
              />
              <Form.Control.Feedback type="invalid">
                <h6>
                  {errors.userName
                    ? Array.isArray(errors.userName)
                      ? errors.userName[0].message
                      : errors.userName.message
                    : ""}
                </h6>
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                onChange={onChangeOfCredentials}
                ref={register}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                <h6>
                  {errors.password
                    ? Array.isArray(errors.password)
                      ? errors.password[0].message
                      : errors.password.message
                    : ""}
                </h6>
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formRepeatPassword">
              <Form.Label>Repeat Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Repeat Password"
                name="repeatPassword"
                onChange={onChangeOfCredentials}
                ref={register}
                isInvalid={!!errors.repeatPassword}
              />
              <Form.Control.Feedback type="invalid">
                <h6>
                  {errors.repeatPassword
                    ? Array.isArray(errors.repeatPassword)
                      ? errors.repeatPassword[0].message
                      : errors.repeatPassword.message
                    : ""}
                </h6>
              </Form.Control.Feedback>
            </Form.Group>
            <Button type="submit">Register</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default RegisterScreen;
