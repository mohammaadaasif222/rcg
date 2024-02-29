import ChartOne from "./ChartOne.js";
import ChartTwo from "./ChartTwo.js";
import ChartThree from "./ChartThree.js";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import ChartFour from "./ChartFour.js";
import ChartFive from "./ChartFive.js";
import ChartSix from "./ChartSix.js";
import { fetchStudentData } from "../../redux/actions.js";

const d = new Date();
let fulldate = d.toLocaleDateString();
let fulltime = d.toLocaleTimeString();

const posts = [
  {
    id: 1,
    title: "Exploring Gender Distribution in a Classroom",
    date: fulldate,
    datetime: fulltime,
    description: "An analysis of the composition of boys and girls in a class, presented through a graphical representation.",
    component: <ChartOne />,
  },
  {
    id: 2,
    title: "Gender and Category Graph",
    date: fulldate,
    datetime: fulltime,
    description: "Analyzing the relationship between gender and category in a class.",
    component: <ChartTwo />,
  },
  {
    id: 3,
    title: "Gender and Religion Graph",
    date: fulldate,
    datetime: fulltime,
    description: "Exploring the correlation between gender and religion in a classroom setting.",
    component: <ChartThree />,
  },
  {
    id: 4,
    title: "Gender and Admission Category Graph",
    date: fulldate,
    datetime: fulltime,
    description: "Visualizing gender distribution based on admission categories.",
    component: <ChartFour />,
  },
  {
    id: 5,
    title: "Gender and Socioeconomic Factors Graph",
    date: fulldate,
    datetime: fulltime,
    description: "Examining the connection between gender and socioeconomic factors like BPL/EWS.",
    component: <ChartFive />,
  },
  {
    id: 6,
    title: "Gender and Diversity Graph",
    date: fulldate,
    datetime: fulltime,
    description: "Investigating gender distribution among differently-abled students and teacher wards.",
    component: <ChartSix />,
  },
];

export default function Blocks() {
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
                    Graph View Of Data
                  </h2>
                  <p className="mt-2 text-lg leading-8 text-gray-600">
                    Understand Your data Using Graphs
                  </p>
                </div>
              </div>

              <div className="mx-auto mt-0 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-0 border-t border-gray-200 pt-10 sm:mt-2 sm:pt-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 ">
                {posts.map((post) => (
                  <article
                    key={post.id}
                    className="shadow-lg p-3 border-b-2 mb-10 flex max-w-2xl flex-col items-start justify-between"
                  >
                    <div className="flex items-center gap-x-4 text-xs">
                      <time dateTime={post.datetime} className="text-gray-500">
                        {post.date}
                      </time>
                      <a
                        href="#"
                        className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                      >
                        {post.title}
                      </a>
                    </div>
                    <div className="group relative">
                      <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                        <a href="#">
                          <span className="absolute inset-0" />
                          {post.title} {selectedClass}
                        </a>
                      </h3>
                      <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                        {post.description}
                      </p>
                    </div>
                    {post.component}
                  </article>

                ))}
              </div>
            </div>
          </div>
        </div>
    </>
  );
}
