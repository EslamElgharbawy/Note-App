import { useRecoilState } from "recoil"
import { userAtom } from "../../Atoms/userAtom"
import axios from "axios"
import { useEffect, useState } from "react"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from "formik";
import NoteCard from "../../components/NoteCard/NoteCard";
import { CountAtom } from "../../Atoms/CountAtom";

export default function Home() {
  const [show, setShow] = useState(false);
  let [token] = useRecoilState(userAtom)
  let [notelength, setnotelength] = useRecoilState(CountAtom)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let [notes, setnotes] = useState([])

  async function getnotes() {
    try {
      const options = {
        url: `https://note-sigma-black.vercel.app/api/v1/notes`,
        method: "GET",
        headers: {
          token: `3b8ny__${token}`
        }
      }
      let { data } = await axios.request(options)
      if (data.msg == "done") {
        setnotes(data.notes)
        setnotelength(data.notes.length)
      }
    } catch (error) {
      console.error("Request Failed:", error.response?.data || error.message);
    }
  }

  async function deletenote(id) {
    try {
      const options = {
        url: `https://note-sigma-black.vercel.app/api/v1/notes/${id}`,
        method: "DELETE",
        headers: {
          token: `3b8ny__${token}`
        }
      }
      let { data } = await axios.request(options)
      if (data.msg == "done") {
        getnotes()
      }
    } catch (error) {
      console.log(error);

    }

  }

  async function updatenote(id, values) {
    try {
      const options = {
        url: `https://note-sigma-black.vercel.app/api/v1/notes/${id}`,
        method: "PUT",
        data: values,
        headers: {
          token: `3b8ny__${token}`
        }
      }
      let { data } = await axios.request(options)
      if (data.msg == "done") {
        getnotes()
      }
    } catch (error) {
      console.log(error);

    }

  }


  async function addnote(values) {
    try {
      const options = {
        url: `https://note-sigma-black.vercel.app/api/v1/notes`,
        method: "POST",
        data: values,
        headers: {
          token: `3b8ny__${token}`
        }
      }
      let { data } = await axios.request(options)
      console.log(data);
      if (data.msg == "done") {
        getnotes()
        handleClose()
        formik.resetForm()
      }
    } catch (error) {
      console.log(error);

    }

  }


  const formik = useFormik({
    initialValues: {
      title: "",
      content: ""
    },
    onSubmit: addnote
  })

  useEffect(() => {
    getnotes()
  }, [])


  return <>
    <div className="d-flex bg-light">
      <div className="col-4 col-md-2">
        <div className="relative top-0">
          <div className="p-0 min-vh-100 bg-dark">
            <div className="d-flex align-items-center mt-5 pt-5 ms-3 gap-lg-2">
              <i className="fa-regular fa-note-sticky fa-2xl pe-2" style={{ color: "#0dcaf0" }}></i>
              <p className="text-white fa-xl lh-sm mb-0" href="#">Notes</p>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-9 flex-grow-1 mx-3">
        <div className="mt-5 pt-1">
          <button className="btn btn-info d-block ms-auto mt-5 me-3" onClick={handleShow}><i className="fa-solid fa-plus"></i>Add note</button>
        </div>
        <div className="d-md-flex flex-md-wrap g-md-4  mt-3">
          {notes ? notes.map((note) => { return <NoteCard key={note._id} noteItem={note} deleteFn={deletenote} updateFn={updatenote} /> }) : null}


        </div>
        <h6 className="my-4 me-3 text-end fa-lg">Notes Number: {notelength}</h6>
      </div>
    </div>


    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Note</Modal.Title>
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
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  </>
}
