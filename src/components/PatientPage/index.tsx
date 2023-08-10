import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Patient, Diagnosis } from "../../types";
import patientService from "../../services/patients";
import diagnoseService from "../../services/diagnoses";
import EntryInfo from "./EntryInfo";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>(); 
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [patient, setPatient] = useState<Patient | undefined>();
    
  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
          const patient = await patientService.getOne(id);
          setPatient(patient);
      }
    };
    void fetchPatient();

    const fetchDiagnosisList = async () => {
      const diagnoses = await diagnoseService.getAll();
      setDiagnoses(diagnoses);
    };
    void fetchDiagnosisList();
  }, [id]);
  
  if (patient) {

    return (
      <div>
          <h2>
          {patient.name}
          </h2>
          <p><strong>gender:</strong> {patient.gender}</p>
          <p><strong>ssh:</strong> {patient.ssn}</p>
          <p><strong>occupation:</strong> {patient.occupation}</p>
          <br />
          <h3>Entries</h3>
          {patient.entries && patient.entries.map((entry, i) => (
          <div key={i}>
            <EntryInfo entry={entry} diagnoses={diagnoses} />
            <br />
          </div>
          ))}
      </div>
  );
  }

  return (
      <div>Error occured, patient not found.</div>
  );
}
  
export default PatientPage;