import note from "../../assets/images/notes1-Dz8CebMh.png"
import { useFormik } from "formik"
import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { number, object, string } from "yup"
export default function Signup() {
  const [accountExist, setaccountExist] = useState("")
  const navigate = useNavigate()
  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
  const phoneRegex = /^(02)?01[125][0-9]{8}$/

  const validationSchema = object({
    name: string().required("Name is required").min(3, " must be at least 3 characters").max(20, " can not be more than 20 characters"),
    email: string().required("Email is required").email("Email is invalid"),
    password: string().required("Password is required").matches(
      passwordRegex,
      "Password Should be Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"),
    age: number().required("Age is required").min(10, "must be at least 10 years").max(100, "can not be more than 100 years"),
    phone: string().required("Phone is required").matches(phoneRegex, "Sorry,we accept egyption phone numbers only")
  })


  async function sendData(values) {
    const loadingtoast = toast.loading("Waiting...")
    try {
      const options = {
        url: `https://note-sigma-black.vercel.app/api/v1/users/signUp`,
        method: "POST",
        data: values
      }
      let { data } = await axios.request(options)
      if (data.msg == "done") {
        toast.success("User Created Successfully");
        setTimeout(() => {
          navigate("/login")
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response.data.msg)
      setaccountExist(error.response.data.msg)
    } finally {
      toast.dismiss(loadingtoast)
    }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      age: "",
      phone: ""
    },
    onSubmit: sendData,
    validationSchema
  })

  return <>
    <div className="container mt-5 py-5 py-md-5">
      <div className="d-md-flex flex-md-wrap mt-5 mt-lg-5 m-4  m-lg-0">
        <div className="col-md-5 d-none d-lg-flex justify-content-center align-items-center pt-5">
          <img className="w-100 p-5" src={note} alt="" />
        </div>
        <div className="col-md-7 flex-md-grow-1 d-flex justify-content-center align-items-center flex-flex-grow-1">
          <div className="bg-bg-white bg-opacity-25 shadow p-5 rounded-2 w-100 ">
            <h1 className="fw-bold text-center">Register Now</h1>
            <form onSubmit={formik.handleSubmit} className="pt-3">
              {accountExist ? <p className="text-danger text-center fw-semibold">{accountExist}</p> : null}

              <div className="col">
                <input
                  type="text"
                  className="form-control my-2 fw-semibold"
                  placeholder="Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="name"
                />
              </div>
              {formik.errors.name ? <p className="text-danger fw-semibold ms-2">{formik.errors.name}</p> : null}
              <div className="col">
                <input type="email"
                  className="form-control my-2 fw-semibold"
                  placeholder="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="email"
                />
              </div>
              {formik.errors.email ? <p className="text-danger fw-semibold ms-2">{formik.errors.email}</p> : null}
              <div className="col ">
                <input type="password"
                  className="form-control my-2 fw-semibold"
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="password"
                />
              </div>
              {formik.errors.password ? <p className="text-danger fw-semibold ms-2">{formik.errors.password}</p> : null}
              <div className="col">
                <input type="number"
                  className="form-control my-2 fw-semibold"
                  placeholder="Age"
                  value={formik.values.age}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="age"
                />
              </div>
              {formik.errors.age ? <p className="text-danger fw-semibold ms-2">{formik.errors.age}</p> : null}
              <div className="col">
                <input type="tel"
                  className="form-control my-2 fw-semibold"
                  placeholder="Phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="phone"
                />
              </div>
              {formik.errors.phone ? <p className="text-danger fw-semibold ms-2">{formik.errors.phone}</p> : null}
              <button type="submit" className="btn btn-info text-white w-100 my-3">Submit</button>
            </form>
          </div>
        </div>

      </div>
    </div>

  </>
}