import { useState } from "react"

const ScoreSubmitForm = (props) => {
    const [name, setName] = useState('')

    const handleNameChange = (event) => {
        setName(event.target.value)
    }

    const submitScore = (event) => {
        event.preventDefault()
    }
    
    return (
        <div className="submit-form">
            <form onSubmit={submitScore}>
            Enter Nickname (20 characters or less)
            <br></br>
            <br></br>
                <input required placeholder="nickname" value={name} onChange={handleNameChange}/>
                <button type="submit">submit</button>
                {props.errorMessage && <span style={{marginLeft: "1em", color: "red"}}>{props.errorMessage}</span>}
            </form>
        </div>
    )
}

export default ScoreSubmitForm