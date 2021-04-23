import React from "react";
import * as yup from "yup";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";

export function ScriptSaveModal(props) {
  const { show, handleClose, handleCreate } = props.model;

  const schema = yup.object({
    name: yup.string().required(),
  });
  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema,
    revalidateMode: "onSubmit",
  });

  const onSubmit = handleSubmit((data) => {
    handleCreate(data.name);
    handleClose();
  });

  return (
    <Modal centered show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Name your script</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={onSubmit}>
          <Form.Group controlId="formTopicName">
            <Form.Label>Script Name</Form.Label>
            <Form.Control
              name="name"
              type="text"
              defaultValue=""
              ref={register}
              isInvalid={!!errors.name}
              placeholder="Name of your Script..."
            />
            <Form.Control.Feedback type="invalid">
              <h6>
                {errors.name
                  ? Array.isArray(errors.name)
                    ? errors.name[0].message
                    : errors.name.message
                  : ""}
              </h6>
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button
              variant="outline-success"
              className="border border-success"
              type="submit"
            >
              Create Script
            </Button>
            <Button
              variant="outline-danger"
              className="border border-danger ml-2"
              onClick={handleClose}
            >
              Close
            </Button>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}

export default ScriptSaveModal;
