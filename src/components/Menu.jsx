import React, { useState } from 'react';
import './Components.css';
import '../pages/course/CourseContainer.css';
import { debug } from '../assets/function/functions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';

const arrowDown = <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    height="24px" viewBox="0 0 24 24" 
                    width="24px" 
                    fill="var(--themeColorText)">
                    <path d="M24 24H0V0h24v24z" fill="none" opacity=".87"/><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z"/></svg>;
const arrowUp = <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    height="24px" 
                    viewBox="0 0 24 24" 
                    width="24px" 
                    fill="var(--themeColorText)">
                    <path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14l-6-6z"/></svg>;

const Menu = ({ items, onMenuClick }) => {
  return (
    <ul className="menu-list">
      {Object.keys(items).map((item, index) => {
        const mainTitle = item;
        const topic = items[item];
        if (topic === 'href'){
          debug('Aura!');
          return
        }
        return (
          <MenuItem
            key={index}
            title={mainTitle}
            topic={topic}
            onMenuClick={onMenuClick}
          />
        );
      })}
    </ul>
  );
};

const MenuItem = ({ title, topic, onMenuClick }) => {
  const [open, setOpen] = useState(false);
  const [lesson, setLesson] = useState();

  let isSubMenu = Object.keys(topic).length;
  return (
    <li>
      <div 
        style={{alignItems:'flex-start', gap:'0.2em'}}
        className={`flex tStart ${open ? 'bold':''}`} 
        onClick={() => setOpen(!open)}>
        {title} {isSubMenu && <div 
        style={{fill:'var(--themeColorText)'}}
        title={open ? 'סגירה':'פתיחה'} > 
        {open ? arrowUp: arrowDown}</div>}
      </div>
      {open && isSubMenu && (
        <ul className="submenu">
          {Object.keys(topic).map((lessonName, index) => (
            <li 
            title={lessonName}
            className='pointer squarish'
            style={lesson === lessonName ? {color: 'var(--themeColor)', fontWeight:'500'}:{}}
            key={index} onClick={() =>{setLesson(lessonName); onMenuClick(`קישור ל: ${title} > ${lessonName}`)}}>
              {lessonName}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default Menu;
