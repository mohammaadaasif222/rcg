import {
  FETCH_STUDENT_DATA_REQUEST,
  FETCH_STUDENT_DATA_SUCCESS,
  FETCH_STUDENT_DATA_FAILURE,
  UPDATE_STUDENT_SUCCESS,
  FETCH_STUDENT_MARKS_REQUEST,
  FETCH_STUDENT_MARKS_SUCCESS,
  FETCH_STUDENT_MARKS_FAILURE,
  UPDATE_STUDENT_MARKS_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  FETCH_TEACHERS_REQUEST,
  FETCH_TEACHERS_SUCCESS,
  FETCH_TEACHERS_FAILURE,
  FETCH_CLASSES_REQUEST,
  FETCH_CLASSES_SUCCESS,
  FETCH_CLASSES_FAILURE,
  UPDATE_CLASSES_SUCCESS,
  UPDATE_CLASSES_FAILURE,
  REMOVE_CLASS_SUCCESS,
  REMOVE_CLASS_FAILURE,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  SET_SELECTED_VALUES,
} from "./actions";

const initialState = {
  students: [],
  marks: [],
  Allteachers: [],
  Allclasses: [],
  selectedValues: [],
  user: null,
  loading: false,
  error: null,
  close: false,
};
export const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STUDENT_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_STUDENT_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        students: action.payload || [],
      };

    case FETCH_STUDENT_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        students: [],
      };

    case UPDATE_STUDENT_SUCCESS:
      const updatedStudents = state.students.map((student) =>
        student.id === action.payload.id ? action.payload : student
      );
      return {
        ...state,
        students: updatedStudents,
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};

export const studentMarksReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STUDENT_MARKS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_STUDENT_MARKS_SUCCESS:
      return {
        ...state,
        loading: false,
        marks: action.payload || [],
      };

    case FETCH_STUDENT_MARKS_FAILURE:
      return {
        ...state,
        loading: false,
        marks: [],
        error: action.payload,
      };

    case UPDATE_STUDENT_MARKS_SUCCESS:
      const updatedStudentsMarks = state.marks.map((marks) =>
        marks.id === action.payload.id ? action.payload : marks
      );
      return {
        ...state,
        marks: updatedStudentsMarks,
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case LOGOUT:
      return {
        ...state,
        user: null,
        loading: false,
        error: null,
      };
    case UPDATE_USER_SUCCESS:
      const { updatedfield, updatedvalue } = action.payload;

      const updatedUser = {
        ...state.user.user,
        user: {
          ...state.user.user,
          [updatedfield]: updatedvalue,
        },
      };

      return {
        ...state,
        user: updatedUser,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
///////////////////////////////////////////

export const teacherReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TEACHERS_REQUEST:
      return { ...state, loading: true };
    case FETCH_TEACHERS_SUCCESS:
      return { loading: false, Allteachers: action.payload, error: "" };
    case FETCH_TEACHERS_FAILURE:
      return { loading: false, Allteachers: [], error: action.payload };
    case "CLOSE":
      return { ...state, close: action.payload };

    default:
      return state;
  }
};

///////////////////////////////////
export const classesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CLASSES_REQUEST:
      return { ...state, loading: true };

    case FETCH_CLASSES_SUCCESS:
      return { loading: false, Allclasses: action.payload, error: null };

    case FETCH_CLASSES_FAILURE:
      return { loading: false, Allclasses: [], error: action.payload };

    case UPDATE_CLASSES_SUCCESS:
      const { teacherId, className, subjects } = action.payload;
      const updatedClasses = state.Allclasses.map((classData) => {
        if (classData.class_name === className) {
          return {
            ...classData,
            ...subjects,
          };
        }
        return classData;
      });

      return {
        ...state,
        Allclasses: updatedClasses,
        loading: false,
        error: null,
      };

    case REMOVE_CLASS_SUCCESS:
      const updatedData = state.Allclasses.filter(
        (classes) => classes.class_name !== action.payload.class_name
      );
      return {
        ...state,
        Allclasses: updatedData,
        loading: false,
        error: null,
      };

    case REMOVE_CLASS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

///////////////////////////////
export const selectReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SELECTED_VALUES":
      return { ...state, selectedValues: action.payload };
    default:
      return state;
  }
};
