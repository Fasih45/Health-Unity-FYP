import { useState, useEffect } from "react";
import abi from "../contractJson/DoctorPatient.json";
import { ethers } from "ethers";
import Buy from "./Buy";

function Hardhat(props) {
  const [trigger, settrigger] = useState(false);
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("Not connected");
  const template = async () => {
    const contractAddres = "0x33CFCcD1Dc68367FfEa7eF2564775DAC08D01561";
    const contractABI = abi.abi;
    //Metamask part
    //1. In order do transactions on goerli testnet
    //2. Metmask consists of infura api which actually help in connectig to the blockhain

    try {
      const { ethereum } = window;
      const account = await ethereum.request({
        method: "eth_requestAccounts",
      });

      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
      setAccount(account);

      const provider = new ethers.providers.Web3Provider(ethereum); //read the Blockchain
      const signer = provider.getSigner(); //write the blockchain

      const contract = new ethers.Contract(contractAddres, contractABI, signer);
      console.log(contract);
      setState({ provider, signer, contract });
    } catch (error) {
      console.log("here", error);
      alert("PLz login meta mask");
    }
  };

  useEffect(() => {
    if (trigger) {
      template();
    }
    settrigger(true);
  }, [trigger]);

  return (
    <div>
      {/* <p style={{ marginTop: "10px", marginLeft: "5px" }}>
        <small>Connected Account - {account}</small>
      </p> */}
      {
        <Buy
          state={state}
          setappointment={props.setappointment}
          setdoc={props.setdoc}
          acceptAppointment={props.acceptAppointment}
          setcall={(message) => {
            props.setcall(message);
          }}
          removeDoc={props.removeDoc}
          write={props.write}
          getPatientkey={props.getPatientkey}
          getKey={props.getKey}
          setmed={props.setmed}
          addLabstotrust={props.addLabstotrust}
          removeLab={props.removeLab}
          getPatientkeybyLab={props.getPatientkeybyLab}
        />
      }
    </div>
  );
}

export default Hardhat;
