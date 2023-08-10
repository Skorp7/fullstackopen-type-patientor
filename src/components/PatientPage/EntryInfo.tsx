import { Entry, HealthCheckRating, Diagnosis } from "../../types";
import { assertNever } from "../../util";

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const BaseInfo = ({ entry, diagnoses }: Props) => {
  return(<div>
    <p><strong>{entry.date}</strong></p>
    <ul>
    {entry.diagnosisCodes && entry.diagnosisCodes.map((code) => {
      const diagnose = diagnoses.find(diag => diag.code === code);
      const explanation = diagnose ? diagnose.name : '-';

      return (
        <li key={code}>
          {code} {explanation}
        </li>
      );
    })}
    </ul>
    <p><i>{entry.description}</i></p>
    <p><strong>Specialist:</strong> {entry.specialist}</p>
    </div>);
}

const EntryInfo = ({ entry, diagnoses }: Props) => {
  switch (entry.type) {
    case 'HealthCheck': {
      /** Get string presentation of rating value */
      const indexOfRating = Object.values(HealthCheckRating).indexOf(entry.healthCheckRating as unknown as HealthCheckRating);
      const rate = Object.keys(HealthCheckRating)[indexOfRating];
      return(
        <div>
        <BaseInfo entry={entry} diagnoses={diagnoses} />
        <p><strong>Health rating:</strong> {rate}</p>
        </div>
      )
    }
    case 'OccupationalHealthcare': {
      return(
        <div>
        <BaseInfo entry={entry} diagnoses={diagnoses} />
        <p><strong>Employer name:</strong> {entry.employerName}</p>
        {entry.sickLeave && (
            <p><strong>Sick leave:</strong> from {entry.sickLeave.startDate} to {entry.sickLeave.endDate}</p>
        )}
        </div>
      );
    }
    case 'Hospital': {
      return(
        <div>
        <BaseInfo entry={entry} diagnoses={diagnoses} />
        {entry.discharge && (
            <p><strong>Discharge:</strong> {entry.discharge.date}, {entry.discharge.criteria}</p>
        )}
        </div>
      );
    }
    default: {

      return assertNever(entry);
    }
  }
}

export default EntryInfo;