export const SelectColorComponent = ({ colors, i, handleClick }) => {
    return <div style={
        {
            fontSize: '20px',
            padding: '10px',
            border: '2px solid black',
            transition: 'border-color 0.3s ease',
            borderRadius: '5px',
            cursor: 'pointer'
        }}
        id={`card-${i}`}
        onClick={() => handleClick(i)}
    >
        <p>{colors[i]}</p>
    </div>
}