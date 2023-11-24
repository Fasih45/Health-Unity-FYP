import React from 'react';

const Services = () => {
  return (
    <section id="features" className="features">
      <div className="container">
        <div className="section-header  text-uppercase">
          
          <h2>Our Services</h2>
       </div>
       <ul></ul>

        <div className="row gy-4 align-items-center my-5 features-item aos-init aos-animate" data-aos="fade-up">
          <div className="col-md-5">
            <img src="https://source.unsplash.com/600x300/?hospital,building" className="img-fluid" alt="" />
          </div>
          <div className="col-md-7">
            <h3>Patient Empowerment</h3>
            <p className="fst-italic">
            Patients will use the platform to access and manage their personal medical data, view medical records, prescriptions, and collaborate with healthcare providers.
            </p>
            <ul>
              <li><i className="bi bi-check"></i> Receive timely updates on health conditions, test results, and any changes in medical status.</li>
              <li><i className="bi bi-check"></i> Collaborate with healthcare providers through secure communication channel.</li>
              <li><i className="bi bi-check"></i>  Enable remote monitoring of specific health metrics, allowing healthcare providers to track and analyze patient health remotely.</li>
            </ul>
          </div>
        </div>
         
        <ul></ul>

        <div className="row gy-4 align-items-center  my-5 features-item aos-init aos-animate" data-aos="fade-up">
          <div className="col-md-5 order-1 order-md-2">
            <img src="https://source.unsplash.com/600x300/?Patient,Doctor" className="img-fluid" alt="" />
          </div>
          <div className="col-md-7 order-2 order-md-1">
            <h3>Medical Collaboration</h3>
            <p className="fst-italic">
            Healthcare professionals such as doctors will use the platform to access patient records, make informed medical decisions, and collaborate with patients.
            </p>
            <p>
            <ul>
              <li><i className="bi bi-check"></i> Doctors can securely access and review detailed patient records, including medical history, diagnoses, and treatment plans.</li>
              <li><i className="bi bi-check"></i> Engage in collaborative care planning by discussing treatment options, providing insights, and involving patients in decision-making processes.</li>
              <li><i className="bi bi-check"></i> Streamline appointment scheduling and coordination, improving efficiency and reducing scheduling conflicts.</li>
            </ul>
            </p>
          </div>
        </div>

        <ul></ul>

        <div className="row gy-4 align-items-center my-5 features-item aos-init aos-animate" data-aos="fade-up">
          <div className="col-md-5">
            <img src="https://source.unsplash.com/600x300/?Patient,Doctor" className="img-fluid" alt="" />
          </div>
          <div className="col-md-7">
            <h3>Laboratories & Technicians </h3>
            <p>Medical laboratories and technicians will use the platform to input and share test results securely with authorized healthcare providers and patients.</p>
            <ul>
              <li><i className="bi bi-check"></i> Facilitate authorized sharing of test results with healthcare providers and patients, ensuring privacy and compliance with data protection regulations.</li>
              <li><i className="bi bi-check"></i> Enable quick and efficient delivery of test results to healthcare providers, allowing for prompt analysis and decision-making.</li>
              <li><i className="bi bi-check"></i> Provide patients with secure access to their test results, promoting transparency and empowering them to stay informed about their health.</li>
            </ul>
          </div>
        </div>


        <ul></ul>


      </div>
    </section>
  );
};

export default Services;
