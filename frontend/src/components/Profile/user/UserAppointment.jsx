import { useEffect, useState } from "react";
import profiePic from "../../../assets/human6.jpg";
import Swal from "sweetalert2";
import UserSidebar from "./UserSidebar";
import axios from "../../../utils/axios";

function UserAppointment() {
  const [appointments, setAppointments] = useState([]);
  const [userData, setuserData] = useState([]);
  const [loading, setLoading] = useState(false);

  const colorForStatus = (status) => {
    switch (status) {
      case "scheduled":
        return "text-orange-300";
      case "inProgress":
        return "text-blue-300";
      case "completed":
        return "text-green-300";
      case "cancelled":
        return "text-red-300";
      default:
        return "text-green-300";
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setuserData(user);
    const email = user.email;
    const fetchAppointments = async (email) => {
      await axios
        .get(`/appointment/get-appointments/${email}`)
        .then((res) => {
          setAppointments(res.data);
        })
        .catch((err) => {
          Swal.fire({
            title: "Error",
            icon: "error",
            confirmButtonText: "Ok",
            text: "Error Fetching Appointments! Please Try Again!",
          });
        });
    };
    setLoading(true);
    fetchAppointments(email).finally(() => {
      setLoading(false);
    });
  }, []);

  console.log("appointments :", appointments);
  return (
    <section className="bg-slate-300">
      <div className="flex h-full w-full bg-white shadow-xl">
        <UserSidebar profiePic={profiePic} userName={userData.userName} />
        <div className="w-[70%] mx-auto">
          <div className="flex flex-col gap-8 p-4">
            <h1 className="text-3xl font-medium underline underline-offset-8">
              Appointments
            </h1>
            {loading && <>Loading....</>}
            <div className="flex flex-col gap-4">
              {appointments.map((appointment, index) => {
                const appointmentDate = new Date(appointment.appointmentDate);
                const formattedDate = appointmentDate.toLocaleString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                });
                return (
                  <div
                    className="flex flex-col gap-4 border p-4 rounded-md text-xs"
                    key={index}
                  >
                    <div className="flex gap-4 justify-between">
                      <p className="font-medium">
                        Doctor : {appointment.doctor.name}
                      </p>
                      <p className="font-medium">
                        {" "}
                        Date and Time : {formattedDate}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="">Reason : {appointment.reason}</p>
                      <p className="font-medium">
                        Status of Appointment:
                        <p className={`${colorForStatus(appointment.status)}`}>
                          {appointment.status}
                        </p>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserAppointment;
