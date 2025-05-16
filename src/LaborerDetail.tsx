/* eslint-disable @typescript-eslint/no-explicit-any */

import { useContext, } from "react";
import { DataContext } from "./context/Context";

const LaborerDetail = ({ handleGoToLaborersPage }: { laborer: number, handleGoToLaborersPage: () => void }) => {
    const { laborer } = useContext(DataContext) as any

    const Tag = () => {
        switch (role) {
            case 'user':
                return <span className='tag user'>User</span>

            case 'admin':
                return <span className='tag admin'>Admin</span>

            case 'supervisor':
                return <span className='tag supervisor'>Supervisor</span>
        }

    }

    const {
        picture,
        firstName,
        lastName,
        email,
        role,
        hireDate,
    } = laborer as any || {}

    const dateOfHire = hireDate ? hireDate.substring(0, 10) : 'Unknown';


    return (
        <section>

            <button className="button" onClick={() => { handleGoToLaborersPage() }}>Back</button>
            <div className="laborer">

                <div className="laborer__card">
                    <figure className='imageWrapper'><img src={picture} width={'250px'} height={'250px'} /></figure>
                    <div className='laborerDetailGroup'>
                        <div>
                            <p><span className="laborer__detailsTitle">Name:</span> {firstName}</p>
                            <p><span className="laborer__detailsTitle">Last name:</span> {lastName}</p>
                        </div>

                        <p><span className="laborer__detailsTitle">Email:</span> {email}</p>
                 
                        <p><span className="laborer__detailsTitle">Hire date:</span> {dateOfHire}</p>
                    
                        <p><span className="laborer__detailsTitle">Role:</span> {Tag()}</p>
                    </div>
                    {/* <div className='laborerDetailGroup'></div> */}
                </div>


            </div>

        </section>
    )
}

export default LaborerDetail