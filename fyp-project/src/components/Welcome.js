import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getDoctorProfile } from '../redux/actions/docProfile';

export default function Welcome() {
  const dispatch = useDispatch();
  const doc = useSelector((state) => state.doc.user);
  useEffect(() => {

    dispatch(getDoctorProfile('doc1'));
    
  }, []);

  useEffect(() => {

    console.log(doc)
    
  }, [doc]);


  return (
    <div>Welcome</div>
  )
}
