import React, { useEffect,useState } from 'react'
import { CAREER } from '../../constant/Constant';
import axios from 'axios';
import {Link} from 'react-router-dom'

const Career = () => {
  const [career,setCareer]=useState([    { "company": "Brickland Real Estate", "work": "Work From Home", "role": "Software Engineer", "jobtype": "Full Time", "test": "Test Required", "need": "Urgent", "salary": "25000-30000" },
  { "company": "Brickland Real Estate", "work": "Work From Home", "role": "Software Engineer", "jobtype": "Full Time", "test": "Test Required", "need": "Urgent", "salary": "25000-30000" },]);
  const fetchCareer = async () => {
    try {
      const url = CAREER;
      const response=await axios.get(url);
      console.log(response,'response');
      setCareer(response.data.data);
      console.log(response.data.data)
    } catch (error) {
      console.error("Error fetch testimonial:", error);
    }
  };

  useEffect(()=>{
    fetchCareer();
  },[])
  return (
    <div>
      <div className='flex flex-col m-10 gap-5'>
        <div className='rounded-md border-1 border-black p-1 w-40 flex text-center justify-center'>We are hiring</div>
        <div className='text-2xl font-light'>Be part of our mission</div>
        <div className='text-l font-light'>We're looking for passionate people to join us on our mission.We value flat hierarchies,clear communication and full ownership and responsibility.</div>
      </div>
    {career.length==0 && <div className='flex text-center justify-center'>
        <div className='text-4xl h-[300px] mt-10'>There is no current opening!!</div>
    </div>}
    {
      career.length>0 && <div className='grid grid-cols-1 gap-4 m-5'>
        {career.map((item, key) => {
                        return (
                            <div className='shadow-lg rounded p-4 cursor-pointer'>
                                <div className="flex flex-row font-semibold text-xl"><p>Role: {item?.role}</p></div>
                                <div className="flex flex-row font-semibold"><p>Salary:{item.salary}</p></div>
                                <div className="flex flex-row font-medium"><p>Location:{item.location}</p></div>
                                <div className='text-l font-medium'>WorkType:{item.type}</div>
                                <div className='text-l font-medium'>Description:{item.description}</div>

                                <div className="flex flex-row gap-4">
                                    <div className="text-white rounded-lg bg-green-600 w-28 text-sm text-center justify-center p-1 font-medium">English</div>
                                    <div className="text-white rounded-lg bg-green-600 w-28 text-sm text-center justify-center p-1 font-medium">Hindi</div>
                                </div>
                                <div className='font-light'>Please Fill this form <Link to={item.link} className='underline'>Link</Link></div>
                            </div>
                        )
                    })}
      </div>
    }
    </div>
  )
}

export default Career