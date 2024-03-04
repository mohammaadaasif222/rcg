import React from "react";
import schoollogo from "./schoollogo.png";

const ReportCardTwo = ({
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
      const obtain = reportCard.grand_total || 0;
      const total = obtain;
      const totalOutOfLocal = 100;
      overallTotal += Number(total);
      totalOutOf += totalOutOfLocal;
    });

    const percentage = (overallTotal / totalOutOf) * 100;
    let grade;
    if (percentage >= 90) {
      grade = "A";
    } else if (percentage >= 80) {
      grade = "B";
    } else if (percentage >= 70) {
      grade = "C";
    } else if (percentage >= 60) {
      grade = "D";
    } else {
      grade = "F";
    }

    return {
      overallTotal,
      percentage,
      grade,
    };
  };
  const overallData = calculateOverallTotal();
//  console.log('reportCrdtwo', reportCardData)
 const vocational = reportCardData?.find(obj => obj.subject.includes('vocational'));
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
                          {reportCardData[0].subject.split("_")[0]}-
                          {reportCardData[0].subject
                            .split("_")[1]
                            .toUpperCase()}
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
                        <span>{selectedStudent.father_name}</span>
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
                    <th colSpan="20" className="table-heading">
                      Part:1 Scholastic Area
                    </th>
                    <tr>
                      <th className="heading"></th>
                      <th colSpan="6" className="heading">
                        Preodic test
                      </th>

                      <th colSpan="2" className="heading">
                        Multiple assesment
                      </th>
                      <th colSpan="3" className="heading">
                        Portfolio and Sub Enrichment
                      </th>
                      <th colSpan="3" rowSpan="2" className="heading">
                        PT + MA + Portfolio + S.E E=A+B+C+D
                      </th>
                      <th colSpan="2" className="heading">
                        Final exam
                      </th>
                      <th colSpan="3" rowSpan="2" className="heading">
                        Grand Total
                      </th>
                    </tr>
                    <tr className="heading">
                      <th className="heading" rowSpan="2">
                        Subject
                      </th>
                      <th className="heading ">PT1</th>
                      <th className="heading">PT2</th>
                      <th className="heading">PT3</th>
                      <th colSpan="3" className="heading">
                        Avg. of Best Of Two [A]
                      </th>
                      <th colSpan="2" className="heading">
                        MA [B]
                      </th>
                      <th colSpan="2" className="heading">
                        Portfolio [C]
                      </th>
                      <th className="heading">S.E [D] </th>

                      <th colSpan="2" className="heading">
                        Annual Exam
                      </th>
                    </tr>
                    <tr>
                      <th className="heading">Out of 5</th>
                      <th className="heading">Out of 5</th>
                      <th className="heading">Out of 5</th>

                      <th colSpan="3" className="heading">
                        Out of 5
                      </th>
                      <th colSpan="2" className="heading">
                        Out of 5
                      </th>
                      <th colSpan="2" className="heading">
                        Out of 5
                      </th>
                      <th className="heading">Out of 5</th>
                      <th colSpan="3" className="heading">
                        Out of 20
                      </th>
                      <th colSpan="2" className="heading">
                        Out of 80
                      </th>
                      <th colSpan="2" className="heading">
                        Out of 100
                      </th>
                      <th className="heading">G</th>
                    </tr>
                  </thead>
                  <tbody className="capitalize ">
                    {reportCardData.map((dataRow, index) => (
                      <tr className="capitalize myborder" key={index}>
                        <td>{dataRow.subject.split("_")[2]}</td>
                        <td>{dataRow.pen_paper_pt1}</td>
                        <td>{dataRow.pen_paper_pt2}</td>
                        <td>{dataRow.pen_paper_pt3}</td>
                        <td colSpan={3}>{dataRow.best_of_two}</td>
                        <td colSpan={2}>{dataRow.multiple_assessment}</td>
                        <td colSpan={2}>{dataRow.portfoilo}</td>
                        <td>{dataRow.sub_enrich_act}</td>
                        <td colSpan={3}>
                          {dataRow.grand_total - dataRow.annual_exam}
                        </td>

                        <td>{dataRow.annual_exam}</td>
                        <td colSpan={3}>{dataRow.grand_total}</td>

                        <td colSpan={2}>{dataRow.final_grade}</td>
                      </tr>
                    ))}

                    <tr className="capitalize text-center myborder">
                      <td colSpan="4" rowSpan="2">
                        VACATIONAL SUBJECT (IF ANY)
                      </td>
                      <td colSpan="4"> {vocational?.theory_max} </td>
                      <td colSpan="4"> {vocational?.theory_obtain} </td>
                      <td colSpan="4"> {vocational?.practical_max} </td>
                      <td colSpan="4"> {vocational?.practical_obtain} </td>
                    
                      
                    </tr>
                    <tr className="capitalize text-center myborder">
                      <td colSpan="4"> </td>
                      <td colSpan="4"> </td>
                      <td colSpan="4"> </td>
                      <td colSpan="4"> </td>
                    </tr>
                    <tr>
                      <td colSpan="5"> </td>
                      <td colSpan="5">
                        OVER ALL MARKS:{overallData.overallTotal}{" "}
                      </td>
                      <td colSpan="5">
                        OVER ALL MARKS(%):{overallData.percentage}{" "}
                      </td>
                      <td colSpan="5">OVER ALL GRADE:{overallData.grade} </td>
                    </tr>
                    <tr></tr>
                  </tbody>
                </table>

                {/* <!-- Table Two******************************************************************************** --> */}
                <table className="mytable capitalize">
                  <thead>
                    <tr>
                      <th colSpan="3" className="table-heading">
                        Part 2(A): Co-Scholastic Activities (to be assessed on a
                        3 point scale)
                      </th>
                    </tr>
                    <tr>
                      <th colSpan={2} className="heading">
                        Activities
                      </th>
                      <th className="heading">Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={2}>Art Education</td>
                      <td> {data[0].t1_scholastic_art}</td>
                    </tr>
                  </tbody>
                </table>
                {/* <!-- Table Three******************************************************************************** --> */}

                <table className="mytable capitalize">
                  <thead>
                    <tr>
                      <th colSpan="3" className="table-heading">
                        Part 2(B): Health & Physical Education (to be assessed
                        on a 3 point scale)
                      </th>
                    </tr>
                    <tr>
                      <th className="heading">Activities</th>
                      <th colSpan="1" className="heading">
                        {" "}
                        Grade
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Computer</td>
                      <td colSpan="1">{data[0].t1_scholastic_computer}</td>
                      {/* <td>{data[0].t2_scholastic_computer}</td> */}
                    </tr>
                    <tr>
                      <td>Health</td>
                      <td colSpan="1">{data[0].t1_scholastic_health}</td>
                    </tr>
                    <tr>
                      <td>work education</td>
                      <td colSpan="1">{data[0].t1_scholastic_workeducation}</td>
                    </tr>
                    <tr>
                      <td>GK</td>
                      <td colSpan="1">{data[0].t1_scholastic_gk}</td>
                    </tr>
                  </tbody>
                </table>
                {/* <!-- Table Four******************************************************************************** --> */}

                <table className="mytable capitalize ">
                  <thead>
                    <tr>
                      <th colSpan="3" className="table-heading">
                        Part 3: Dispcipline (to be assessed on a 3 point scale)
                      </th>
                    </tr>
                    <tr>
                      <th className="heading">Activities</th>
                      <th className="heading">Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Discipline</td>
                      <td colSpan="1">{data[0].t1_scholastic_deciplin}</td>
                    </tr>
                  </tbody>
                </table>
                {/* <!-- Table Five******************************************************************************** --> */}

                <table className="mytable ">
                  <thead>
                    <tr>
                      <td colSpan="1" className="heading">
                        Attendance
                      </td>
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

                      <td colSpan={2} className="noborder w-1/4">
                        &nbsp;
                      </td>
                      <td className="noborder w-1/4">&nbsp;</td>
                      <td className="noborder w-1/4">&nbsp;</td>
                    </tr>
                    <tr className="noborder">
                      <td className="noborder w-1/4 ">Class Teacher</td>
                      <td colSpan={2} className="noborder w-1/4"></td>
                      <td className="noborder w-1/4">
                        Principal / HeadMistress
                      </td>
                      <td className="noborder w-1/4">Parent Signature</td>
                    </tr>
                  </tbody>
                </table>
                {/* <!-- Table nine******************************************************************************** --> */}

                <table className="mytable myborder ">
                  <tbody>
                    <tr>
                      <td colSpan="1" className="heading">
                        Exam Result Date
                      </td>

                      <td colSpan="1" className="noborder">
                        {" "}
                        {formattedDate}
                      </td>
                    </tr>
                  </tbody>
                </table>
                {/* <!-- Table Ten******************************************************************************** --> */}
                <table className="mytable myborder">
                  <thead>
                    <tr>
                      <th colSpan="14" className="table-heading">
                        Grading System
                      </th>
                    </tr>
                    <tr>
                      <th colSpan="6" className="heading">
                        Scholastic Area(Grading on 8 Point Scale)
                      </th>
                      <th className="noborder"></th>
                      <th colSpan="6" rowSpan="3" className="heading">
                        Co-Scholastic Activities : Part 2<br />
                        Discipline : Part 3<br />
                        (Grading on 3 Point Scale)
                      </th>
                    </tr>
                    <tr>
                      <th colSpan="4" className="heading">
                        Grade
                      </th>
                      <th colSpan="2" className="heading">
                        Marks Range
                      </th>
                      <th className="noborder"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan="4">A1</td>
                      <td colSpan="2">91-100</td>
                      <td className="noborder"></td>
                      <td colSpan="2">Grade</td>
                      <td colSpan="4">Grade Points</td>
                    </tr>
                    <tr>
                      <td colSpan="4">A2</td>
                      <td colSpan="2">81-90</td>
                      <td className="noborder"></td>
                      <td colSpan="2">A</td>
                      <td colSpan="4">3</td>
                    </tr>
                    <tr>
                      <td colSpan="4">B1</td>
                      <td colSpan="2">71-80</td>
                      <td className="noborder"></td>
                      <td colSpan="2">B</td>
                      <td colSpan="4">2</td>
                    </tr>
                    <tr>
                      <td colSpan="4">B2</td>
                      <td colSpan="2">61-70</td>
                      <td className="noborder"></td>
                      <td colSpan="2">c</td>
                      <td colSpan="4">1</td>
                    </tr>
                    <tr>
                      <td colSpan="4">C1</td>
                      <td colSpan="2">51-60</td>
                      <td className="noborder"></td>
                      <td colSpan="6" class="noborder"></td>
                    </tr>
                    <tr>
                      <td colSpan="4">C2</td>
                      <td colSpan="2">41-50</td>
                      <td className="noborder"></td>
                      <td colSpan="6" class="noborder"></td>
                    </tr>
                    <tr>
                      <td colSpan="4">D</td>
                      <td colSpan="2">33-40</td>
                      <td className="noborder"></td>
                      <td colSpan="6" class="noborder"></td>
                    </tr>
                    <tr>
                      <td colSpan="4">E (Needs Improved)</td>
                      <td colSpan="2">1-31</td>
                      <td className="noborder"></td>
                      <td colSpan="6" class="noborder"></td>
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

export default ReportCardTwo;
