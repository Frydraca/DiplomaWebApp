import React from "react";
import * as yup from "yup";
import { Container, Col, Button, Row, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { logIn } from "../../api/Authentication";
import { clearError } from "../../store/Errors";

function LoginScreen() {
  const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });
  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema,
    revalidateMode: "onSubmit",
  });

  const dispatch = useDispatch();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    dispatch(
      logIn({
        email: data.email,
        password: data.password,
      })
    );
  });

  const onChangeOfCredentials = () => {
    dispatch(clearError({ name: "registrationCredentialError" }));
  };

  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form noValidate onSubmit={onSubmit}>
            <Form.Group controlId="formBasicEmail">
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
            <Button type="submit">Log in</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginScreen;
