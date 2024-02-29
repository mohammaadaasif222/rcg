import React, { useState } from "react";
import schoollogo from "./schoollogo.png"

const ReportCardThree = ({
  data,
  selectedStudent,
  reportCardData,
  closeReportCardModal,
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

  const calculateOverallTotal = () => {
    let overallTotal = 0;
    let totalOutOf = 0;

    reportCardData.map((reportCard) => {
      // Assuming these properties exist in your reportCard object
      const theory_obtain = reportCard.theory_obtain || 0;
      const theory_max = reportCard.theory_max || 1;
      const practical_obtain = reportCard.practical_obtain || 0;
      const practical_max = reportCard.practical_max || 1;

      // Calculate the total and total outOf for each report card
      const total = theory_obtain + practical_obtain;
      const totalOutOfLocal = theory_max + practical_max;

      // Add to overallTotal and totalOutOf
      overallTotal += total;
      totalOutOf += totalOutOfLocal;
    });

    // Calculate percentage
    const percentage = (overallTotal / totalOutOf) * 100;

    // Generate grade
    let grade;
    if (percentage >= 90) {
      grade = 'A';
    } else if (percentage >= 80) {
      grade = 'B';
    } else if (percentage >= 70) {
      grade = 'C';
    } else if (percentage >= 60) {
      grade = 'D';
    } else {
      grade = 'F';
    }

    return {
      overallTotal,
      percentage,
      grade,
    };
  };
  const overallData = calculateOverallTotal();
  return (
    <>
      <div className="modal-overlay">
        <div className="modal">
          <div className="modal-header">
            <h2> {selectedStudent.student_name} Marks Details</h2>
            <button onClick={closeReportCardModal}>Close</button>
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
                    <p className="capitalize font-bold"> Phone: 01722654693</p>
                  </div>
                  </div>
                </div>
                <div class="header-content text-center justify-between items-center">
                  
                </div>
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
                        {reportCardData[0].subject.split("_")[0]}-
                        {reportCardData[0].subject.split("_")[1].toUpperCase()}
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
                    <th colSpan="10" className="table-heading">
                      Part:1 Scholastic Area
                    </th>
                    <tr>
                      <th colSpan="1" rowSpan="2" className="heading">
                        Subject code
                      </th>

                      <th colSpan="3" rowSpan="2" className="heading">
                        Subject Detail
                      </th>
                     
                      <th colSpan="2" className="heading">
                        Theory Examination
                      </th>
                     
                      <th colSpan="2" className="heading">
                        Project / Practical
                      </th>
                      <th colSpan="2" className="heading">
                        Overall Total
                      </th>
                    </tr>

                    <tr className="capitalize">
                     
                      <th colSpan="1" className="heading">max</th>
                      <th colSpan="1" className="heading">obtain</th>
                     
                      <th colSpan="1" className="heading">max</th>
                      <th colSpan="1" className="heading">obtain</th>
                    
                      <th colSpan="1" className="heading">max</th>
                      <th colSpan="1" className="heading">Total</th>
                    
                    </tr>
                  </thead>
                  <tbody className="capitalize ">
                    {reportCardData.map((dataRow, index) => (
                      <tr className="capitalize myborder" key={index}>
                        <td>01</td>
                        <td colSpan={3}>{dataRow.subject.split("_")[2]} {dataRow.subject.split("_")[3]}</td>
                       
                        <td>{dataRow.theory_max}</td>
                        <td>{dataRow.theory_obtain}</td>
                       
                        <td>{dataRow.practical_max}</td>
                        <td>{dataRow.practical_obtain}</td>
                        
                        <td>{ dataRow.theory_max +
                            dataRow.practical_max}</td>
                        <td>
                          {
                            dataRow.theory_obtain +
                            dataRow.practical_obtain}
                        </td>
                      </tr>
                    ))}
                    <tr>
                    <td colSpan="2"> overall Out of :  {overallData.overallTotal} </td>
                      <td colSpan="2">OVER ALL MARKS :  {overallData.overallTotal} </td>
                      <td colSpan="3">OVER ALL MARKS(%):{overallData.percentage.toFixed(2)}% </td>
                      <td colSpan="3">OVER ALL GRADE: {overallData.grade}</td>
                    </tr>
                    <tr></tr>
                  </tbody>
                </table>

            
              
                {/* <!-- Table Five******************************************************************************** --> */}

                <table className="mytable ">
                  <thead>
                    <tr>
                      <td colSpan="1" className="heading">
                        Attendance
                      </td >
                      <td colSpan="2">{selectedStudent.attendance_term_1} </td>
                    </tr>
                  </thead>
                  <tbody>
                    {/* <!-- Table Six******************************************************************************** --> */}
                    <tr>
                      <td colSpan="1" className="heading">
                        Remarks
                      </td>

                      <td colSpan="1" className="noborder">
                        {data[0].t1_scholastic_remark
                          ? data[0].t1_scholastic_remark
                          : data[0].t2_scholastic_remark}
                      </td>
                    </tr>

                    {/* <!-- Table Seven******************************************************************************** --> */}

                    <tr>
                      <td colSpan="1" className="heading">
                        Result
                      </td>
                      <td></td>
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
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportCardThree;
