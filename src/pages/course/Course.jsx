import React, { useEffect, useState } from 'react';
import './CourseContainer.css';
import { debug } from '../../assets/function/functions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import VideoEmb from '../../components/VideoEmb';
import { faAngleRight, faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import useWindowDimensions from '../../assets/function/useWindowDimentions';
import CourseMenu from '../../components/Menu';

const Course = ({courseList={},topic,...props}) => {
  const [selectedContent, setSelectedContent] = useState('Select a menu item');
  const [menuOpen, setMenuOpen] = useState(Boolean(Object.keys(courseList).length));
  const {width, height} = useWindowDimensions();

  useEffect(()=>{
    if (!menuOpen&& Object.keys(courseList).length){
      setMenuOpen(true);
    }
  },[courseList, topic])

  const handleMenuClick = (content) => {
    setSelectedContent(content);
  };

  return (
    <div className="courseContainer">
      <div id='courseMenu' className={`menu squarish lineargrad ${menuOpen ? 'open' : 'closed'}`}>
        <div className="flex blackOnWhite between pointer pt3 pb3"
        style={{padding:'1em 0.5em'}}
        onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen && <h3 className='m0'>{topic}</h3>}
          <FontAwesomeIcon 
          className='hoverTheme'
          title={!menuOpen ? 'פתיחת תפריט': 'צמצום תפריט'} 
          icon={!menuOpen ? faAnglesLeft: faAnglesRight} size='lg'/>
        </div>
        {menuOpen && <CourseMenu items={courseList} onMenuClick={handleMenuClick} />}
      </div>
      <div className="content">
        <p className='w500'>{selectedContent}</p>
        <VideoEmb
          width={Math.min(width/1.5, 750)} height={Math.max(width*0.7/2,260)} />
      </div>
      <button className="mobile-menu-button" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>
    </div>
  );
};

export default Course;
