import axios from "axios";
import {URL} from '../URL'
// Student Data Actions
export const FETCH_STUDENT_DATA_REQUEST = "FETCH_STUDENT_DATA_REQUEST";
export const FETCH_STUDENT_DATA_SUCCESS = "FETCH_STUDENT_DATA_SUCCESS";
export const FETCH_STUDENT_DATA_FAILURE = "FETCH_STUDENT_DATA_FAILURE";
export const UPDATE_STUDENT_SUCCESS = "UPDATE_STUDENT_SUCCESS";
export const UPDATE_STUDENT_FAILURE = "UPDATE_STUDENT_FAILURE";

// Marks Actions
export const FETCH_STUDENT_MARKS_REQUEST = "FETCH_STUDENT_MARKS_REQUEST";
export const FETCH_STUDENT_MARKS_SUCCESS = "FETCH_STUDENT_MARKS_SUCCESS";
export const FETCH_STUDENT_MARKS_FAILURE = "FETCH_STUDENT_MARKS_FAILURE";
export const UPDATE_STUDENT_MARKS_SUCCESS = "UPDATE_STUDENT_MARKS_SUCCESS";
export const UPDATE_STUDENT_MARKS_FAILURE = "UPDATE_STUDENT_MARKS_FAILURE";

// Authentication Actions
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILURE = "UPDATE_USER_FAILURE";

// teacher Actions
export const FETCH_TEACHERS_REQUEST = "FETCH_TEACHERS_REQUEST";
export const FETCH_TEACHERS_SUCCESS = "FETCH_TEACHERS_SUCCESS";
export const FETCH_TEACHERS_FAILURE = "FETCH_TEACHERS_FAILURE";

// classes Actions

// Student Data Action Creators
export const fetchStudentDataRequest = () => ({
  type: FETCH_STUDENT_DATA_REQUEST,
});

export const fetchStudentDataSuccess = (data) => ({
  type: FETCH_STUDENT_DATA_SUCCESS,
  payload: data,
});

export const fetchStudentDataFailure = (error) => ({
  type: FETCH_STUDENT_DATA_FAILURE,
  payload: error,
});

export const fetchStudentData = (className,sectionName) => {
  return async (dispatch) => {
    dispatch(fetchStudentDataRequest());

    try {
      const response = await axios.post(`${URL}/studentdata`, {
        className,sectionName
      });
      dispatch(fetchStudentDataSuccess(response.data));
    } catch (error) {
      dispatch(fetchStudentDataFailure(error.message));
    }
  };
};

export const updateStudentSuccess = (success, updatedStudent) => ({
  type: UPDATE_STUDENT_SUCCESS,
  payload: { success, data: updatedStudent },
});

export const updateStudentFailure = (error) => ({
  type: UPDATE_STUDENT_FAILURE,
  payload: error,
});

export const updateStudent =
  (updatedStudent, selectedClass,selectedSection) => async (dispatch) => {
    try {
      const response = await axios.put(
        `${URL}/studentdata/${updatedStudent.adm_no}`,
        { updatedStudent, selectedClass ,selectedSection}
      );
      dispatch(updateStudentSuccess(true, response.data));
      return response.data;
    } catch (error) {
      console.error("Error updating student:", error);
      dispatch(updateStudentFailure(error.message));
      throw error;
    }
  };

// Marks Action Creators
export const fetchStudentMarksRequest = () => ({
  type: FETCH_STUDENT_MARKS_REQUEST,
});

export const fetchStudentMarksSuccess = (marks) => ({
  type: FETCH_STUDENT_MARKS_SUCCESS,
  payload: marks,
});

export const fetchStudentMarksFailure = (error) => ({
  type: FETCH_STUDENT_MARKS_FAILURE,
  payload: error,
});

export const fetchStudentMarks = (selectedClass, selectedSubject,selectedSection) => {
  return async (dispatch) => {
    try {
      const section = selectedSection.toLowerCase();
      const response = await axios.post(`${URL}/student/marks`, {
        selectedClass,
        selectedSubject,
        selectedSection: section,
      });
      dispatch(fetchStudentMarksSuccess(response.data));
    } catch (error) {
      dispatch(fetchStudentMarksFailure(error.message));
    }
  };
};

export const updateStudentMarksSuccess = (success, updatedStudentMarks) => ({
  type: UPDATE_STUDENT_MARKS_SUCCESS,
  payload: { success, marks: updatedStudentMarks },
});

export const updateStudentMarksFailure = (error) => ({
  type: UPDATE_STUDENT_MARKS_FAILURE,
  payload: error,
});

