import React from 'react'

function Footer1() {
  return (
    <div className="row py-2 px-3">
      <div >
      <section>
        {/* Footer */}
        <footer className="text-center text-white" style={{ backgroundColor: '#0a4275' }}>
          {/* Grid container */}
          <div className="container p-4 pb-0">
            {/* Section: CTA */}
            <section>
              <p className="d-flex justify-content-center align-items-center">
                <span className="me-3">Register for free</span>
                <button type="button" className="btn btn-outline-light btn-rounded">
                  Sign up!
                </button>
              </p>
            </section>
            {/* Section: CTA */}
          </div>
          {/* Grid container */}

          {/* Copyright */}
          <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
            © 2020 Copyright:
            <a className="text-white" href="">
              Health Unity
            </a>
          </div>
          {/* Copyright */}
        </footer>
        {/* Footer */}
      </section>
      </div>
    </div>
  );
  
}

export default Footer1