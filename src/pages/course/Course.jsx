import React, { useEffect, useState } from 'react';
import './CourseContainer.css';
import { debug } from '../../assets/function/functions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import VideoEmb from '../../components/VideoEmb';
import { faAngleRight, faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import useWindowDimensions from '../../assets/function/useWindowDimentions';
import CourseMenu from '../../components/Menu';
import { allCourses, topicsList } from '../App';
import { Link } from 'react-router-dom';
import { Cookies, useCookies } from 'react-cookie';

const courseTranslate = {
  'אנליטית': 'analytic',
  'וקטורים' : 'vectors',
  'מרוכבים': 'complex',
  'חדו"א': 'calculus',
  'משוואות מעריכיות': 'logarithm'
}

const Course = ({topic = 'בחרו קורס',...props}) => {
  const [courseList, setCourseList] = useState(allCourses[topic]||{});
  const [selectedContent, setSelectedContent] = useState('בחרו קורס');
  const [cookie, setCookie, removeCookie] = useCookies();
  const [course, setCourse] = useState();
  const [menuPath, setMenuPath] = useState(cookie[`menuPath_${courseTranslate[topic]}`]);
  const [menuOpen, setMenuOpen] = useState(Boolean(Object.keys(courseList).length));
  const {width, height} = useWindowDimensions();

  useEffect(()=>{
    setCourseList(allCourses[topic]||{})
    if (!menuOpen && Object.keys(allCourses[topic]||{}).length){
      setMenuOpen(true);
    }
    let checkPath = cookie[`menuPath_${courseTranslate[topic]}`];
    setMenuPath(checkPath);
    if (checkPath){
        setSelectedContent(`${checkPath?.title} + ${checkPath?.lesson||''}`);
    }
  },[topic])

  const handleMenuClick = (content) => {
    let pathName = `menuPath_${courseTranslate[topic]}`, maxAge = 60*60*24*10;
    debug('Have cockie: ', content, pathName);
    setCookie(pathName,JSON.stringify(content),{maxAge});
    setMenuPath(content)
    setSelectedContent(`${content?.title} + ${content?.lesson||''}`);
  };

  let courseContainer = <div className="courseContainer">
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
                        {menuOpen && <CourseMenu 
                        menuPath ={menuPath}
                        items={courseList} 
                        topic={topic} 
                        onMenuClick={handleMenuClick} />}
                  </div>
                  <div className="content">
                      <p className='w500'>{selectedContent}</p>
                      <VideoEmb
                        width={Math.min(width/1.5, 750)} height={Math.max(width*0.7/2,260)} />
                  </div>
                </div>

  return (
    <div>
        <div className="fill fillH border squarish">
            {courseContainer}
        </div>
    </div>
  );
};

export default Course;
