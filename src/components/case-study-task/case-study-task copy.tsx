import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { preventDefaultIfEnterHandler } from '@/libs/common';


interface CaseStudyTaskProps {
  heading: string;
  diagnosis: string;
  treatment: string;
  elongated: string;
  intake: string;
}

const CaseStudyTask: React.FC<CaseStudyTaskProps> = ({ heading, diagnosis, treatment, elongated, intake }) => {

  const [content, setContent] = useState({ heading, diagnosis, treatment, elongated, intake });

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {

    //const newHeading = event.target.innerText;
    // if (event.target.id.toLowerCase() === 'heading') {
    //   if (newHeading.length <= 24) {
    //     setContent(previousState => {
    //       return { ...previousState, heading: newHeading };
    //     });
    //   } else {
    //     // If text length exceeds 25 characters, remove focus from the editable element
    //     event.target.blur();
    //   }
    // }

    console.log(event.target.id);



    if (event.target.id.toLowerCase() === 'heading') {
      setContent(previousState => {
        return { ...previousState, heading: event.target.innerText }
      });
    }

    if (event.target.id.toLowerCase() === 'diagnosis') {
      setContent(previousState => {
        return { ...previousState, diagnosis: event.target.innerText }
      });
    }

    if (event.target.id.toLowerCase() === 'treatment') {
      setContent(previousState => {
        return { ...previousState, treatment: event.target.innerText }
      });
    }

    if (event.target.id.toLowerCase() === 'elongated') {
      setContent(previousState => {
        return { ...previousState, elongated: event.target.innerText }
      });
    }

    if (event.target.id.toLowerCase() === 'intake') {
      setContent(previousState => {
        return { ...previousState, intake: event.target.innerText }
      });
    }

  };


  useEffect(() => {

    document.addEventListener('keydown', preventDefaultIfEnterHandler);

    return () => {
      document.removeEventListener('keydown', preventDefaultIfEnterHandler);
    };

  }, []);

  return (
    <div className='case-study-task-wrapper'>

      {JSON.stringify(content)}

      {/* <input type='text' /> */}

      <div id="content">
        {/* <h1 contentEditable={true} onInput={changeHandler} id='heading' suppressContentEditableWarning={true}>Case Study Header Here?</h1> */}

        <input type='text' id='heading' className='h1' maxLength={10} minLength={5} onInput={changeHandler} />

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
                  <p id="diagnosis" contentEditable={true} onInput={changeHandler} suppressContentEditableWarning={true}>dsfgdsf</p>
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
                  <p id="treatment" contentEditable={true} onInput={changeHandler} suppressContentEditableWarning={true}>dsfgdsf</p>
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
                    <span id='elongated' contentEditable={true} onInput={changeHandler} suppressContentEditableWarning={true}>30</span>
                  </div>
                </td>
                <td>
                  <div>
                    <h3> What % of your patients go through an elongated recovery phase</h3>
                    <span id='intake' contentEditable={true} onInput={changeHandler} suppressContentEditableWarning={true}>30</span>
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
    </div>
  );
};

export default React.memo(CaseStudyTask);
