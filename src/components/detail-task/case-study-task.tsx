import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@mui/material';
import axios from 'axios';
import { createUserTask, getUserTaskDetail } from '@/services/user-task';
import Task from '@/models/Task';

interface CaseStudyTaskProps {
  userId: string;
  taskId: string;
}


interface CaseStudyTask {
  userId: string;
  taskId: string;
  caseStudyTitle?: string;
  csDiagnosis?: string;
  csTreatment?: string;
  csQuestion1?: string;
  csQuestion2?: string;
  createTaskType?: string;
  csDoctorName?: string;
}




const CaseStudyTask: React.FC<CaseStudyTaskProps> = ({ userId, taskId }) => {

  const [content, setContent] = useState<CaseStudyTask>({ userId, taskId });
  const [success, setSuccess] = React.useState<string | null>(null);
  const [error, setError] = React.useState<any>();

  const isFormValid = (): boolean => {
    return Object.values(content).every(value => value.trim() !== '');
  };


  useEffect(() => {
    const fetchUserTaskDetail = async () => {
      try {
        const response = await getUserTaskDetail(userId as string, taskId as string, localStorage.getItem('token')!);
        const resp = response.data.data;
        console.log('response', response.data.data);

        setContent(previousState => {
          return { ...previousState, caseStudyTitle: resp.caseStudyTitle, csDiagnosis: resp.csDiagnosis, csTreatment: resp.csTreatment, csQuestion1: resp.csQuestion1, csQuestion2: resp.csQuestion2, csDoctorName: 'Ram' }
        });

        //setAssignedTaskListData(formattedTasks);
        //setLoading(false);
      } catch (error: any) {
        //setError(error.message);
        //setLoading(false);
      }
    };

    fetchUserTaskDetail();

  }, [userId, taskId]);

  return (
    <div className='case-study-task-wrapper'>

      <div id="content">
        <h1 id='heading' className='h1'>{content.caseStudyTitle}</h1>

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
                  <div id="diagnosis">{content.csDiagnosis}</div>
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
                  <div id="treatment">{content.csTreatment}</div>
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
                    <span>{content.csQuestion1}</span>
                  </div>
                </td>
                <td>
                  <div>
                    <h3> What % of your patients go through an elongated recovery phase</h3>
                    <span>{content.csQuestion2}</span>
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
                    <b>{content.csDoctorName}</b>
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

    </div >
  );
};

export default React.memo(CaseStudyTask);
