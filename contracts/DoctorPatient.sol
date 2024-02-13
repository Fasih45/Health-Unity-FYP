// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract DoctorPatient {
    // Owner of the contract
    address private owner;

        struct Payment {
        bool pending;
        address patient;
        uint amount;
    }

    mapping(string => address) private patientAddresses;
    mapping(address => bytes32) private patientKey;
    mapping(string => address) private doctorAddresses;
    mapping(string => address) private labAddresses;
    mapping(address => mapping(string => bool)) private trustedDoctors;
    mapping(address => mapping(string => bool)) private trustedlabs;
    mapping(string => mapping(string => Payment)) private pendingpPaymentDoctors;

    constructor() {
        owner = msg.sender;
    }

    function addPatient(string memory patientName) private  {

        address existingAddress = patientAddresses[patientName];

        if (existingAddress == address(0)) {
            // If no address is associated, add the new patient with the sender's address
            require(patientKey[msg.sender]== bytes32(0),"The account with different user name is already taken!");
            patientAddresses[patientName] = msg.sender;
            patientKey[msg.sender]=generateUniqueHash();
        } else {
    
            require(existingAddress == msg.sender, "Patient name already registered with a different address");
        }
    }


    function addDoctor(string memory doctor) public  {

        address existingAddress = doctorAddresses[doctor];

        if (existingAddress == address(0)) {
            // If no address is associated, add the new patient with the sender's address
            doctorAddresses[doctor] = msg.sender;
        } else {
    
            require(existingAddress == msg.sender, "Doctor name already registered with a different address");
        }
    }

    function addLab(string memory lab) external payable  {///one time registration fee
        
        address existingAddress = labAddresses[lab];
        require(msg.value >= 0.2 ether, "Please pay 0.2 ether for registration");
        if (existingAddress == address(0)) {
            payable(owner).transfer(0.2 ether);
            labAddresses[lab] = msg.sender;

        } else {
            payable(msg.sender).transfer(0.2 ether);//return if it is already owner or username already taken
            require(existingAddress == msg.sender, "Lab name already registered with a different address");
        }
    }


    function addDoctorToTrustedList(string memory doctorName) private  {
        if(trustedDoctors[msg.sender][doctorName]==false){
        trustedDoctors[msg.sender][doctorName] = true;
        }
    }

    function addLabToTrustedList(string memory labName,string memory patientName) public  {
        require(labAddresses[labName]!=address(0), "No lab with this name exits");
        addPatient(patientName);
        require(trustedlabs[msg.sender][labName]==false,"Already added to trust list");
        trustedlabs[msg.sender][labName] = true;
        
    }

    function removeDoctorToTrustedList(string memory doctorName) public   {
        if(trustedDoctors[msg.sender][doctorName]==true){
        trustedDoctors[msg.sender][doctorName] = false;
        }
    }
    function removeLabToTrustedList(string memory labName) public   {
      require(trustedlabs[msg.sender][labName]==true,"Already removed  from the trust list");
        trustedlabs[msg.sender][labName] = false;
        
    }
    

    function bookAppointment(string memory patientName, string memory doctorName) external payable  {
    require(doctorAddresses[doctorName]!=address(0), "No Doctor with this name exits");
    require(msg.value > 0, "Please pay more than 0 ether");

    addPatient(patientName);
    addDoctorToTrustedList(doctorName);
    Payment memory temp;
    temp.pending=true;
    temp.patient=msg.sender;
    temp.amount=msg.value;
    require(pendingpPaymentDoctors[patientName][doctorName].pending==false , "You had already  booked appoinment  with this doctor and it is pending ");
    pendingpPaymentDoctors[patientName][doctorName] = temp;

}

    function acceptbydocter(string memory patientName, string memory doctorName) external  {

        require(pendingpPaymentDoctors[patientName][doctorName].pending,"No pending payment exits");
        require(doctorAddresses[doctorName]==msg.sender,"You are not the registered docter");
        
            uint256 amountTodoctor = (pendingpPaymentDoctors[patientName][doctorName].amount* 70) / 100;
            uint256 remainingOwner = pendingpPaymentDoctors[patientName][doctorName].amount-amountTodoctor ;

           require(amountTodoctor <= pendingpPaymentDoctors[patientName][doctorName].amount, "Insufficient pending payment");
           payable(msg.sender).transfer(amountTodoctor);//payment to docter
           payable(owner).transfer(remainingOwner);//payment to owner
           pendingpPaymentDoctors[patientName][doctorName].pending=false;
        

        
    }

    function rejectbydocter(string memory patientName, string memory doctorName) external  {

        require(pendingpPaymentDoctors[patientName][doctorName].pending,"No pending payment exits");
        require(doctorAddresses[doctorName]==msg.sender,"You are not the registered docter");
        
           payable(patientAddresses[patientName]).transfer(pendingpPaymentDoctors[patientName][doctorName].amount);//return to patient
           pendingpPaymentDoctors[patientName][doctorName].pending=false;
        
    }

    function generateUniqueHash() private view returns (bytes32) {
        bytes32 hash = keccak256(abi.encodePacked(msg.sender, block.timestamp));
        return hash;
    }

    function getHashedKeybyPatient() public view returns (bytes32) {
        bytes32 hash = patientKey[msg.sender];
        return hash;
    }


    function getHashedKeybyDoctor(string memory patientName,string memory doctorName) public view returns (bytes32) {
        require(doctorAddresses[doctorName]==msg.sender,"Doctor account doesnot match");
        address  patient=patientAddresses[patientName] ;
        require(trustedDoctors[patient][doctorName]==true,"Sorry you are not in trusted list");
        bytes32 hash = patientKey[patient];
        return hash;
    }

    function getHashedKeybyLabs(string memory patientName,string memory labName) public view returns (bytes32) {
        require(labAddresses[labName]==msg.sender,"Lab account doesnot match");
        address  patient=patientAddresses[patientName] ;
        require(trustedlabs[patient][labName]==true,"Sorry you are not in trusted list");
        bytes32 hash = patientKey[patient];
        return hash;
    }
     
}
