import React from "react";
import { AlertCircle, Wrench, User, Calendar, CheckCircle } from "lucide-react";
import { formatDate } from "../../utils/helpers";
import styles from "../../styles/TaskDetails.module.css";

const TaskDetails = ({ task }) => {
  return (
    <>
      <div className={styles["task-details"]}>
        <div className={styles["task-details__content"]}>
          <div className={styles["task-details__status"]}>
            <AlertCircle className={styles["task-details__info-icon"]} />
            <span className={styles["task-details__status-text"]}>
              {task.status} - {task.actualStatus}
            </span>
          </div>
          <div className={styles["task-details__grid"]}>
            <div className={styles["task-details__info"]}>
              <div className={styles["task-details__info-title"]}>
                Component
              </div>
              <div className={styles["task-details__info-value"]}>
                <Wrench className={styles["task-details__info-icon"]} />
                {task.component}
              </div>
            </div>

            <div className={styles["task-details__info"]}>
              <div className={styles["task-details__info-title"]}>
                Min. Competency
              </div>
              <div className={styles["task-details__info-value"]}>
                <User className={styles["task-details__info-icon"]} />
                {task.minimumCompetency}
              </div>
            </div>

            <div className={styles["task-details__info"]}>
              <div className={styles["task-details__info-title"]}>Job Date</div>
              <div className={styles["task-details__info-value"]}>
                <Calendar className={styles["task-details__info-icon"]} />
                {formatDate(task.jobDate)}
              </div>
            </div>

            <div className={styles["task-details__info"]}>
              <div className={styles["task-details__info-title"]}>
                Last Completion
              </div>
              <div className={styles["task-details__info-value"]}>
                <CheckCircle className={styles["task-details__info-icon"]} />
                {formatDate(task.lastCompletionDate)}
              </div>
            </div>
          </div>
          <div className={styles["task-details__stats"]}>
            <div>
              <div className={styles["task-details__stat-title"]}>CC</div>
              <div className={styles["task-details__stat-value"]}>
                {task.cc}
              </div>
            </div>
            <div>
              <div className={styles["task-details__stat-title"]}>CM</div>
              <div className={styles["task-details__stat-value"]}>
                {task.cm}
              </div>
            </div>
            <div>
              <div className={styles["task-details__stat-title"]}>CSM</div>
              <div className={styles["task-details__stat-value"]}>
                {task.csm}
              </div>
            </div>
            <div>
              <div className={styles["task-details__stat-title"]}>CSM2</div>
              <div className={styles["task-details__stat-value"]}>
                {task.csm2}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskDetails;
