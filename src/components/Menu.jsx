import React, { useEffect, useState } from 'react';
import './Components.css';
import '../pages/course/CourseContainer.css';
import { debug } from '../assets/function/functions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';

export const arrowDown = <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    height="24px" viewBox="0 0 24 24" 
                    width="24px" 
                    fill="var(--themeColorText)">
                    <path d="M24 24H0V0h24v24z" fill="none" opacity=".87"/><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z"/></svg>;
export const arrowUp = <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    height="24px" 
                    viewBox="0 0 24 24" 
                    width="24px" 
                    fill="var(--themeColorText)">
                    <path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14l-6-6z"/></svg>;

const CourseMenu = ({ items, menuPath,onMenuClick }) => {
  const [update, setUpdate] = useState(false);
  useEffect(()=>{
    setUpdate(p=>!p);
  },[items])

  return (
    <ul className="menu-list">
      {Object.keys(items).map((item, index) => {
        const mainTitle = item;
        const topic = items[item];;
        return (
          <MenuItem
            key={index + mainTitle}
            menuPath={menuPath}
            title={mainTitle}
            topic={topic}
            onMenuClick={onMenuClick}
          />
        );
      })}
    </ul>
  );
};

const MenuItem = ({ title, topic,menuPath, onMenuClick }) => {
  const [open, setOpen] = useState(menuPath?.title === title);
  const [lesson, setLesson] = useState(menuPath?.lesson);
  let isSubMenu = Object.keys(topic).length;
  useEffect(()=>{
    setLesson(menuPath.lesson);
    // setOpen(menuPath?.title === title);
  },[menuPath.title])

  const onTitleClick = ()=>{
    // if (!open){
    //  onMenuClick({title:title})
    // }
    setOpen(!open); 
  }
  const onLossonClick = (lessonName)=>{
    setLesson(lessonName); 
    onMenuClick({title: title, lesson: lessonName});
  }

  return (
    <li>
      <div 
        style={{alignItems:'flex-start', gap:'0.2em'}}
        className={`flex tStart ${open ? 'bold':''}`} 
        onClick={onTitleClick} >
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
            key={title+lessonName} 
            onClick={()=> onLossonClick(lessonName)}>
              {lessonName}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default CourseMenu;
