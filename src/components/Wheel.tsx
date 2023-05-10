import { useReducer, useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import WheelReducer from '../WheelReducer';

const Wheel = () => {
    const [state, dispatch] = useReducer(WheelReducer, {
        first: { title: 'iOne', value: 1, color: '#E38627' },
        second: { title: 'Two', value: 1, color: '#C13C37' },
    })
    const [inputCount, setInputCount] = useState(2);

    const addInputFunction = () => {
        // this function modifies the state that the add command to dispatch bases off of,
        // then sends a dispatch message requesting help in adding more data
        setInputCount((prev: any) => prev += 1);
        dispatch({ addInput: inputCount })
    }

    const defaultLabelStyle = {
        fontSize: '0.4em',
        fontFamily: 'sans-serif'
    }

    return(
        <div>
            <PieChart
                data={Object.values(state)}
                label={({dataEntry}) => dataEntry.title}
                labelStyle={defaultLabelStyle}
            />
            <br></br>
            <button>Go</button>
            <h4 className='label'>Limit 50 Inputs</h4>
            <div id='inputs'>
                <input id='first' onChange={(e: any) => dispatch({ location: 'first', inputData: e.target.value })} />
                <input id='second' onChange={(e: any) => dispatch({ location: 'second', inputData: e.target.value })} />
                {/* { inputCount >= 3 && <InputDivs id='third' dispatch={dispatch} setInputCount={setInputCount} num='3' />  }
                { inputCount >= 4 && <InputDivs id='fourth' dispatch={dispatch} setInputCount={setInputCount} num='4' /> }
                { inputCount >= 5 && <InputDivs id='fifth' dispatch={dispatch} setInputCount={setInputCount} num='5' /> } */}
                <button onClick={addInputFunction}>Add Another Input</button>
            </div>
        </div>
    )
}

interface InputDivsProps {
    id: string,
    dispatch: any,
    setInputCount: any,
    num: string
}
const InputDivs = (props: InputDivsProps) => {
    // const deleteData = () => {
    //     props.setInputCount((prev: any) => prev--)
    //     props.dispatch({ deleteInput: props.num })
    // }

    return(
        <div className='inputDivs'>
            <input id={props.id} onChange={(e: any) => props.dispatch({ location: props.id, inputData: e.target.value })} />
            {/* <button id={props.id + 'delete'}>Remove</button> */}
        </div>
    )
}

export default Wheel;