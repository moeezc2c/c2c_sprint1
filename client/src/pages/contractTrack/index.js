import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { contractDelete, contractGet, contractVerify } from '../../actions/proposalAndContract';
// import "./ContractList.scss";

const ContractList = ({ auth, proposalAndContract: { ContractsItemData }, contractGet, contractVerify, contractDelete }) => {
    const history = useHistory();

    useEffect(() => {
        if (auth.isAuthenticated) {
            contractGet()

        } else {
            history.push('/login');
        }
    }, [auth])

    const handleVerify = (id, status) => {
        let data = {
            contract_id: id,
            status: status
        }

        contractVerify(data)
    }

    return (<section className="main-page page-dashboard">
        <div className="container">
            
            <div className="panel-box">
                <header className="panel-box--header">
                    <h1 className="panel-box--title">Proposal List</h1>
                </header>
                <main className="panel-box--body">
                {ContractsItemData && ContractsItemData.length > 0 ? <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            {
                                auth.user.type !== 'Freelancer' ?
                                    <th>Freelancer</th> :
                                    <th>Hire Manager</th>
                            }
                            <th>Type</th>
                            <th>Job</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ContractsItemData.map(contract => (
                            <tr key={contract._id}>
                                {
                                    auth.user.type !== 'Freelancer' ?
                                        <td>{contract.freelancer_id.user_id.first_name + " " + contract.freelancer_id.user_id.last_name}</td> :
                                        <td>{contract.hire_manager_id.first_name + " " + contract.hire_manager_id.last_name}</td>
                                }
                                <td>{contract.contract_type}</td>
                                <td>{contract.job_id.headline}</td>
                                <td>{contract.contract_status}</td>
                                <td className="action-data">
                                    {auth.user.type === 'Freelancer' && contract.contract_status === 'Pending' && <>
                                        <button onClick={() => handleVerify(contract._id, 'Accepted')} className="btn btn-primary btn-sm mx-1">Accept</button>
                                        <button onClick={() => handleVerify(contract._id, 'Rejected')} className="btn btn-danger btn-sm mx-1">Reject</button>
                                    </>}
                                    {auth.user.type === 'Client' && contract.hire_manager_id._id === auth.user._id && <button onClick={() => contractDelete(contract._id)} className="btn btn-danger btn-sm mx-1">Delete</button>}
                                    <button className="btn btn-primary btn-sm mx-1">View</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table> : <>
                    <h4>No Record Found</h4>
                </>}
                </main>
            </div>
        </div>
   </section>)
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    proposalAndContract: state.proposalAndContract
})

export default connect(mapStateToProps, { contractGet, contractVerify, contractDelete })(ContractList);