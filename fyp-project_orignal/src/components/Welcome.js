import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDoctorProfileRequest,
  getProfile,
} from "../redux/actions/docProfile";
import UserInfoCard from "./UserInfoCard";
import WorkInfoCard from "./DocWorkPalceInfo";
import PersonalInfo from "./PersonalInfo";
import { useNavigate, useParams } from "react-router-dom";
import Medicalrecord from "./Medicalrecord";
import Labrecord from "./Labrecord";
import PersonalInfoLab from "./PersonalInfoLab";
import Medworkplaceinfo from "./Medworkplaceinfo";

export default function Welcome() {
  const dispatch = useDispatch();
  const { user, username } = useParams();
  const [completeprofile, setcompleteprofile] = useState(false);
  const [reload, reloadset] = useState(false);
  const profile = useSelector((state) => state.profile.user);
  const errorlog = useSelector((state) => state.profile.statusCode);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getProfile(user, username));
    // if 401 route to login for state managment
  }, [reload, dispatch, user, username]);

  useEffect(() => {
    // console.log(profile);
    if (errorlog === 404 || errorlog === 401) {
      console.log(errorlog);
      navigate(`/`);
      window.location.reload(true);
    }
  }, [profile, errorlog, navigate, dispatch]);

  return (
    <>
      {(errorlog !== 404 && errorlog !== 401) || errorlog === 422 ? ( ///422 is for incomplete
        user === "doctor" || user === "medical_labs" ? (
          profile && profile.error ? (
            <>
              {user === "medical_labs" ? (
                <UserInfoCard data={profile.lab} />
              ) : (
                <UserInfoCard data={profile.doctor} />
              )}
              {!completeprofile && (
                <div className="mt-5 bg-white  p-6 rounded-md shadow-md flex  justify-center items-center">
                  <button
                    onClick={() => setcompleteprofile(!completeprofile)}
                    className="px-4 py-2 mt-5 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none transition-colors"
                  >
                    Complete Your profile
                  </button>
                </div>

              )}
              {completeprofile &&
                (user === "doctor" ? (
                  <PersonalInfo
                    user={profile.doctor.username}
                    reload={() => reloadset(1)}
                  />
                ) : (
                  <PersonalInfoLab
                    user={profile.lab.username}
                    reload={() => reloadset(1)}
                  />
                ))}
            </>
          ) : profile && !profile.error ? (
            <>
              {" "}
              <div className="mb-8">
                <UserInfoCard data={profile.personalInfo} />
              </div>{" "}
              {user === "doctor" ? (
                <WorkInfoCard data={profile} />
              ) : (
                // <>

                //   {/* console.log("data here:", profile) */}
                // </>
                <Medworkplaceinfo data={profile} />

              )}
            </>
          ) : (
            <p>User is not logged in.</p>
          )
        ) : user === "patient" && profile ? (
          <>
            <div className="mb-8">
              <UserInfoCard data={profile} />
            </div>{" "}
            <Medicalrecord />
          </>
        ) : user === "pharmacy" && profile ? (
          <>
            <div className="mb-8">
              <UserInfoCard data={profile} />
            </div>{" "}
            <Labrecord />
          </>
        ) : null
      ) : null}

    </>
  );
}
