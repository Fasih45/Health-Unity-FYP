import React from 'react';

const Loader = ({ isLoading, closeModal }) => {
  return (
    <div className={`fixed z-10 inset-0 overflow-y-auto ${isLoading ? '' : 'hidden'}`} id="my-modal">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog" aria-modal="true" aria-labelledby="modal-headline">
          <div className="mx-auto">
            <svg className="animate-spin h-16 w-16 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M12 4v.01M8.33 4.83L6.9 6.27M4 12h.01M4.83 15.67l1.44 1.44M12 20v.01M15.67 19.17l1.43-1.43M20 12h-.01M19.17 8.33l-1.43-1.43" />
            </svg>
          </div>
          <div className="mt-4 text-center sm:mt-5">
            <h7 className="text-xl leading-6 font-medium text-gray-900" id="modal-headline">
              Please wait ...
            </h7>
          </div>
          <div className="mt-6 sm:mt-5">
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
