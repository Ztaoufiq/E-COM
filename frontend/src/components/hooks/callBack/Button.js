import React from 'react'

const Button = ({classN, text, action}) => {
    console.log('Call To Button Component');
    return (
        <button className={classN} onClick={action}>{text}</button>
    )
}

export default React.memo(Button);