import './Components.css';
import Logo from './Logo';


function Footer({ ...props }) {

    return (
        <div className="footer">
            <div className='grid center ltr alignCenter'>
                <div style={{ gridArea: '1 / 1 / span 2 / span 1' }}>
                    <Logo linkTo='Home' whiteShadow={true}
                        rotate={false} imgWidth='2em' imgHeight='2em' fontSize={'1em'} />
                </div>
                <div style={{ gridArea: '1 / 2' }} >
                    <h3 className='ma2'>Website created and designed by Adi Yd @ YdSolutions </h3>
                </div>
                <div style={{ gridArea: '2 / 2' }} >
                    <p>Copyright © 2024 YD Solutions - All Rights Reserved.</p>
                </div>
            </div>
        </div>
    )
}

export default Footer;