import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function CircularProgressbarComponent({progress}) {
  return (
    <div className="max-w-sm w-20 lg:w-24 mx-auto">
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
                    ? "rgb(239 68 68)"
                    : progress > 20 && progress <= 40
                    ? "rgb(139 92 246)"
                    : progress > 40 && progress <= 60
                    ? "rgb(59 130 246)"
                    : progress > 60 && progress <= 80
                    ? "rgb(234 179 8)"
                    : "rgb(34 197 94)"
                }`,
                textColor: "rgb(14 116 144)",
                trailColor: "#d6d6d6",
                backgroundColor: "cyan",
              })}
            />
          </div>
  )
}
