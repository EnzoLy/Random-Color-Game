import { useState } from 'react';
import './App.css';
import { SelectColorComponent } from "./components/SelectColorComponent";
import { Helmet } from 'react-helmet'

const RESULT = {
    NONE: '',
    CORRECT: 'Correct',
    WRONG: 'Wrong'
};

const generateRandomColor = () => {
    const randomHexColor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomHexColor}`;
}

function App() {

    const [colors, setColors] = useState([generateRandomColor(), generateRandomColor(), generateRandomColor()]);
    const [validCounter, setvalidCounter] = useState(0);
    const [result, setResult] = useState(RESULT.NONE);
    const [validPosition, setValidPosition] = useState(Math.floor(Math.random() * 3))

    const checkValid = (i) => {

        if (result !== RESULT.NONE) return;

        const card = document.getElementById("card-" + i);
        const valid = card.id === `card-${validPosition}`;

        card.style.borderColor = valid ? 'green' : 'red';
        setResult(valid ? RESULT.CORRECT : RESULT.WRONG);

        if (valid) {
            setvalidCounter(validCounter + 1);
        } else {
            setvalidCounter(0)
        }


        setTimeout(() => {
            card.style.borderColor = 'black';

            setResult(RESULT.NONE);
            setColors([generateRandomColor(), generateRandomColor(), generateRandomColor()]);
            setValidPosition(Math.floor(Math.random() * 3))

        }, 1000);
    }

    return (
        <>
            <Helmet>
                <meta charSet='utf-8' />
                <title>Random color game</title>
                <meta name='description' content='Random color game' />
            </Helmet>
            <div className="App">
                <div className='container'>
                    <h1 style={
                        {
                            color: '#fff',
                            paddingBottom: '1rem'
                        }}
                    >Select valid color</h1>
                    <div style={
                        {
                            border: '2px solid black',
                            backgroundColor: colors[validPosition],
                            width: '200px',
                            height: '200px',
                            borderRadius: '5px',
                            display: 'flex',
                            justifyContent: 'center',
                            transition: 'all 0.5s ease',
                            alignItems: 'center'
                        }
                    }>
                        <p style={
                            {
                                fontSize: '20px',
                                padding: '10px',
                                color: colors[validPosition],
                                mixBlendMode: 'difference',
                                borderRadius: '5px',
                                transition: 'all 0.5s ease',
                            }
                        }>Total valid: {validCounter}</p>
                    </div>
                    <div className='cards'>
                        {[...Array(3)].map((x, i) =>
                            <SelectColorComponent
                                key={i}
                                colors={colors}
                                i={i}
                                handleClick={checkValid} />
                        )}

                    </div>
                    <div className='awnser'>
                        {result !== RESULT.NONE && <p style={{
                            color: result === RESULT.CORRECT ? 'green' : 'red',
                            fontSize: '20px',
                        }}>
                            {result} Awnser
                        </p>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
