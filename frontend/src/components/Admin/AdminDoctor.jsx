import { useEffect, useState } from "react";
import profiePic from "../../assets/human6.jpg";
import Swal from "sweetalert2";
import Loader from "../Shared/Loader";
import AdminSidebar from "./AdminSidebar";
import axios from "../../utils/axios";

function AdminDoctor() {
  const [doctors, setDoctors] = useState([]);
  const userString = localStorage.getItem("user");

  const [docname, setDocName] = useState("");
  const [docspec, setDocSpecialization] = useState("");
  const [docemail, setDocEmail] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/doctor/get-doctors");
        setDoctors(response.data);
      } catch (error) {
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "Error Fetching Data!",
        });
      }
    };

    fetchData();
  }, []);

  if (!doctors) {
    return <Loader />;
  }

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    await axios
      .post("/doctor/add-doctor", {
        name: docname,
        specialization: docspec,
        email: docemail,
      })
      .then((res) => {
        if (res.data.message === "Success") {
          Swal.fire({
            title: "Success",
            icon: "success",
            text: "Doctor Added Successfully!",
          });
        }
      })
      .catch((e) => {
        console.log(e);
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "Error Adding Doctor!",
        });
      });
  };

  const [isCreate, setIsCreate] = useState(false);

  const editPatient = async (id) => {
    await axios
      .put(`/doctor/update-doctor/${id}`, {})
      .then((res) => {
        Swal.fire({
          title: "Success",
          icon: "success",
          text: "Doctor Updated Successfully!",
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Error",
          icon: "warning",
          text: "Could not update Doctor!",
        });
      });
  };

  const deletePatient = async (id) => {
    await axios
      .delete(`/doctor/delete-doctor/${id}`)
      .then((res) => {
        console.log(res);
        Swal.fire({
          title: "Success",
          icon: "success",
          text: "Patient Deleted Successfully!",
        });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "Error Deleting Patient!",
        });
      });
  };

  const handleCreate = () => {
    setIsCreate(!isCreate);
  };

  const handleGoBack = () => {
    setIsCreate(!isCreate);
  };

  return (
    <section className="bg-slate-300">
      <div className="h-full w-full bg-white shadow-xl flex">
        <AdminSidebar userName={"Admin"} profiePic={profiePic} />
        <div className=" w-[70%] ms-24 p-4 flex flex-col justify-start gap-5 ">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-3xl">Doctors</p>
            <button
              onClick={handleCreate}
              className="bg-green-500 p-2 px-4 rounded-md text-xs hover:scale-110 duration-200 active:scale-90  text-white"
            >
              Add Doctor
            </button>
          </div>
          <div className="w-full">
            <div className="relative overflow-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      #
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Doctor Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Doctor Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Department
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {doctors &&
                    doctors.map((item, index) => (
                      <tr key={item._id} className="text-black">
                        <td scope="col" className="px-6 py-3">
                          {item.doctorId}
                        </td>
                        <td scope="col" className="px-6 py-3">
                          {item.name}
                        </td>
                        <td scope="col" className="px-6 py-3">
                          {item.email}
                        </td>
                        <td scope="col" className="px-6 py-3">
                          {item.specialization}
                        </td>
                        <td scope="col" className="d-flex gap-3 ">
                          <button
                            onClick={() => {
                              deletePatient(item._id);
                            }}
                            className="btn btn-danger"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {isCreate && (
          <div className="absolute h-screen w-screen z-50 bg-white">
            <form className="flex flex-col w-full h-full justify-center gap-4 items-center">
              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Doctors Name:</p>
                <input
                  onChange={(e) => setDocName(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Doctor Name"
                ></input>
              </div>

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Doctors Email:</p>
                <input
                  onChange={(e) => setDocEmail(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Email"
                ></input>
              </div>
              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Doctors Specialization:</p>
                <input
                  onChange={(e) => setDocSpecialization(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Specialization"
                ></input>
              </div>

              <button
                onClick={handleAddDoctor}
                className=" w-[35%] bg-black text-white rounded-full text-md font-medium p-2 cursor-pointer hover:scale-110 duration-200 active:scale-90"
              >
                Add Doctor
              </button>

              <button
                onClick={handleGoBack}
                className="bg-black text-white rounded-full text-md font-medium p-2 cursor-pointer hover:scale-105 duration-200 active:scale-90"
              >
                {"<- Go back"}
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}

export default AdminDoctor;
