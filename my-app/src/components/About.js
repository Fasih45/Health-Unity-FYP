import React from 'react';

const About= () => {
  return (
    <section id="about" >
      <div className="container my-5">
        <div className="row gy-4">
          <div className="container-md col-lg-6 position-relative align-self-start order-lg-last order-first">
            <img src="https://source.unsplash.com/600x750/?hospital,building" className="img-fluid" alt="" />
            <a href="https://www.youtube.com/watch?v=LXb3EKWsInQ" className="glightbox play-btn"></a>
          </div>
          <div className="col-lg-6 content order-last order-lg-first">
            <h3>About Us</h3>
            <p >
            In the era of rapid technological advancement, Health Unity seeks to revolutionize healthcare interactions. By seamlessly integrating blockchain technology, this platform aims to empower patients, enhance medical care, promote transparent collaboration, streamline prescription fulfillment, and ensure data security. It envisions a future where patients have comprehensive access to their medical data, doctors make informed decisions, and collaboration in healthcare thrives. This project is a step towards redefining patient care and data privacy in a connected healthcare ecosystem.
            </p>
            <h4>Objective</h4>
            <ul>
              <li data-aos="fade-up" data-aos-delay="100" className="aos-init aos-animate">
                <i className="bi bi-diagram-3"></i>
                <div>
                <p>The Project aims to empower patients with an encompassing view of their medical history, lab reports, prescribed medications, and past visits. This transparency fosters a profound understanding of their health journey.</p>
                </div>
              </li>

              <li data-aos="fade-up" data-aos-delay="100" className="aos-init aos-animate">
                <i className="bi bi-diagram-3"></i>
                <div>
                  <p>The Project will provide doctors with a unified repository of patient data, enable informed and data-driven medical decisions, ultimately enriching the quality of patient care.</p>
                </div>
              </li>



              <li data-aos="fade-up" data-aos-delay="200" className="aos-init aos-animate">
                <i className="bi bi-fullscreen-exit"></i>
                <div>
                  <p>Patient-doctor collaboration is at the heart of our endeavor thus Patients can grant specific permissions to doctors to update their medical data, fostering a transparent and collaborative relationship.</p>
                </div>
              </li>


              <li data-aos="fade-up" data-aos-delay="300" className="aos-init aos-animate">
                <i className="bi bi-broadcast"></i>
                <div>
                  <p>The Project will allow Patients to efficiently access details about prescribed medications and find nearby pharmacies with the required medicines. </p>
                </div>
              </li>


            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
