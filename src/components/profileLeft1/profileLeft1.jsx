import "./profileLeft1.css";
import Selfie from "./Ellipse.png";
import EditIcon from "./edit-02.png";
import Add from "./add.png";
import University from "./university.png";

function ProfileLeft1() {
  return (
    <div className="container">
      <div className="box1">
        <img className="selfie" src={Selfie} alt="Selfie" />
        <div className="name-specialization">
          <p className="name">Abdullah Ali</p>
          <p className="specialization">Full-Stack Developer</p>
        </div>
        <button className="edit">
          <img className="edit-icon" src={EditIcon} alt="edit" />
        </button>
      </div>
      <div className="box2-About">
        <div className="About-edit">
          <p className="About">About</p>
          <img className="edit" src={EditIcon} alt="edit"/>
        </div>
        <div className="description-About">
          <p>
            As a dedicated software developer with a passion for clean code and efficient problem-solving, I thrive on creating robust applications that improve user experience and drive business goals. My expertise lies in backend development, database management, and scalable arc... <button>See More</button>
          </p>
        </div>

      </div>

      <div className="box3">
        <div className="Eduction-add-edit">
          <p>Education</p>
          <div className="button">
            <button className="add">
            <img className="add" src={Add} alt="add"/>
            </button>
            <button className="edit00">
            <img className="edit" src={EditIcon} alt="edit"/>
            </button>
          </div>

        </div>
        <div className="box3-part2">
          <div className="img">
            <img className="University" src={University} alt="University"/>
          </div>
          <div className="Eduction">
            <p className="Eduction-University">University of Baghdad</p>
            <p className="Eduction-date">22 Jan 2023 - 11 May  2032.</p>
            <p className="Eduction-date">3 mos 20 days.</p>          
            <p className="Eduction-College">Information & Communication Engineering, Al-Khwarizmi College</p>
          </div>
        </div>
      </div>

      <div className="box4">
        <div className="Eduction-add-edit">
            <p>Projects History</p>
            <div className="button">
              <button className="add">
              <img className="add" src={Add} alt="add"/>
              </button>
              <button className="edit00">
              <img className="edit" src={EditIcon} alt="edit"/>
              </button>
            </div>
        </div> 

        <div className="box4-part2">
          <div className="box4-part2-part1">
            <div className="circle"></div>
            <div className="line"></div>
            <div className="circle"></div>
          </div>
          <div className="Eduction">
            <p className="Eduction-University">project Name</p>
            <p className="Eduction-date">22 Jan 2023 - 11 May  2032.</p>
            <p className="Eduction-date">3 mos 20 days.</p>          
            <p className="Eduction-College">Developed a task management web application designed to help users organize, prioritize, and track their daily tasks efficiently. </p>
          </div>
          
        </div> 

        <div className="line-space"></div>

        <div className="box4-part2">
          <div className="box4-part2-part1">
            <div className="circle"></div>
            <div className="line"></div>
            <div className="circle"></div>
          </div>
          <div className="Eduction">
            <p className="Eduction-University">project Name</p>
            <p className="Eduction-date">22 Jan 2023 - 11 May  2032.</p>
            <p className="Eduction-date">3 mos 20 days.</p>          
            <p className="Eduction-College">Developed a task management web application designed to help users organize, prioritize, and track their daily tasks efficiently. </p>
          </div>
          
        </div> 

        
      </div>

      <div className="box4">
        <div className="Eduction-add-edit">
            <p>Work Experience</p>
            <div className="button">
              <button className="add">
              <img className="add" src={Add} alt="add"/>
              </button>
              <button className="edit00">
              <img className="edit" src={EditIcon} alt="edit"/>
              </button>
            </div>
        </div> 

        <div className="box4-part2">
          <div className="Eduction">
            <p className="Eduction-University">project Name</p>
            <p className="Eduction-date">22 Jan 2023 - 11 May  2032.</p>
            <p className="Eduction-date">3 mos 20 days.</p>          
            <p className="Eduction-College">Developed a task management web application designed to help users organize, prioritize, and track their daily tasks efficiently. </p>
          </div>
          
        </div> 

        <div className="line-space"></div>

        <div className="box4-part2">
          <div className="Eduction">
            <p className="Eduction-University">project Name</p>
            <p className="Eduction-date">22 Jan 2023 - 11 May  2032.</p>
            <p className="Eduction-date">3 mos 20 days.</p>          
            <p className="Eduction-College">Developed a task management web application designed to help users organize, prioritize, and track their daily tasks efficiently. </p>
          </div>
          
        </div> 

        
      </div>




    
    </div>



  );
}

export default ProfileLeft1;
