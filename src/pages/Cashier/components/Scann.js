import React from 'react';
import { QrReader } from 'react-qr-reader';


const Scann = ({serchCustomer}) => {
  //const [data, setData] = useState('No result');

  return (
    <>
      <QrReader
        onResult={(result , error ) => {
          if (!!result) {
            //setData(result?.text);
            serchCustomer(result?.text)
          }
          if (!!error) {
            console.info(error);
          }
        }}
        containerStyle = {{width: "100%",paddingTop: "3%" , overflow: "hidden", position: "relative"}}
        videoContainerStyle = {{width: "100%", paddingTop: "20%", overflow: "hidden", position: "relative"}}
        videoStyle={{width: '100%', justifyContent: 'center'}}
      />
    </>
  );
};

export default Scann;