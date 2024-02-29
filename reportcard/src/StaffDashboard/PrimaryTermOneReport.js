import schoollogo from "./schoollogo.png";

const PrimaryTermOneReport = ({
  data,
  selectedStudent,
  selectedClass,
  onClose,
}) => {
  const handlePrint = () => {
    var printContents = document.getElementById("printable-content").innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    window.document.close();
  };
  const dateone = Date.now();
  const currentDate = new Date(dateone);
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;


  return (
    <>
      <div className="modal-overlay">
        <div className="modal">
          <div className="modal-header">
            <h2> {selectedStudent.student_name} Marks Details</h2>
            <button onClick={onClose}>Close</button>
            <button onClick={handlePrint}>Print</button>
          </div>
          <div className="modal-body " id="printable-content">
            <div class="mycontainerone overallborder ">
              <div class="header-name items-center">
                <div className="row flex items-center justify-center py-2">
                  <img src={schoollogo} height="120px" width="120px" alt="" />

                  <div className="school-name text-pink-500 font-semibold">
                    <div className="items-center justify-center py-2">
                      <h2 className="text-2xl font-bold ml-72">REPORT CARD</h2>
                      <h1 className="text-3xl">
                        Guru Nanak Khalsa Sr. Sec. School Sector-30, Chandigargh
                      </h1>
                      <p className="text-md ml-24">
                        (issued School as per directives of Central Board of
                        Secondary Education,Delhi)
                      </p>
                    </div>
                    <div className="row flex justify-around items-center text-green-600 gap-2">
                      <p className="font-bold ">
                        {" "}
                        Email:Gurunanak_30b@rediffmail.com{" "}
                      </p>
                      <p className=" capitalize font-bold">
                        Website:www.gnkschool.info{" "}
                      </p>
                      <p className="capitalize font-bold">
                        {" "}
                        Phone: 01722654693
                      </p>
                    </div>
                  </div>
                </div>
                <div class="header-content text-center justify-between items-center"></div>
              </div>
              <hr class="line" />

              <div className="student-details ">
                <div className="row ">
                  <div className="col capitalize px-10">
                    <ul>
                    <li style={{ color: "red" }}>Student Profile</li>
                      <li className="flex items-center mb-2">
                        <span className="w-32 font-semibold">Name:</span>
                        <span>{selectedStudent.student_name}</span>
                      </li>
                      <li className="flex items-center mb-2">
                        <span className="w-32 font-semibold">
                          Class & Section:
                        </span>
                        <span>
                          {selectedClass}
                        </span>
                      </li>
                      <li className="flex items-center mb-2">
                        <span className="w-32 font-semibold">Roll No.:</span>
                        <span>{selectedStudent.Roll_No}</span>
                      </li>
                      <li className="flex items-center mb-2">
                        <span className="w-32 font-semibold">
                          Admission No.:
                        </span>
                        <span>{selectedStudent.adm_no}</span>
                      </li>
                    </ul>
                  </div>
                  <div className="col">
                    <ul>
                      <li>&nbsp;</li>
                      <li className="flex items-center mb-2">
                        <span className="w-32 font-semibold">D.O. Birth:</span>
                        <span>{selectedStudent.date_of_birth}</span>
                      </li>
                      <li className="flex items-center mb-2">
                        <span className="w-32 font-semibold">
                          Father's Name:
                        </span>
                        <span>{selectedStudent.gurdian_name}</span>
                      </li>
                      <li className="flex items-center mb-2">
                        <span className="w-32 font-semibold">
                          Mother's Name:
                        </span>
                        <span>{selectedStudent.mother_name}</span>
                      </li>
                      <li className="flex items-center mb-2">
                        <span className="w-32 font-semibold">Session:</span>
                        <span>2024-2025</span>
                      </li>
                    </ul>
                  </div>
                  <div className="col">
                    <div className="img-box ">Student's Photo</div>
                  </div>
                </div>
              </div>
              <div className="student-data ">
                {/* <!-- Table One******************************************************************************** --> */}
                <table className="mytable">
                  <thead>
                    <th colSpan="4" className="table-heading ">
                      Part A: Languages
                    </th>
                    <tr>
                      <th
                        colSpan="2"
                        rowSpan="2"
                        className="heading items-center justify-center"
                      >
                        Aspects
                      </th>

                      <th colSpan="1" className="heading">
                        English
                      </th>

                      <th colSpan="1" className="heading">
                        Punjabi
                      </th>
                    </tr>

                    <tr className="capitalize">
                      <th colSpan="1" className="heading">
                        Term 1
                      </th>
                  

                      <th colSpan="1" className="heading">
                        Term 1
                      </th>
                      
                    </tr>
                  </thead>
                  <tbody className="capitalize ">
                    <tr className="capitalize myborder">
                      <td colSpan={1} rowSpan={3}>
                        {" "}
                        Reading Skill
                      </td>
                      <td colSpan={1}> Pronunciation</td>
                      <td colSpan="1">{data[0].t1_english_pronunciation}</td>

                      <td colSpan="1">{data[0].t1_punjabi_pronunciation}</td>
                    </tr>
                    <tr className="capitalize myborder">
                      <td colSpan={1}> Fluency</td>
                      <td colSpan="1">{data[0].t1_english_fluency}</td>

                      <td colSpan="1">{data[0].t1_punjabi_fluency}</td>
                    </tr>
                    <tr>
                      <td colSpan="1"> Comprehensive </td>
                      <td colSpan="1">{data[0].t1_english_comprehension}</td>
                      <td colSpan="1">{data[0].t1_punjabi_comprehension}</td>
                    </tr>
                    <tr className="capitalize myborder">
                      <td colSpan={1} rowSpan={5}>
                        {" "}
                        Writing Skill
                      </td>
                      <td colSpan={1}> Creative Writing</td>
                      <td colSpan="1">{data[0].t1_english_creative_writing}</td>
                      <td colSpan="1">{data[0].t1_punjabi_creative_writing}</td>
                    </tr>
                    <tr className="capitalize myborder">
                      <td colSpan={1}> Handwriting</td>
                      <td colSpan="1">{data[0].t1_english_handwriting}</td>
                      <td colSpan="1">{data[0].t1_punjabi_handwriting}</td>
                    </tr>
                    <tr>
                      <td colSpan="1"> Grammar </td>
                      <td colSpan="1">{data[0].t1_english_grammar}</td>
                      <td colSpan="1">{data[0].t1_punjabi_grammar}</td>
                    </tr>
                    <tr>
                      <td colSpan="1"> Spellings </td>
                      <td colSpan="1">{data[0].t1_english_spelling}</td>
                      <td colSpan="1">{data[0].t1_punjabi_spelling}</td>
                    </tr>{" "}
                    <tr>
                      <td colSpan="1"> Vocabulary </td>
                      <td colSpan="1">{data[0].t1_english_vocabulary}</td>
                      <td colSpan="1">{data[0].t1_punjabi_vocabulary}</td>
                    </tr>
                    <tr className="capitalize myborder">
                      <td colSpan={1} rowSpan={2}>
                        {" "}
                        Speaking Skill
                      </td>
                      <td colSpan={1}> Conversation</td>
                      <td colSpan="1">{data[0].t1_english_conversation}</td>
                      <td colSpan="1">{data[0].t1_punjabi_conversation}</td>
                    </tr>
                    <tr className="capitalize myborder">
                      <td colSpan={1}> Recitation</td>
                      <td colSpan="1">{data[0].t1_english_recitation}</td>
                      <td colSpan="1">{data[0].t1_punjabi_recitation}</td>
                    </tr>
                    <tr className="capitalize myborder">
                      <td colSpan={1} rowSpan={1}>
                        {" "}
                        Listening Skill
                      </td>
                      <td colSpan={1}> Comprehensive</td>
                      <td colSpan="1">
                        {data[0].t1_english_listening_comprehension}
                      </td>
                 
                      <td colSpan="1">
                        {data[0].t1_punjabi_listening_comprehension}
                      </td>
                  
                    </tr>
                  </tbody>
                </table>

                {/* * <!-- Table Two******************************************************************************** -->  */}
                <table className="mytable">
                  <thead>
                    <th colSpan="2" className="table-heading ">
                    Part B: Mathematics
                    </th>
                    <th colSpan="2" className="table-heading ">
                    Part C : Games
                    </th>
                    <tr>
                      <th
                        colSpan="1"
                        rowSpan="1"
                        className="heading items-center justify-center"
                      >
                        Aspects
                      </th>

                      <th colSpan="1" className="heading">
                      Term 1
                      </th>

            
                      <th
                        colSpan="1"
                        rowSpan="1"
                        className="heading items-center justify-center"
                      >
                        Aspects
                      </th>

                      <th colSpan="1" className="heading">
                      Term 1
                      </th>

                    </tr>

                   
                  </thead>
                  <tbody className="capitalize ">
                    <tr className="capitalize myborder">
                      <td colSpan={1}> Concept</td>
                      <td colSpan="1">{data[0].t1_mathematics_concept}</td>
                      <td colSpan={1}> Enthusiasm</td>
                      <td colSpan="1">{data[0].t1_games_enthusiasm}</td>
                    </tr>
                    <tr className="capitalize myborder">
                      <td colSpan={1}> Activity</td>
                      <td colSpan="1">{data[0].t1_mathematics_activity}</td>
                      <td colSpan={1}> Discipline</td>
                      <td colSpan="1">{data[0].t1_games_discipline}</td>
                    </tr>
                    <tr>
                      <td colSpan="1"> Tables </td>
                      <td colSpan="1">{data[0].t1_mathematics_tables}</td>
                      <td colSpan="1"> Team-Spirit </td>
                      <td colSpan="1">{data[0].t1_games_team_spirit}</td>
                    </tr>
                    <tr>
                      <td colSpan="1"> Mental Ability </td>
                      <td colSpan="1">{data[0].t1_mathematics_mental_ability}</td>
                      <td colSpan="1"> Talent </td>
                      <td colSpan="1">{data[0].t1_games_talent}</td>
                    </tr>
                   
                  </tbody>
                </table>

                 {/* * <!-- Table Three******************************************************************************** -->  */}
                 <table className="mytable">
                  <thead>
                    <th colSpan="8" className="table-heading ">
                    Part D: Health and Physical Education
                    </th>
                    <tr>
                      <th
                        colSpan="2"
                        rowSpan="1"
                        className="heading items-center justify-center"
                      >
                        Aspects
                      </th>

                      <th colSpan="2" className="heading">
                      Term 1
                      </th>

             
                    </tr>

                   
                  </thead>
                  <tbody className="capitalize ">
                    <tr className="capitalize myborder">
                    
                      <td colSpan={2}> Environmental Sensitivity</td>
                      <td colSpan="2">{data[0].t1_health_environment}</td>
                    </tr>
                    <tr className="capitalize myborder">
                      <td colSpan={2}> Activity / Project</td>
                      <td colSpan="2">{data[0].t1_health_activity}</td>
                    </tr>
                    <tr>
                      <td colSpan="2"> Group Discussion </td>
                      <td colSpan="2">{data[0].t1_health_group_discussion}</td>
                    </tr>
                    
                   
                  </tbody>
                </table>

                 {/* * <!-- Table four ******************************************************************************** -->  */}
                 <table className="mytable">
                  <thead>
                    <th colSpan="2" className="table-heading ">
                    Part E: Art / Craft
                    </th>
                    <th colSpan="2" className="table-heading ">
                    Part F : Music / Dance
                    </th>
                    <tr>
                      <th
                        colSpan="1"
                        rowSpan="1"
                        className="heading items-center justify-center"
                      >
                        Aspects
                      </th>

                      <th colSpan="1" className="heading">
                      Term 1
                      </th>


                      <th
                        colSpan="1"
                        rowSpan="1"
                        className="heading items-center justify-center"
                      >
                        Aspects
                      </th>

                      <th colSpan="1" className="heading">
                      Term 1
                      </th>

                    </tr>

                   
                  </thead>
                  <tbody className="capitalize ">
                    <tr className="capitalize myborder">
                      <td colSpan={1}> Interest</td>
                      <td colSpan="1">{data[0].t1_art_interest}</td>
                      <td colSpan={1}> Interest</td>
                      <td colSpan="1">{data[0].t1_music_interest}</td>
                    </tr>
                    <tr className="capitalize myborder">
                      <td colSpan={1}> Creativity</td>
                      <td colSpan="1">{data[0].t1_art_creativity}</td>
                      <td colSpan={1}> Rhythm</td>
                      <td colSpan="1">{data[0].t1_music_rhythm}</td>
                    </tr>
                    <tr>
                      <td colSpan="1"> Skill </td>
                      <td colSpan="1">{data[0].t1_art_skill}</td>
                      <td colSpan="1"> Melody </td>
                      <td colSpan="1">{data[0].t1_music_melody}</td>
                    </tr>
                    
                  </tbody>
                </table>
               {/* * <!-- Table five ******************************************************************************** -->  */}
               <table className="mytable">
                  <thead>
                    <th colSpan="8" className="table-heading ">
                    Part G: Personality Development 
                    </th>
                    <tr>
                      <th
                        colSpan="2"
                        rowSpan="1"
                        className="heading items-center justify-center"
                      >
                        Aspects
                      </th>

                      <th colSpan="1" className="heading">
                      Term 1
                      </th>

                      <th
                        colSpan="2"
                        rowSpan="1"
                        className="heading items-center justify-center"
                      >
                        Aspects
                      </th>

                      <th colSpan="1" className="heading">
                      Term 1
                      </th>

                    </tr>

                   
                  </thead>
                  <tbody className="capitalize ">
                    <tr className="capitalize myborder">
                      <td colSpan={2}> Courteousness</td>
                      <td colSpan="1">{data[0].t1_personality_courteousness}</td>
                      <td colSpan={2}> Confidence</td>
                      <td colSpan="1">{data[0].t1_personality_confidence}</td>
                    </tr>
                    <tr className="capitalize myborder">
                      <td colSpan={2}> Care of Belongings</td>
                      <td colSpan="1">{data[0].t1_personality_care_of_belonging}</td>
                      <td colSpan={2}> Neatness</td>
                      <td colSpan="1">{data[0].t1_personality_neatness}</td>
                    </tr>
                    <tr>
                      <td colSpan="2"> Regularity and Punctuality </td>
                      <td colSpan="1">{data[0].t1_personality_regularity}</td>
                      <td colSpan="2"> Initiative </td>
                      <td colSpan="1">{data[0].t1_personality_initiative}</td>
                    </tr>
                    <tr>
                      <td colSpan="2"> Self-Control </td>
                      <td colSpan="1">{data[0].t1_personality_self_control}</td>
                      <td colSpan="2"> Sharing And Caring </td>
                      <td colSpan="1">{data[0].t1_personality_sharing}</td>
                    </tr>
                    
                  </tbody>
                </table>
              
                {/* <!-- Table nine******************************************************************************** --> */}

                <table className="mytable myborder">
                  <tbody>
                    <tr>
                      <td colSpan="1" className="heading">
                        Remarks term 1:
                      </td>

                      <td colSpan="1" className="noborder">
                        ok{data[0].t1_remark}
                      </td>

                    </tr>
                  </tbody>
                </table>
                {/* <!-- Table Seven******************************************************************************** --> */}

                <table className="mytable myborder">
                  <tbody>
                    <tr>
                      <td colSpan="2" className="heading">
                        Result
                      </td>

                      <td colSpan='8' className="noborder"> good</td>
                    </tr>
                  </tbody>
                </table>
                {/* <!-- Table Eight******************************************************************************** --> */}

                <table className="mytable myborder">
                  <tbody>
                    <tr className="noborder">
                      <td className="noborder w-1/4">&nbsp;</td>

                      <td colSpan={2}className="noborder w-1/4">&nbsp;</td>
                      <td className="noborder w-1/4">&nbsp;</td>
                      <td className="noborder w-1/4">&nbsp;</td>

                    </tr>
                    <tr className="noborder">
                      <td className="noborder w-1/4 ">Class Teacher</td>
                      <td colSpan={2} className="noborder w-1/4"></td>
                      <td className="noborder w-1/4">Principal / HeadMistress</td>
                      <td className="noborder w-1/4">Parent Signature</td>
                    </tr>
                  </tbody>
                </table>
                {/* <!-- Table nine******************************************************************************** --> */}

                <table className="mytable myborder ">
                  <tbody>
                    <tr>
                      <td colSpan="2" className="heading">
                        Exam Result Date
                      </td>

                      <td className="noborder">{formattedDate}</td>
                    </tr>
                  </tbody>
                </table>
                {/* <!-- Table Ten******************************************************************************** --> */}
                <table className="mytable myborder">
                  <thead>
                    <tr>
                      <th colSpan="10" className="table-heading">
                        Grading System
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan="2">A+ : Outstanding</td>
                       <td colSpan="2">A : Excellent</td>
                      <td colSpan="2">B : Very Good</td>
                      <td colSpan="2">C : Good </td>
                      <td colSpan="2">D : Average</td>
                    </tr>
                   
                   
                  </tbody>
                  </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrimaryTermOneReport;
