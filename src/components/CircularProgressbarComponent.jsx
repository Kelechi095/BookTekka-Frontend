import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function CircularProgressbarComponent({progress}) {
  return (
    <div className="max-w-sm mx-auto w-36">
            <CircularProgressbar
              value={progress}
              text={`${progress}%`}
              styles={buildStyles({
                // Text size
                textSize: "20px",

                // How long animation takes to go from one percentage to another, in seconds
                pathTransitionDuration: 0.5,

                // Colors
                pathColor: `${
                  progress <= 20
                    ? "red"
                    : progress > 20 && progress <= 40
                    ? "violet"
                    : progress > 40 && progress <= 60
                    ? "blue"
                    : progress > 60 && progress <= 80
                    ? "yellow"
                    : "green"
                }`,
                textColor: "rgb(14 116 144)",
                trailColor: "#d6d6d6",
                backgroundColor: "cyan",
              })}
            />
          </div>
  )
}
