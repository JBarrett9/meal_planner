import { useEffect, useRef, useState } from "react";
import alarm from "./clock-alarm-8761.mp3";

const Timer = (props) => {
  const [timer, setTimer] = useState("00:00:00");
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [isTicking, setIsTicking] = useState(false);
  const [isRinging, setIsRinging] = useState(false);
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
    if (total <= 0) {
      setIsRinging(true);
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
    if (isRinging) new Audio(alarm).play();
  }, [isRinging]);

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
    <div className="flex justify-center my-4">
      {isTicking ? (
        <>
          <h3 className="bg-zinc-100 px-4 shadow shadow-black text-xl text-black">
            {timer}
          </h3>
          <button
            className="ml-4 bg-blue-600 dark:bg-blue-300 px-4 text-white dark:text-black font-semibold shadow shadow-black tracking-wide"
            onClick={() => {
              setIsRinging(false);
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
              className="shadow shadow-black text-center text-black"
              pattern="[0-9]*"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              type="number"
              min="0"
              max="24"
            />
            <span className="text-xl font-bold"> : </span>
            <input
              className="shadow shadow-black text-center text-black"
              pattern="[0-9]*"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              type="number"
              min="0"
              max="60"
            />
            <span className="text-xl font-bold"> : </span>
            <input
              className="shadow shadow-black text-center text-black"
              pattern="[0-9]*"
              value={seconds}
              onChange={(e) => setSeconds(e.target.value)}
              type="number"
              min="0"
              max="60"
            />
          </form>
          <button
            className="ml-4 bg-blue-600 dark:bg-blue-300 px-4 text-white dark:text-black font-semibold shadow shadow-black tracking-wide"
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
