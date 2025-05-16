/* eslint-disable @typescript-eslint/no-explicit-any */

import { useContext, useState, } from "react";
import { DataContext } from "./context/Context";

    interface Laborer {
        picture: string;
        firstName: string;
        lastName: string;
        email: string;
        role: 'user' | 'admin' | 'supervisor';
        hireDate: string;
    }



const LaborerDetail = ({ handleGoToLaborersPage }: { handleGoToLaborersPage: () => void }) => {

    const { laborer } = useContext(DataContext) as { laborer: Laborer };



    if (!laborer) {

        return <pre>Error 404 Laborer not found</pre>

    }

    const {
        picture,
        firstName,
        lastName,
        email,
        role,
        hireDate,
    } = laborer;




    const dateOfHire = hireDate ? hireDate.substring(0, 10) : 'Unknown';


    return (
        <section>

            <button className="button" onClick={() => { handleGoToLaborersPage() }}>Back</button>
            <div className="laborer">

                <div className="laborer__card">
                    <figure className='laborer__imageWrapper'>
                        <img src={picture} className="laborer__image" alt={`${firstName} ${lastName} profile photo`} />
                    </figure>
                    <div className='laborer__laborerDetailGroup'>
                        <div>
                            <p><span className="laborer__detailsTitle">Name:</span> {firstName}</p>
                            <p><span className="laborer__detailsTitle">Last name:</span> {lastName}</p>
                        </div>

                        <p><span className="laborer__detailsTitle">Email:</span> {email}</p>

                        <p><span className="laborer__detailsTitle">Hire date:</span> {dateOfHire}</p>

                        <p><span className="laborer__detailsTitle">Role:</span><span className={'tag ' + role}>{role}</span></p>
                    </div>
                </div>


            </div>

        </section>
    )
}

export default LaborerDetail