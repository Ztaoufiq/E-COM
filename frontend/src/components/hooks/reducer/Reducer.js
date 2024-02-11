import React, { useReducer } from 'react'

export default function Reducer() {

    const InitialState = {
        email: "",
        username: ""
    }

    const reducer = (state, action) => {
        switch (action.type) {
            case "input":
                return {...state, [action.field] : action.payload};
            case "reset":
                return InitialState;
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(reducer, InitialState);

    const handleOnChange = (e) => {
        console.log('change');
        dispatch({
            type: "input",
            field: e.target.name,
            payload: e.target.value
        })
    }

    const handleReset = () => { dispatch({ type: "reset" }) }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Reducer :');
        console.log(state);
        return state;
    }

    return (
        <div className="text-white bg-secondary">
            <div className="card-header">Get the State submited in your Console </div>
            <div className="card-body">
                <form>
                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" onChange={handleOnChange} value={state.email} className="form-control" name="email" placeholder="Enter email" />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="username" onChange={handleOnChange} value={state.username} className="form-control" name="username" placeholder="username" />
                    </div>
                    <button type='button' onClick={handleSubmit} className="btn btn-primary btn-lg btn-block card-title">Submit</button>
                    <button type='button' onClick={handleReset} className="btn btn-primary btn-lg btn-block card-title">Reset</button>
                </form>
            </div>
        </div>
    )
}
