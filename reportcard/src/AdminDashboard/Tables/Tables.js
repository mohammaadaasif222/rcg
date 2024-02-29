import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchStudentData } from "../../redux/actions.js";
import TableOne from "./TableOne.js";
import TableTwo from "./TableTwo.js";
import TableThree from "./TableThree.js";
import TableFour from "./TableFour.js";
import TableFive from "./TableFive.js";
import TableSix from "./TableSix.js";
import { useSelector } from "react-redux";

const d = new Date();
let fulldate = d.toLocaleDateString();
let fulltime = d.toLocaleTimeString();

const posts = [
  {
    id: 1,
    title: "Classroom Gender Distribution Table",
    date: fulldate,
    datetime: fulltime,
    description: "A table presenting the count of boys and girls in a class.",
    component: <TableOne />,
  },
  {
    id: 2,
    title: "Gender and Category Table",
    date: fulldate,
    datetime: fulltime,
    description: "A table displaying the relationship between gender and category in a class.",
    component: <TableTwo />,
  },
  {
    id: 3,
    title: "Gender and Religion Table",
    date: fulldate,
    datetime: fulltime,
    description: "A table illustrating the correlation between gender and religion in a classroom.",
    component: <TableThree />,
  },
  {
    id: 4,
    title: "Gender and Admission Category Table",
    date: fulldate,
    datetime: fulltime,
    description: "A table visualizing gender distribution based on admission categories.",
    component: <TableFour />,
  },
  {
    id: 5,
    title: "Gender and Socioeconomic Factors Table",
    date: fulldate,
    datetime: fulltime,
    description: "A table examining the connection between gender and socioeconomic factors like BPL/EWS.",
    component: <TableFive />,
  },
  {
    id: 6,
    title: "Gender and Diversity Table",
    date: fulldate,
    datetime: fulltime,
    description: "A table investigating gender distribution among differently-abled students and teacher wards.",
    component: <TableSix />,
  },
];

export default function Tables() {
  const dispatch = useDispatch();
  const selectedVal = useSelector(
    (state) => state.selectedValues.selectedValues
  );
  const selectedClass = selectedVal[0];
  const selectedSection = selectedVal[1];

  useEffect(() => {
    dispatch(fetchStudentData(selectedClass, selectedSection));
  }, [dispatch, selectedClass, selectedSection]);

  return (
    <>
      <div className="p-3 bg-white w-full shadow-xl rounded-lg">
        <div>
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Table View Of Data
                </h2>
                <p className="mt-2 text-lg leading-8 text-gray-600">
                  Understand Your data Using Table
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="max-w-full bg-white p-3 rounded-lg shadow-md"
                >
                  <div className="text-xs">
                    <span className="text-gray-900">
                      {post.date} {post.datetime}
                    </span>
                  </div>
                  <div className="group relative mt-2">
                    <h3 className="text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                      <a href="#" className="group-hover:underline">
                        {post.title} {selectedClass}
                      </a>
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">
                      {post.description}
                    </p>
                  </div>
                  <div className="overflow-x-auto mt-2">
                    {post.component}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
