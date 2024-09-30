import React from 'react';


import '../course-menagement/courseMenagement.css';
import '../../components/navbar/navBar'
import Navbar from '../../components/navbar/navBar';

function CourseManagement() {
  return (
    <main> 
        <Navbar></Navbar>

        <div>
            <h1>Gerenciamento de Disciplinas</h1>
        </div>
    </main>
  );
}

export default CourseManagement;
