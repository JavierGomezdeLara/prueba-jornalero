/* eslint-disable @typescript-eslint/no-explicit-any */

import { useContext, } from "react";
import { DataContext } from "./Context";

const LaborerDetail = ({ handleGoToLaborersPage }: { laborer: number, handleGoToLaborersPage: () => void }) => {
    const { laborer } = useContext(DataContext) as any

    const Tag = () => {
        if (role == 'user') {
            return <div className='tag user'>User</div>
        } else if (role == 'admin') {
            return <div className='tag admin'>Admin</div>
        } else if (role == 'supervisor') {
            return <div className='tag supervisor'>Supervisor</div>
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
        <div>
            <div className="button" onClick={() => { handleGoToLaborersPage() }}>Back</div>
            <div className="laborer">
                <div className='laborerDetailGroup'>
                    <div><div>Name:</div><div>{firstName}</div></div>
                    <div><div>Last name:</div><div>{lastName}</div></div>
                    <div><div>Email:</div><div>{email}</div></div>
                </div>
                
                <div className='laborerDetailGroup'>
                    <div><div>Hire date:</div><div>{dateOfHire}</div></div>
                </div>
                <div className='laborerDetailGroup'>
                    <div><div>Role:</div><div>{Tag()}</div></div>
                </div>
                {/* <div className='laborerDetailGroup'></div> */}
        <div className='imageWrapper'><img src={picture} width={'250px'} height={'250px'} /></div>

            </div>

        </div>
    )
}

export default LaborerDetail