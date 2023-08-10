import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Patient } from "../../types";
import patientService from "../../services/patients";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>(); 
  const [patient, setPatient] = useState<Patient | undefined>();
    
  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
          const patient = await patientService.getOne(id);
          setPatient(patient);
      }
    };
    void fetchPatient();
  }, [id]);
  
  if (patient) {

    return (
      <div>
          <h2>
          {patient.name}
          </h2>
          <p><strong>gender:</strong> {patient.gender}</p>
          <p><strong>ssh:</strong>  {patient.ssn}</p>
          <p><strong>occupation:</strong>  {patient.occupation}</p>
      </div>
  );
  }

  return (
      <div>Error occured, patient not found.</div>
  );
}
  
export default PatientPage;