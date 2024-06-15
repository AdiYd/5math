import './Components.css';


function Checkbox({
    color = 'var(--constThemeColor)',
    ...props }) {

    return (
        <div className="checkBoxDiv">
            <input
                style={{ accentColor: color }}
                type="checkbox" {...props} />
        </div>
    )
}

export default Checkbox;