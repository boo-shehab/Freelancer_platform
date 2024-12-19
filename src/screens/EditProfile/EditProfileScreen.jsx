import React, { useState } from "react";
 //import EditAboutPopup from "../../components/FreelancerTwoStageFormPopup/FreelancerTwoStageFormPopup";
 import EditProfilePopup from "../../components/EditProfilePopup/EditProfilePopup";


const EditAboutPopupScreen = () => {
   /*const [isPopupOpen, setIsPopupOpen] = useState(true);   
  const initialText = "";  */
   const [isPopupOpen, setIsPopupOpen] = useState(true);
  const initialData = {
    firstName: "Abdulla",
    lastName: "Ali",
    specialization: "Full-Stack Developer",
  };
  return (
    /* <div>
      {isPopupOpen && (
        <EditAboutPopup
          isOpen={isPopupOpen}  
          onClose={() => setIsPopupOpen(false)}  
          initialText={initialText}  
          onSave={(text) => {
            console.log("Saved text:", text);  
            setIsPopupOpen(false);  
          }}
        />
      )}
    </div> */
    <div>
    {isPopupOpen && (
      <EditProfilePopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        initialData={initialData}
        onSave={(data) => {
          setIsPopupOpen(false);
        }}
      />
    )}
  </div>
  );
};

export default EditAboutPopupScreen;



