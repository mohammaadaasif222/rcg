import StudentMarksPrimary from "./StudentMarksPrimary";
import StudentMarksSec from "./StudentMarksSec";
import StudentMarksSenSec from "./StudentMarksSenSec";
import { useSelector } from "react-redux";

export default function StudentMarks() {
  const selectedVal = useSelector(
    (state) => state.selectedValues.selectedValues
  );

  const selectedClassNumber = selectedVal[3];
  console.log(selectedClassNumber);
  return (
    <div>
      {selectedClassNumber >= 1 && selectedClassNumber <= 8 ? (
        <StudentMarksPrimary />
      ) : selectedClassNumber === 9 || selectedClassNumber === 10 ? (
        <StudentMarksSec />
      ) : (
        <StudentMarksSenSec />
      )}
    </div>
  );
}
