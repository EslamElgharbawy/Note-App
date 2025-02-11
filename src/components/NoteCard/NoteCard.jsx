import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { useFormik } from 'formik';

export default function NoteCard({ noteItem, deleteFn, updateFn }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const formik = useFormik({
        initialValues: {
            title: "",
            content: ""
        },
        onSubmit: () => {
            updateFn(noteItem._id, formik.values)
            handleClose()
            formik.resetForm()
        }
    })


    return <>
        <div className="col-11  p-0 p-md-2 col-md-4 mt-3">
            <Card className='shadow'>
                <Card.Body>
                    <Card.Title>{noteItem.title}</Card.Title>
                    <Card.Text>
                        {noteItem.content}
                    </Card.Text>
                    <Card.Link href="#"><i onClick={handleShow} className="fa-regular fa-pen-to-square" style={{ color: "#005eff" }}></i></Card.Link>
                    <Card.Link href="#"><i className="fa-solid fa-trash" onClick={() => {
                        deleteFn(noteItem._id)
                    }} style={{ color: "#005eff" }}></i></Card.Link>
                </Card.Body>
            </Card>
        </div>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update Note</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="" onSubmit={formik.handleSubmit}>
                    <label className="form-label" htmlFor="title">Title</label>
                    <input
                        className="form-control"
                        type="text"
                        placeholder="title"
                        name="title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        id="title" />

                    <label className="form-label mt-2" htmlFor="content">Discription</label>
                    <input
                        className="form-control"
                        type="text"
                        placeholder="discription"
                        name="content"
                        value={formik.values.content}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        id="content" />
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={formik.handleSubmit}>
                    Update
                </Button>
            </Modal.Footer>
        </Modal>
    </>
}
