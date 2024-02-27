import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@mui/material';
import axios from 'axios';
import { createUserTask } from '@/services/user-task';
import Task from '@/models/Task';

interface CaseStudyTaskProps {
  userId: string;
  taskId: string;
  heading: string;
  diagnosis: string;
  treatment: string;
  elongated: string;
  intake: string;
  createTaskType: string,
}



const CaseStudyTask: React.FC<CaseStudyTaskProps> = ({ userId, taskId, heading, diagnosis, treatment, elongated, intake, createTaskType }) => {

  const [content, setContent] = useState({ userId, taskId, caseStudyTitle: heading, csDiagnosis: diagnosis, csTreatment: treatment, csQuestion1: elongated, csQuestion2: intake, createTaskType, csDoctorName: 'Ramesh' });
  const [success, setSuccess] = React.useState<string | null>(null);
  const [error, setError] = React.useState<any>();

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

    if (event.target.id.toLowerCase() === 'heading') {
      setContent(previousState => {
        return { ...previousState, caseStudyTitle: event.target.value }
      });
    }

    if (event.target.id.toLowerCase() === 'diagnosis') {
      setContent(previousState => {
        return { ...previousState, csDiagnosis: event.target.value }
      });
    }

    if (event.target.id.toLowerCase() === 'treatment') {
      setContent(previousState => {
        return { ...previousState, csTreatment: event.target.value }
      });
    }

    if (event.target.id.toLowerCase() === 'elongated') {
      setContent(previousState => {
        return { ...previousState, csQuestion1: event.target.value }
      });
    }

    if (event.target.id.toLowerCase() === 'intake') {
      setContent(previousState => {
        return { ...previousState, csQuestion2: event.target.value }
      });
    }

  };

  const isFormValid = (): boolean => {
    return Object.values(content).every(value => value.trim() !== '');
  };


  useEffect(() => {

    setContent(previousState => {
      return { ...previousState, userId, taskId, caseStudyTitle: heading, csDiagnosis: diagnosis, csTreatment: treatment, csQuestion1: elongated, csQuestion2: intake, createTaskType, csDoctorName: 'Ramesh' }
    });

  }, [userId, taskId]);


  const saveContent = async () => {
    console.log('content', content);
    try {
      const response = await createUserTask(content as Task, localStorage.getItem('token')!, 'case-study');
      console.log(response);
      if (response.status === 201) {
        setSuccess(response.data.message)
        setTimeout(() => {
          setSuccess(null);
        }, 3000);
      }

    } catch (error: any) {
      console.error('Error saving:', error);
    }
  };

  return (
    <div className='case-study-task-wrapper'>

      <div id="content">
        <input type='text' id='heading' className='h1' maxLength={25} minLength={5} onChange={changeHandler} value={content.caseStudyTitle} disabled={true} />

        <div className='banner-image-wrapper'>
          <table cellSpacing="0" cellPadding="0">
            <tbody>
              <tr>
                <td>
                  <Image src={require('../../../public/images/cs/ca-image.png')} alt="Description of the image" className='responsive-img' />
                </td>
              </tr>
            </tbody>
          </table>
        </div>


        <div className='diagnosis-wrapper'>
          <table cellSpacing="0">
            <tbody>
              <tr>
                <td>
                  <Image src={require('../../../public/images/cs/heart.png')} alt="Description of the image" className='responsive-img' />
                </td>
                <td>
                  <h3>
                    <span>Diagnosis</span>
                    <span></span>
                  </h3>
                  <textarea id="diagnosis" name="diagnosis" rows={6} onChange={changeHandler} value={content.csDiagnosis}></textarea>
                  <div></div>
                </td>
              </tr>

              <tr>
                <td>
                  <Image src={require('../../../public/images/cs/treatment.png')} alt="Description of the image" className='responsive-img' />
                </td>
                <td>
                  <h3>
                    <span>Treatment (Pharmacological & Nutritional)</span>
                    <span></span>
                  </h3>
                  <textarea id="treatment" name="treatment" rows={6} onChange={changeHandler} value={content.csTreatment}></textarea>
                  <div></div>
                </td>
              </tr>

            </tbody>
          </table>
        </div>


        <div className='percentage-wrapper'>
          <table cellSpacing="0">
            <tbody>
              <tr>
                <td>
                  <div>
                    <h3> What % of your patients go through an elongated recovery phase</h3>
                    <input id='elongated' type='text' inputMode='numeric' maxLength={2} minLength={1} onChange={changeHandler} value={content.csQuestion1} placeholder='00' />
                  </div>
                </td>
                <td>
                  <div>
                    <h3> What % of your patients go through an elongated recovery phase</h3>
                    <input id='intake' type='text' inputMode='numeric' maxLength={2} minLength={1} onChange={changeHandler} value={content.csQuestion2} placeholder='00' />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className='footer'>
          <table cellSpacing={0}>
            <tbody>
              <tr>
                <td>
                  <div>
                    <div>
                      <span>By</span>
                      <span></span>
                    </div>
                    <b>Dr. Firstname Lastname</b>
                    <div></div>
                  </div>
                </td>
                <td>
                  <Image src={require('../../../public/images/cs/icehub.png')} alt="Description of the image" className='responsive-img' />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>

      <div className='btn-wrapper'>
        <Button variant="contained" size="large" className="ice-btn" disabled={!isFormValid()} onClick={() => saveContent()}> {'Save'} </Button>
      </div>


    </div >
  );
};

export default React.memo(CaseStudyTask);
