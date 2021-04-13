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
    password: yup.string().min(6).required(),
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
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                onChange={onChangeOfCredentials}
                ref={register}
              />
            </Form.Group>
            <Button type="submit">Log in</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginScreen;
