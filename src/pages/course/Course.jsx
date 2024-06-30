import React, { useState } from 'react';
import './CourseContainer.css';
import Menu from '../../components/Menu';
import { debug } from '../../assets/function/functions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import VideoEmb from '../../components/VideoEmb';
import { faAngleRight, faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';

const Course = ({courseList={},topic,...props}) => {
  const [selectedContent, setSelectedContent] = useState('Select a menu item');
  const [menuOpen, setMenuOpen] = useState(true);

  const handleMenuClick = (content) => {
    setSelectedContent(content);
  };

  return (
    <div className="courseContainer">
      <div id='courseMenu' className={`menu boxShadow lineargrad ${menuOpen ? 'open' : 'closed'}`}>
        <div className="flex blackOnWhite between pointer pt3 pb3"
        style={{padding:'1em 0.5em'}}
        onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen && <a>{topic}</a>}
          <FontAwesomeIcon 
          className='hoverTheme'
          title={!menuOpen ? 'פתיחה': 'צמצום'} 
          icon={!menuOpen ? faAnglesLeft: faAnglesRight} size='lg'/>
        </div>
        <Menu items={courseList} onMenuClick={handleMenuClick} />
      </div>
      <div className="content">
        <h2>{selectedContent}</h2>
        <VideoEmb width='800' height='400' />
      </div>
      <button className="mobile-menu-button" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>
    </div>
  );
};

export default Course;
