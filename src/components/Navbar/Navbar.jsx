import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userAtom } from "../../Atoms/userAtom";
import { CountAtom } from "../../Atoms/CountAtom";

export default function Navbar() {
  let [token, settoken] = useRecoilState(userAtom)
  let [notelength] = useRecoilState(CountAtom)

  return <>
    <nav className="navbar bg-info fixed-top py-3">
      <div className="container px-3 ">
        <div className="d-flex justify-content-center align-items-center">
          <i className="fa-regular fa-note-sticky fa-bounce fa-2xl pe-2"></i>
          <h2 className="text-dark" href="#">Notes</h2>
        </div>

        <div>
          <ul className="d-flex list-unstyled m-0 ">
            {token ?
              <div className="d-none d-lg-flex justify-content-center align-items-center">
                <div className="d-flex justify-content-center align-items-center">
                  <h6 className="position-absolute top-0 mt-2 mt-lg-3">{notelength}</h6>
                  <li className="p-2 pb-0 fa-lg position-relative"><i className="fa-solid fa-box-open"></i></li>

                </div>

                <li className="p-3 fa-lg fw-semibold"><Link onClick={() => {
                  localStorage.removeItem("token");
                  settoken(null)
                }} className="text-decoration-none text-dark me-2" >Logout</Link>
                  <i className="fa-solid fa-arrow-right-from-bracket fa-sm"></i></li>
              </div> :
              <div className="d-flex">
                <li className="p-3 fa-lg fw-semibold"><Link to={"/login"} className="text-decoration-none text-dark">Login</Link></li>
                <li className="p-3 fa-lg fw-semibold"><Link to={"/signup"} className="text-decoration-none text-dark">Register</Link></li>
              </div>}
          </ul>
        </div>

        {token ? <>
          <div className="d-flex justify-content-center align-items-center d-xl-none">
            <ul className="d-flex list-unstyled m-0 ">
              <div className="d-xl-none">
                <div className="d-flex justify-content-center align-items-center">
                  <h6 className="position-absolute top-0 mt-2 mt-lg-3">{notelength}</h6>
                  <li className="p-2 pb-0 fa-lg position-relative"><i className="fa-solid fa-box-open"></i></li>
                </div>
              </div>
              <li className="p-3 fa-lg fw-semibold"><Link onClick={() => {
                  localStorage.removeItem("token");
                  settoken(null)
                }} className="text-decoration-none text-dark me-2" >Logout</Link>
                  <i className="fa-solid fa-arrow-right-from-bracket fa-sm"></i></li>
            </ul>

          </div></> : ""}
      </div>
    </nav>


  </>
}
