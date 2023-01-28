import { useEffect, useRef, useState } from "react";

const Timer = (props) => {
  const [timer, setTimer] = useState("00:00:00");
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [isTicking, setIsTicking] = useState(false);
  const wrapperRef = useRef(null);

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (e) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        (hours > 9 ? hours : "0" + hours) +
          ":" +
          (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    }
  };

  const clearTimer = (e) => {
    setTimer(
      (hours > 9 ? hours : "0" + hours) +
        ":" +
        (minutes > 9 ? minutes : "0" + minutes) +
        ":" +
        (seconds > 9 ? seconds : "0" + seconds)
    );

    if (wrapperRef.current) clearInterval(wrapperRef.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    wrapperRef.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + Number(seconds));
    deadline.setMinutes(deadline.getMinutes() + Number(minutes));
    deadline.setHours(deadline.getHours() + Number(hours));
    return deadline;
  };

  useEffect(() => {
    setHours(props.hours);
    setMinutes(props.minutes);
    setSeconds(props.seconds);
    setTimer(
      (hours > 9 ? hours : "0" + hours) +
        ":" +
        (minutes > 9 ? minutes : "0" + minutes) +
        ":" +
        (seconds > 9 ? seconds : "0" + seconds)
    );
  }, [props]);

  const handleReset = () => {
    clearTimer();
  };

  const handleStart = () => {
    clearTimer(getDeadTime());
  };

  return (
    <div>
      {isTicking ? (
        <>
          <h3>{timer}</h3>
          <button
            onClick={() => {
              setIsTicking(false);
              handleReset();
            }}
          >
            Reset
          </button>
        </>
      ) : (
        <>
          <form>
            <input
              pattern="[0-9]*"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              type="number"
              min="0"
              max="24"
            />{" "}
            :{" "}
            <input
              pattern="[0-9]*"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              type="number"
              min="0"
              max="60"
            />{" "}
            :{" "}
            <input
              pattern="[0-9]*"
              value={seconds}
              onChange={(e) => setSeconds(e.target.value)}
              type="number"
              min="0"
              max="60"
            />
          </form>
          <button
            onClick={() => {
              setIsTicking(true);
              handleStart();
            }}
          >
            Start
          </button>
        </>
      )}
    </div>
  );
};

export default Timer;
