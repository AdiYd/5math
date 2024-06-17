import './Components.css';
import Logo from './Logo';


function Footer({ ...props }) {

    return (
        <div className="footer">
            <div className='flex columns center'>
                <div className='flex center ltr gap1'>
                    <Logo width='2em' height='2em' fontSize={'1em'} />
                    <h3>Website created and designed by Adi Yd @ YdSolutions </h3>
                </div>
                <h4>All rights belong to YdSolutions © 2024 </h4>
            </div>
        </div>
    )
}

export default Footer;