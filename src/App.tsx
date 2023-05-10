import { useState } from 'react'
import './App.scss'
import Wheel from './components/Wheel';

const App = () => {

  return (
    <div className="App">
        <h2 className='headings'>Definitely Good Random Item Picker</h2>
        <h3 className='headings'>Absolutely not rigged or Anything</h3>
        <h4 className='headings' id='lastHeading'>Works perfectly fine.</h4>
        <Wheel />
        <h4 className='label'>Ok, you caught me. Select this box to make it fair.</h4>
        <input type="checkbox" />
    </div>
  )
}

export default App;
