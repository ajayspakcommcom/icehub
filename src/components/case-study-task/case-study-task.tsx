import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Box, Button } from '@mui/material';
import axios from 'axios';



interface CaseStudyTaskProps {
  heading: string;
  diagnosis: string;
  treatment: string;
  elongated: string;
  intake: string;
}

const CaseStudyTask: React.FC<CaseStudyTaskProps> = ({ heading, diagnosis, treatment, elongated, intake }) => {

  const [content, setContent] = useState({ heading, diagnosis, treatment, elongated, intake });

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

    if (event.target.id.toLowerCase() === 'heading') {
      setContent(previousState => {
        return { ...previousState, heading: event.target.value }
      });
    }

    if (event.target.id.toLowerCase() === 'diagnosis') {
      setContent(previousState => {
        return { ...previousState, diagnosis: event.target.value }
      });
    }

    if (event.target.id.toLowerCase() === 'treatment') {
      setContent(previousState => {
        return { ...previousState, treatment: event.target.value }
      });
    }

    if (event.target.id.toLowerCase() === 'elongated') {
      setContent(previousState => {
        return { ...previousState, elongated: event.target.value }
      });
    }

    if (event.target.id.toLowerCase() === 'intake') {
      setContent(previousState => {
        return { ...previousState, intake: event.target.value }
      });
    }

  };

  const isFormValid = (): boolean => {
    return Object.values(content).every(value => value.trim() !== '');
  };



  useEffect(() => {

  }, []);


  const saveContent = async () => {
    console.log('content', content);
    // try {
    //   const response = await axios.post('http://example.com/save', content);
    //   console.log('Saved:', response.data);
    // } catch (error) {
    //   console.error('Error saving:', error);
    // }
  };

  return (
    <div className='case-study-task-wrapper'>

      <div id="content">
        <input type='text' id='heading' className='h1' maxLength={25} minLength={5} onChange={changeHandler} value={content.heading} />

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
                  <textarea id="diagnosis" name="diagnosis" rows={6} onChange={changeHandler} value={content.diagnosis}></textarea>
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
                  <textarea id="treatment" name="treatment" rows={6} onChange={changeHandler} value={content.treatment}></textarea>
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
                    <input id='elongated' type='text' inputMode='numeric' maxLength={2} minLength={1} onChange={changeHandler} value={content.elongated} placeholder='00' />
                  </div>
                </td>
                <td>
                  <div>
                    <h3> What % of your patients go through an elongated recovery phase</h3>
                    <input id='intake' type='text' inputMode='numeric' maxLength={2} minLength={1} onChange={changeHandler} value={content.intake} placeholder='00' />
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