export const updateStudentMarks =
  (updatedStudentMarks, selectedClass, selectedSubject, adm_no,selectedSection) =>
  async (dispatch) => {
    try {
      const response = await axios.put(
        `${URL}/student/marks/${adm_no}`,
        { updatedStudentMarks, selectedClass, selectedSubject ,selectedSection}
      );
      dispatch(updateStudentMarksSuccess(true, response.data));
      return response.data;
    } catch (error) {
      console.error("Error updating student marks:", error);
      dispatch(updateStudentMarksFailure(error.message));
      throw error;
    }
  };

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (data) => ({
  type: LOGIN_SUCCESS,
  payload: data,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const logout = () => ({
  type: LOGOUT,
});

export const updateUserSuccess = (updatedfield,updatedvalue) => ({
  type: UPDATE_USER_SUCCESS,
  payload: { updatedfield,updatedvalue },
});

export const updateUserFailure = (error) => ({
  type: UPDATE_USER_FAILURE,
  payload: error,
});

export const loginUser = (userData) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await axios.post(
      `${URL}/admin/login`,
      userData
    );
    const data = response.data;
    dispatch(loginSuccess(data));
    return data;
  } catch (error) {
    console.error("Error during login:", error);
    dispatch(loginFailure("Error during login"));
  }
};
////////////////////////////////////////////////////////////////

// TEACEHR Action Creators
const fetchTeachersRequest = () => ({ type: FETCH_TEACHERS_REQUEST });
const fetchTeachersSuccess = (Allteachers) => ({
  type: FETCH_TEACHERS_SUCCESS,
  payload: Allteachers,
});
const fetchTeachersFailure = (error) => ({
  type: FETCH_TEACHERS_FAILURE,
  payload: error,
});

export const fetchTeachers = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/staff/teachers`);
      dispatch(fetchTeachersSuccess(response.data));
    } catch (error) {
      dispatch(fetchTeachersFailure(error.message));
    }
  };
};


/////////////////////////////
// CLASSES  Action Creators

export const FETCH_CLASSES_REQUEST = "FETCH_CLASSES_REQUEST";
export const FETCH_CLASSES_SUCCESS = "FETCH_CLASSES_SUCCESS";
export const FETCH_CLASSES_FAILURE = "FETCH_CLASSES_FAILURE";

export const UPDATE_CLASSES_SUCCESS = "UPDATE_CLASSES_SUCCESS";
export const UPDATE_CLASSES_FAILURE = "UPDATE_CLASSES_FAILURE";

export const REMOVE_CLASS_SUCCESS = "REMOVE_CLASS_SUCCESS";
export const REMOVE_CLASS_FAILURE = "REMOVE_CLASS_FAILURE";

export const fetchClassesRequest = () => ({ type: FETCH_CLASSES_REQUEST });
export const fetchClassesSuccess = (Allclasses) => ({
  type: FETCH_CLASSES_SUCCESS,
  payload: Allclasses,
});
export const fetchClassesFailure = (error) => ({
  type: FETCH_CLASSES_FAILURE,
  payload: error,
});

export const fetchClasses = () => {
  return async (dispatch) => {
    dispatch(fetchClassesRequest());
    try {
      const response = await axios.get(`${URL}/staff/classes`);
      dispatch(fetchClassesSuccess(response.data));
    } catch (error) {
      dispatch(fetchClassesFailure(error.message));
    }
  };
};

export const updateClassesSuccess = (teacherId, className, subjects,section) => ({
  type: UPDATE_CLASSES_SUCCESS,
  payload: { teacherId, className, subjects,section },
});

export const updateClassesFailure = (error) => ({
  type: UPDATE_CLASSES_FAILURE,
  payload: { error },
});

export const updateClasses = (selectedTeacher, selectedClass, selectedSubjects,selectedSection) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${URL}/staff/updatedata`,
      { selectedTeacher, selectedClass, selectedSubjects,selectedSection }
    );

    dispatch(updateClassesSuccess(selectedTeacher, selectedClass,selectedSection, response.data));
    return response.data;
  } catch (error) {
    console.error("Error updating student marks:", error);
    dispatch(updateClassesFailure(error.message));
    throw error;
  }
};

export const removeClassSuccess = (success, updatedData) => ({
  type: REMOVE_CLASS_SUCCESS,
  payload: { success, updatedData },
});

export const removeClassFailure = (error) => ({
  type: REMOVE_CLASS_FAILURE,
  payload: { error },
});

export const removeClass = (selectedTeacher, selectedClass, subject) => async (dispatch) => {
  try {
    await axios.post(`${URL}/staff/removedata`, {
      selectedTeacher,
      selectedClass,
      subject,
    });

    const response = await axios.get(`${URL}/staff/classes`);
    dispatch(removeClassSuccess(true, response.data));
  } catch (error) {
    console.error("Error removing class:", error);
    dispatch(removeClassFailure(error.message));
    throw error;
  }
};
////////////////////////////////////////////////
export const SET_SELECTED_VALUES = "SET_SELECTED_VALUES";
// actions.js
export const setSelectedValues = (selectedValues) => ({
  type: 'SET_SELECTED_VALUES',
  payload: selectedValues,
});
export const setMenuClose= (close) => ({
  type: 'CLOSE',
  payload: close,
});

/////////////////////////////////////////////////