import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CourseCard from "../../components/CourseCard";
import HomeLayout from "../../layouts/HomeLayout";
import { getAllCourses } from "../../redux/slices/courseSlice";
import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function CourseList() {
  const [courses, setcourses] = useState([]);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { courseList } = useSelector((state) => state.course);

  async function loadCourses() {
    await dispatch(getAllCourses());
  }

  useEffect(() => {
    loadCourses();
    getCourses();
  }, []);

  const getCourses = async () => {
    await axios
      .get("http://localhost:9034/api/v1/courses/")
      .then((res) => {
        console.log(res.data.courses);
        setcourses(res.data.courses);
        console.log("cons", courses);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <HomeLayout className="relative">
      <div
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded absolute top-10 right-10"
        onClick={() => navigate("/course/create")}
      >
        Add courses
      </div>
      <div className="min-h-[90vh] pt-12 pl-20 flex flex-col gap-10 text-white">
        <h1 className="text-center text-4xl font-semibold mb-5">
          Explore courses made by
          <span className="font-bold text-yellow-500">Industry experts</span>
        </h1>
        <div className="mb-10 flex flex-wrap gap-14">
          {/* {courseList?.map((element) => {
            return <CourseCard key={element._id} data={element} />;
          })} */}
          {courses.map((course) => {
            return <CourseCard key={course._id} data={course} />;
          })}
        </div>
      </div>
    </HomeLayout>
  );
}

export default CourseList;
