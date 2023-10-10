import CheckIcon from '@mui/icons-material/Check';
import Button from "@mui/material/Button";
import "./answerBox.css";

interface IAnswerBox {
  text: string,
  number: number,
  selectedNumber: number,
  handleChoseAnswer: (number) => void
}

export default function AnswerBox({
  text,
  number,
  selectedNumber,
  handleChoseAnswer
}:IAnswerBox) {
  return(
    <div className={`answer ${selectedNumber === number && 'selected'}`} onClick={() => handleChoseAnswer(number)}>
      <div className={"answer-number"}>
        {selectedNumber !== number && number}
        {selectedNumber === number && <CheckIcon />}
      </div>
      <div className={"answer-text"}>
        {text}
      </div>
    </div>
  )
}