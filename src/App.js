import React, { useState } from 'react';
import './App.css';

function App() {
  
  const [rollNumber, setRollNumber] = useState('');
  const [currentSubject, setCurrentSubject] = useState('');
  const [currentMark, setCurrentMark] = useState('');
  const [students, setStudents] = useState([]);
  const [subjectMarks, setSubjectMarks] = useState({});
  const [subjectNames, setSubjectNames] = useState([]);
  

  const addStudent = () => {
    if (rollNumber && Object.keys(subjectMarks).length > 0) {
      const newStudent = { rollNumber, subjectMarks: { ...subjectMarks } };
      setStudents([...students, newStudent]);
      setRollNumber('');
      setSubjectMarks({});
    }
  };

  const addSubjectMark = () => {
    if (currentSubject && currentMark) {
      setSubjectMarks({ ...subjectMarks, [currentSubject]: parseFloat(currentMark) });
      setSubjectNames([...subjectNames, currentSubject]);
      setCurrentSubject('');
      setCurrentMark('');
    }
  };

  const calculateCGPA = (marks) => {
    const totalMarks = Object.values(marks).reduce((total, mark) => total + mark, 0);
    const totalSubjects = Object.keys(marks).length;
    const cgpa = totalMarks / (totalSubjects * 10);
    return cgpa.toFixed(2);
  };

  const calculateTotalCGPA = () => {
    const totalMarks = students.reduce((total, student) => {
      const studentTotalMarks = Object.values(student.subjectMarks).reduce((subTotal, mark) => subTotal + mark, 0);
      return total + studentTotalMarks;
    }, 0);

    const totalSubjects = subjectNames.length * students.length;
    const totalCGPA = totalMarks / (totalSubjects * 10);
    return totalCGPA.toFixed(2);
  };

  return (
    <div className="App">
      <h1>...</h1>
      <div>
        <h5>Enter Student Roll Number</h5>
        <input className='roll-no'
          type="text"
          placeholder="Roll Number"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}/><br></br>
        <h5>Enter Subject Name</h5>
        <input className='subject'
          type="text"
          placeholder="Subject"
          value={currentSubject}
          onChange={(e) => setCurrentSubject(e.target.value)}/><br></br>
        <h5>Enter marks obtained by Student in {currentSubject} </h5>
        <input className='marks'
          type="text"
          placeholder="Marks"
          value={currentMark}
          onChange={(e) => setCurrentMark(e.target.value)}/>
          <br></br><br></br>
        <button className="add-subject"onClick={addSubjectMark}>Add Subject</button><br></br><br></br>
        <button className="add-student"style={{backgroundColor: "lightblue"}}onClick={addStudent}>Add Student</button>
      </div>
      <div>
        
        <h3>CGPA: {calculateCGPA(subjectMarks)}</h3>
        <h3>Total CGPA: {calculateTotalCGPA()}</h3>
        <h2>Student List: </h2>
        <ul>
          {students.map((student, index) => (
            <li key={index}>
              Roll Number: {student.rollNumber}, Subject Marks: {JSON.stringify(student.subjectMarks)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
