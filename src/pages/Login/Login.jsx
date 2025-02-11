import axios from "axios"
import note from "../../assets/images/notes1-Dz8CebMh.png"
import { useFormik } from "formik"
import { useContext, useState } from "react"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
import { object, string } from "yup"
import { useRecoilState } from "recoil"
import { userAtom } from "../../Atoms/userAtom"

const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/

export default function Login() {
  const navigate = useNavigate()
  const [invalidEmailorPasswordErro, setinvalidEmailorPasswordErrorr] = useState(null)
  let [userToken, setuserToken] = useRecoilState(userAtom)


  const validationSchema = object({
    email: string().required("Email is required").email("Email is invalid"),
    password: string().required("Password is required").matches(passwordRegex, "Password Should be Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"),

  })

  async function sendData(values) {
    let loadingtoast = toast.loading("Waiting...")
    try {
      const options = {
        url: "https://note-sigma-black.vercel.app/api/v1/users/signIn",
        method: "POST",
        data: values,
      }
      let { data } = await axios.request(options)
      if (data.msg == "done") {

        localStorage.setItem("token", data.token)
        setuserToken(data.token)
        toast.success("welcome")

        setTimeout(() => {
          navigate("/home")
        }, 1000);
      }
    } catch (error) {
      toast.error(error.response.data.msg)
      setinvalidEmailorPasswordErrorr(error.response.data.msg)
    } finally {
      toast.dismiss(loadingtoast)
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: sendData,
  })



  return <>
    <div className="container mt-5 py-5 py-md-5">
      <div className="d-md-flex flex-md-wrap mt-5 mt-md-5 m-4  m-md-0">
        <div className="col-md-5 d-none d-lg-flex justify-content-center align-items-center pt-5">
          <img className="w-100 p-5" src={note} alt="" />
        </div>
        <div className="col-md-7 mt-5 flex-md-grow-1">
          <div className="bg-bg-white bg-opacity-25 shadow p-5 rounded-2 w-100 ">
            <h1 className="fw-bold text-center">Login Now</h1>
            <form onSubmit={formik.handleSubmit} className="pt-3">
              <div className="col">
                <input type="text"
                  className="form-control my-2 fw-semibold"
                  placeholder="Email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.errors.email ? <p className="text-danger ms-2 fw-semibold">{formik.errors.email}</p> : ""}
              <div className="col mt-2">
                <input type="password"
                  className="form-control my-2 fw-semibold"
                  placeholder="Password"
                  aria-label="Last name"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.errors.password ? <p className="text-danger ms-2 fw-semibold">{formik.errors.password}</p> : ""}
              {invalidEmailorPasswordErro && <p className="text-danger mt-1">* {invalidEmailorPasswordErro}</p>}
              <button type="submit" className="btn btn-info text-white w-100 my-3">Submit</button>
              <span>Don't have an account yet? <Link to={"/signup"}>Register</Link> </span>
            </form>
          </div>
        </div>

      </div>
    </div>


  </>
}
