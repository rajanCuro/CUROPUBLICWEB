import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchTestByVitalOrgan } from '../../../redux/features/labSilice';
import { useAuth } from '../../../Authorization/AuthContext';

function TestByCategory() {
    const dispatch = useDispatch();
    const { latitude, longitude } = useAuth();

    const [distance, setDistance] = useState(5);
    const [categoryList, setCategoryList] = useState([]);
    const [deasesList, setDeasesList] = useState([]);
    const [symtomList, setSymtomList] = useState([]);
    const [vitalOrganList, setVitalOrganList] = useState([]);

    const { organList, loading } = useSelector((state) => state.packages);

    console.log("test list", organList);

    useEffect(() => {
        if (organList?.response) {
            setCategoryList(organList.response.category || []);
            setDeasesList(organList.response.disease || []);
            setSymtomList(organList.response.symptom || []);
            setVitalOrganList(organList.response.vitalOrgan || []);
        }
    }, [organList]);

    useEffect(() => {
        dispatch(fetchTestByVitalOrgan({ latitude, longitude, distance }));
    }, [latitude, longitude, distance]);

    return (
        <>
            <div className='border'>
                <p className='border-b'>Category</p>
                {categoryList.map((item) => (
                    <div className='p-2'>
                        <p>{item.name}</p>
                        <p>{item.count}</p>
                    </div>
                ))}
            </div>

            <div className='border'>
                <p className='border-b'>Disease</p>
                {deasesList.map((item) => (
                    <div className='p-2'>
                        <p>{item.name}</p>
                        <p>{item.count}</p>
                    </div>
                ))}
            </div>

            <div className='border'>
                <p className='border-b'>Symptoms</p>
                {symtomList.map((item) => (
                    <div className='p-2'>
                        <p>{item.name}</p>
                        <p>{item.count}</p>
                    </div>
                ))}
            </div>

            <div className='border'>
                <p className='border-b'>Vital Organs</p>
                {vitalOrganList.map((item,index) => (
                    <div key={index} className='p-2'>
                        <p>{item.name}</p>
                        <p>{item.count}</p>
                    </div>
                ))}
            </div>
        </>
    );
}

export default TestByCategory;
