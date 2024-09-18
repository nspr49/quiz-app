interface PopUpProps {
  isVisible: boolean
  won: boolean
  correctAnswer: string,
  playNewGame: () => void,
}

function PopUp({ isVisible, won, correctAnswer, playNewGame }: PopUpProps) {
  if (!isVisible) {
    return;
  }
  if (won) {
    return (
      <div className="absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-base p-8 rounded-lg shadow-lg z-50 items-center ">
        <div className="text-green justify-center text-center items-center text-2xl m-4">
          <h1>
            Correct!
          </h1 >
          <div className="bg-green text-base rounded-lg">
            <button onClick={() => {
              playNewGame()
            }} >
              Play Again!
            </button>
          </div>
        </div >
      </div >
    )
  }

  return (
    <div className="absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-base p-8 rounded-lg shadow-lg z-50">
      <div className="text-love justify-center text-center items-center text-2xl m-4">
        <h1>False!</h1>
        <p>The correct answer was {correctAnswer}  </p>
        <div className="bg-love text-base rounded-lg">
          <button onClick={() => { playNewGame() }}> Play Again!</button>
        </div>
      </div>
    </div>
  );
}

export default PopUp;
